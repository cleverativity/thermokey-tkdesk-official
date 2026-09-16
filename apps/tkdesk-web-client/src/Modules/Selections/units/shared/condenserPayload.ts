import _ from 'lodash'
import { useCallback } from 'react'
import { convertUnit, type ConvertibleUnit } from './conversion/unitConvertion'
import {
  getUnitById,
  getUnitIdByName,
  type UnitDef,
  type UnitType,
} from './unitsMeasureTable'

const UNIT_NAME_ALIASES: Record<string, string> = {
  farenheit: '°F',
  fahrenheit: '°F',
  F: '°F',
  celsius: '°C',
  C: '°C',
  kelvin: 'K',
}

const getUnitDef = (name: string, type?: UnitType): UnitDef | undefined => {
  const resolvedName = UNIT_NAME_ALIASES[name] ?? name
  const id = getUnitIdByName(resolvedName, type)
  return id !== undefined ? getUnitById(id) : undefined
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
    return byId && (!type || byId.type === type) ? byId : undefined
  }

  if (raw && typeof raw === 'object') {
    const id = Number(_.get(raw, 'id'))
    if (Number.isFinite(id)) {
      const byId = getUnitById(id)
      if (byId && (!type || byId.type === type)) return byId
    }

    if ('factor' in raw && 'delta' in raw) return raw as ConvertibleUnit
  }

  const name = resolveUnitName(raw)
  if (!name) return undefined

  const asId = Number(name)
  if (name.trim() !== '' && Number.isFinite(asId)) {
    const byId = getUnitById(asId)
    if (byId && (!type || byId.type === type)) return byId
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

    const normalizedDryBulb = normalizeTemperatureToC(
      'condenser.dryBulb',
      'condenser.dryBulbType',
      25,
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
      25,
    )
    const normalizedCompressor = isCompressorInletTemperature
      ? normalizedCompressorInput - normalizedCondensing
      : normalizedCompressorInput
    const normalizedSubCooling = normalizeTemperatureToC(
      'condenser.subCooling',
      'condenser.subCoolingType',
      3,
    )

    return {
      ...condenser,
      thermalCapacity: normalizedThermalCapacity,
      atmosphericPress: normalizedAtmosphericPress,
      altitude: normalizedAltitude,
      distance: normalizedDistance,
      dryBulb: normalizedDryBulb,
      compressor: normalizedCompressor,
      condensing: normalizedCondensing,
      subCooling: normalizedSubCooling,
    }
  }, [])

export default useCondenserPayload
