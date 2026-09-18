import _ from 'lodash'
import { useCallback } from 'react'
import { ConsoleLogger } from 'aws-amplify/utils'
import { convertUnit, type ConvertibleUnit } from './conversion/unitConvertion'
import {
  getUnitById,
  getUnitIdByName,
  type UnitDef,
  type UnitType,
} from './unitsMeasureTable'

const log = new ConsoleLogger(
  'Modules/Selections/units/shared/condenserPayload',
)

const UNIT_NAME_ALIASES: Record<string, string> = {
  farenheit: '°F',
  fahrenheit: '°F',
  F: '°F',
  celsius: '°C',
  C: '°C',
  kelvin: 'K',
  K: 'K',
  rankine: 'R',
  Rankine: 'R',
  '°R': 'R',
  R: 'R',
}

const TEMPERATURE_TYPES = new Set(['Temperature', 'Temperature Difference'])

const unitMatchesType = (unit: UnitDef | undefined, type?: UnitType) => {
  if (!unit) return false
  if (!type) return true
  if (unit.type === type) return true
  // Rankine (and other delta scales) must still convert with °C/°F/K
  if (
    TEMPERATURE_TYPES.has(type) &&
    TEMPERATURE_TYPES.has(unit.type)
  ) {
    return true
  }
  return false
}

const getUnitDef = (name: string, type?: UnitType): UnitDef | undefined => {
  const resolvedName = UNIT_NAME_ALIASES[name] ?? name
  const id =
    getUnitIdByName(resolvedName, type) ?? getUnitIdByName(resolvedName)
  const unit = id !== undefined ? getUnitById(id) : undefined
  return unitMatchesType(unit, type) ? unit : undefined
}

const resolveUnitName = (raw: unknown): string | undefined => {
  if (typeof raw === 'string') return raw
  if (!raw || typeof raw !== 'object') return undefined

  const name = _.get(raw, 'name', _.get(raw, 'value', _.get(raw, 'type')))
  return typeof name === 'string' ? name : undefined
}

const resolveUnitDef = (
  raw: unknown,
  type?: UnitType,
): ConvertibleUnit | undefined => {
  if (typeof raw === 'number') {
    const byId = getUnitById(raw)
    return unitMatchesType(byId, type) ? byId : undefined
  }

  if (raw && typeof raw === 'object') {
    const id = Number(_.get(raw, 'id'))
    if (Number.isFinite(id)) {
      const byId = getUnitById(id)
      if (unitMatchesType(byId, type)) return byId
    }

    if ('factor' in raw && 'delta' in raw) return raw as ConvertibleUnit
  }

  const name = resolveUnitName(raw)
  if (!name) return undefined

  const asId = Number(name)
  if (name.trim() !== '' && Number.isFinite(asId)) {
    const byId = getUnitById(asId)
    if (unitMatchesType(byId, type)) return byId
  }

  return getUnitDef(name, type)
}

const readNumeric = (values: any, path: string) => {
  const raw = _.get(values, path)
  return Number(_.get(raw, 'value', raw))
}

const convertToTarget = (
  value: number,
  fromRaw: unknown,
  targetName: string,
  type: UnitType,
  fallback: number,
  asDelta = false,
) => {
  if (!Number.isFinite(value)) return fallback

  const to = getUnitDef(targetName, type)
  const from = resolveUnitDef(fromRaw, type) ?? to
  if (!from || !to) return value

  return convertUnit(value, from, to, { asDelta })
}

const useCondenserPayload = () =>
  useCallback((values: any) => {
    const condenser = _.get(values, 'condenser', {})

    const thermalCapacityBaseW = Number(
      _.get(values, 'condenser.thermalCapacityBaseW'),
    )
    const normalizedThermalCapacity = Number.isFinite(thermalCapacityBaseW)
      ? convertToTarget(thermalCapacityBaseW, 'W', 'kW', 'Capacity', 1)
      : convertToTarget(
          readNumeric(values, 'condenser.thermalCapacity'),
          _.get(values, 'condenser.thermalCapacityType'),
          'kW',
          'Capacity',
          1,
        )

    const atmosphericPressBaseKpa = Number(
      _.get(values, 'condenser.atmosphericPressBaseKpa'),
    )
    const normalizedAtmosphericPress = Number.isFinite(atmosphericPressBaseKpa)
      ? convertToTarget(
          atmosphericPressBaseKpa,
          'kPa',
          'kPa',
          'Pressure',
          101.35,
        )
      : convertToTarget(
          readNumeric(values, 'condenser.atmosphericPress'),
          _.get(values, 'condenser.atmosphericPressType'),
          'kPa',
          'Pressure',
          101.35,
        )

    const normalizedAltitude = convertToTarget(
      readNumeric(values, 'condenser.altitude'),
      _.get(values, 'condenser.altitudeType'),
      'm',
      'Measure',
      0,
    )

    const normalizedDistance = convertToTarget(
      readNumeric(values, 'condenser.distance'),
      _.get(values, 'condenser.distanceType'),
      'm',
      'Measure',
      10,
    )

    const normalizedEsp = convertToTarget(
      readNumeric(values, 'condenser.esp'),
      _.get(values, 'condenser.espType'),
      'Pa',
      'Pressure',
      0,
    )

    const normalizeOptionalMeasureToM = (
      path: string,
      typePath: string,
    ): number | null => {
      const raw = _.get(values, path)
      const rawValue = _.get(raw, 'value', raw)
      if (rawValue == null || rawValue === '') return null

      const value = Number(rawValue)
      if (!Number.isFinite(value)) return null

      return convertToTarget(
        value,
        _.get(values, typePath),
        'm',
        'Measure',
        value,
      )
    }

    const normalizedMaxLength = normalizeOptionalMeasureToM(
      'condenser.maxLength',
      'condenser.maxLengthType',
    )
    const normalizedMaxHeight = normalizeOptionalMeasureToM(
      'condenser.maxHeight',
      'condenser.maxHeightType',
    )
    const normalizedMaxWidth = normalizeOptionalMeasureToM(
      'condenser.maxWidth',
      'condenser.maxWidthType',
    )

    const normalizeTemperatureToC = (
      path: string,
      typePath: string,
      fallback: number,
      asDelta = false,
    ) =>
      convertToTarget(
        readNumeric(values, path),
        _.get(values, typePath),
        '°C',
        'Temperature',
        fallback,
        asDelta,
      )

    const compressorInletModeRaw = _.get(
      values,
      'condenser.compressorInletMode',
    )
    const compressorInletMode =
      compressorInletModeRaw && typeof compressorInletModeRaw === 'object'
        ? compressorInletModeRaw.value
        : compressorInletModeRaw
    const isCompressorInletTemperature = compressorInletMode === 'temperature'

    const subCoolingModeRaw = _.get(values, 'condenser.subCoolingMode')
    const subCoolingMode =
      subCoolingModeRaw && typeof subCoolingModeRaw === 'object'
        ? subCoolingModeRaw.value
        : subCoolingModeRaw
    const isOutletTemperature = subCoolingMode === 'temperature'

    const saturationTitleRaw = _.get(
      condenser,
      'condensingReference',
      _.get(condenser, 'saturationTitle', 'ave'),
    )
    const saturationTitle =
      saturationTitleRaw && typeof saturationTitleRaw === 'object'
        ? (saturationTitleRaw.value ?? saturationTitleRaw.key)
        : saturationTitleRaw
    const condensingReference = ['dew', 'ave', 'bubble'].includes(
      saturationTitle,
    )
      ? saturationTitle
      : 'ave'

    const normalizedDryBulb = normalizeTemperatureToC(
      'condenser.dryBulb',
      'condenser.dryBulbType',
      25,
    )
    const normalizedMinOperativeTemperature = normalizeTemperatureToC(
      'condenser.minOperativeTemperature',
      'condenser.minOperativeTemperatureType',
      -20,
    )
    const normalizedCondensing = normalizeTemperatureToC(
      'condenser.condensing',
      'condenser.condensingType',
      40,
    )
    const normalizedCompressorInput = normalizeTemperatureToC(
      isCompressorInletTemperature
        ? 'condenser.inletTemperature'
        : 'condenser.compressor',
      isCompressorInletTemperature
        ? 'condenser.inletTemperatureType'
        : 'condenser.compressorType',
      isCompressorInletTemperature ? 22 : 25,
      // Desuperheating = temperature difference (K/°F delta), not absolute
      !isCompressorInletTemperature,
    )
    const normalizedCompressor = isCompressorInletTemperature
      ? normalizedCompressorInput - normalizedCondensing
      : normalizedCompressorInput

    const normalizedOutletTemperature = normalizeTemperatureToC(
      'condenser.outletTemperature',
      'condenser.outletTemperatureType',
      37,
    )
    const normalizedSubCoolingInput = normalizeTemperatureToC(
      'condenser.subCooling',
      'condenser.subCoolingType',
      3,
      // Subcooling delta = temperature difference (K/°F delta), not absolute
      !isOutletTemperature,
    )
    const normalizedSubCooling = isOutletTemperature
      ? normalizedCondensing - normalizedOutletTemperature
      : normalizedSubCoolingInput

    const toleranceMinRaw = readNumeric(values, 'condenser.toleranceMin')
    const toleranceMaxRaw = readNumeric(values, 'condenser.toleranceMax')
    const toleranceMinFromCondenser = Number(
      _.get(condenser, 'toleranceMin.value', _.get(condenser, 'toleranceMin')),
    )
    const toleranceMaxFromCondenser = Number(
      _.get(condenser, 'toleranceMax.value', _.get(condenser, 'toleranceMax')),
    )
    const toleranceMin = Number.isFinite(toleranceMinRaw)
      ? toleranceMinRaw
      : Number.isFinite(toleranceMinFromCondenser)
        ? toleranceMinFromCondenser
        : -10
    const toleranceMax = Number.isFinite(toleranceMaxRaw)
      ? toleranceMaxRaw
      : Number.isFinite(toleranceMaxFromCondenser)
        ? toleranceMaxFromCondenser
        : 10

    const currentUnitType =
      _.get(condenser, 'currentUnitType') ||
      _.get(values, 'condenser.currentUnitType') ||
      'si'
    const unitsTypeRaw =
      _.get(condenser, 'unitsType') || _.get(values, 'condenser.unitsType')
    const unitsType =
      typeof unitsTypeRaw === 'string' && unitsTypeRaw.trim() !== ''
        ? unitsTypeRaw
        : currentUnitType

    const payload = {
      ..._.omit(condenser, [
        'tolerance',
        'toleranceMin',
        'toleranceMax',
        'condenserModel',
        'splValue',
        'compressorInletMode',
        'subCoolingMode',
        'saturationTitle',
        'inletTemperature',
        'inletTemperatureType',
        'outletTemperature',
        'outletTemperatureType',
      ]),
      thermalCapacity: normalizedThermalCapacity,
      atmosphericPress: normalizedAtmosphericPress,
      altitude: normalizedAltitude,
      distance: normalizedDistance,
      esp: normalizedEsp,
      maxLength: normalizedMaxLength,
      maxHeight: normalizedMaxHeight,
      maxWidth: normalizedMaxWidth,
      dryBulb: normalizedDryBulb,
      minOperativeTemperature: normalizedMinOperativeTemperature,
      compressor: normalizedCompressor,
      condensing: normalizedCondensing,
      condensingReference,
      subCooling: normalizedSubCooling,
      toleranceMin,
      toleranceMax,
      unitsType,
      currentUnitType,
    }

    log.info('useCondenserPayload.modes', {
      isCompressorInletTemperature,
      isOutletTemperature,
      compressorAsDelta: !isCompressorInletTemperature,
      subCoolingAsDelta: !isOutletTemperature,
    })
    const payloadSnapshot = {
      condenserType: _.get(payload, 'condenserType'),
      fansConnection: _.get(payload, 'fansConnection'),
      airFlowDirection: _.get(payload, 'airFlowDirection'),
      unitsType: payload.unitsType,
      condensing: payload.condensing,
      condensingReference: payload.condensingReference,
      refrigerantType: _.get(payload, 'refrigerantType'),
      atmosphericPress: payload.atmosphericPress,
      maxSoundPower: _.get(payload, 'maxSoundPower'),
      maxSoundPressure: _.get(payload, 'maxSoundPressure'),
      noiseTolerance: _.get(payload, 'noiseTolerance'),
      distance: payload.distance,
      esp: payload.esp,
      thermalCapacity: payload.thermalCapacity,
      toleranceMin: payload.toleranceMin,
      toleranceMax: payload.toleranceMax,
      compressor: payload.compressor,
      subCooling: payload.subCooling,
      dryBulb: payload.dryBulb,
      minOperativeTemperature: payload.minOperativeTemperature,
      altitude: payload.altitude,
      relHumidity: _.get(payload, 'relHumidity'),
      currentUnitType: payload.currentUnitType,
      maxLength: payload.maxLength,
      maxHeight: payload.maxHeight,
      maxWidth: payload.maxWidth,
    }
    log.info(
      'useCondenserPayload.payload',
      JSON.parse(JSON.stringify(payloadSnapshot)),
    )

    return payload
  }, [])

export default useCondenserPayload
