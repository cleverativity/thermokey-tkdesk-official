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
  tempf: '°F',
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

const getUnitDef = (name: string, type?: UnitType): UnitDef | undefined => {
  const resolvedName = UNIT_NAME_ALIASES[name] ?? name
  const id = getUnitIdByName(resolvedName, type)
  return id !== undefined ? getUnitById(id) : undefined
}

const extractUnitString = (raw: unknown): string | undefined => {
  if (typeof raw === 'string') return raw
  if (!raw || typeof raw !== 'object') return undefined

  const name = _.get(raw, 'name', _.get(raw, 'value', _.get(raw, 'type')))
  if (typeof name === 'string') return name
  if (typeof _.get(raw, 'unit') === 'string') return _.get(raw, 'unit')
  if (typeof _.get(raw, 'key') === 'string') return _.get(raw, 'key')
  if (typeof _.get(raw, 'label') === 'string') return _.get(raw, 'label')
  return undefined
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

  const name = extractUnitString(raw)
  if (!name) return undefined

  const asId = Number(name)
  if (name.trim() !== '' && Number.isFinite(asId)) {
    const byId = getUnitById(asId)
    if (byId && (!type || byId.type === type)) return byId
  }

  return getUnitDef(name, type)
}

const extractNumeric = (raw: unknown): number =>
  Number(_.get(raw, 'value', raw))

/**
 * Keep `{ type, unit_of_measurement, value }` shape.
 * Only overwrite `value` — never change `type` or `unit_of_measurement`.
 */
const withUpdatedValue = (raw: any, nextValue: number | null) => {
  if (nextValue === null) return raw
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    return {
      ...raw,
      value: nextValue,
    }
  }
  return {
    type: 'number',
    value: nextValue,
  }
}

const resolveInputData = (values: any) => {
  if (!values || typeof values !== 'object') return {}
  // Full form values: { input_data: {...}, id, ... }
  if (values.input_data && typeof values.input_data === 'object') {
    return values.input_data
  }
  // Already unwrapped input_data: { performance, liquid, air, ... }
  return values
}

const resolveFieldUnit = (
  fieldRaw: any,
  siblingTypeRaw: any,
  nestedTypeKey?: string,
): string | undefined => {
  const fromSibling = extractUnitString(siblingTypeRaw)
  if (fromSibling) return fromSibling

  if (fieldRaw && typeof fieldRaw === 'object') {
    if (nestedTypeKey) {
      const fromNested = extractUnitString(fieldRaw[nestedTypeKey])
      if (fromNested) return fromNested
    }
    // Form may store the selected unit in `type` (e.g. "ft"); ignore API "number"
    if (typeof fieldRaw.type === 'string' && fieldRaw.type !== 'number') {
      return fieldRaw.type
    }
  }

  return undefined
}

const getStoredUnitOfMeasurement = (fieldRaw: any): string | undefined => {
  if (!fieldRaw || typeof fieldRaw !== 'object') return undefined
  return typeof fieldRaw.unit_of_measurement === 'string'
    ? fieldRaw.unit_of_measurement
    : undefined
}

const convertToTarget = (
  value: number,
  fromRaw: unknown,
  targetName: string,
  type: UnitType,
  fallback: number,
) => {
  if (!Number.isFinite(value)) return fallback

  const to = getUnitDef(targetName, type)
  const from = resolveUnitDef(fromRaw, type) ?? to
  if (!from || !to) return value

  return convertUnit(value, from, to)
}

const useDryCoolerPayload = () =>
  useCallback((values: any) => {
    const inputData = resolveInputData(values)

    const normalizeCapacity = (
      fieldRaw: any,
      typeRaw: any,
      baseRaw: any,
      nestedTypeKey?: string,
    ): number | null => {
      const capacityType = resolveFieldUnit(fieldRaw, typeRaw, nestedTypeKey)
      const capacityValue = extractNumeric(fieldRaw)
      const capacityBaseW = Number(baseRaw)
      const targetUnit = getStoredUnitOfMeasurement(fieldRaw) ?? 'kW'

      if (Number.isFinite(capacityBaseW)) {
        return convertToTarget(capacityBaseW, 'W', targetUnit, 'Capacity', 1)
      }
      if (!Number.isFinite(capacityValue)) return null

      return convertToTarget(
        capacityValue,
        capacityType,
        targetUnit,
        'Capacity',
        1,
      )
    }

    const normalizePressure = (
      fieldRaw: any,
      typeRaw: any,
      baseRaw: any,
      nestedTypeKey?: string,
    ): number | null => {
      const pressureType = resolveFieldUnit(fieldRaw, typeRaw, nestedTypeKey)
      const pressureValue = extractNumeric(fieldRaw)
      const pressureBaseKpa = Number(baseRaw)
      const targetUnit = getStoredUnitOfMeasurement(fieldRaw) ?? 'kPa'

      if (Number.isFinite(pressureBaseKpa)) {
        return convertToTarget(
          pressureBaseKpa,
          'kPa',
          targetUnit,
          'Pressure',
          101.35,
        )
      }
      if (!Number.isFinite(pressureValue)) return null

      return convertToTarget(
        pressureValue,
        pressureType,
        targetUnit,
        'Pressure',
        101.35,
      )
    }

    const normalizeMeasure = (
      fieldRaw: any,
      typeRaw: any,
      nestedTypeKey?: string,
    ): number | null => {
      const measureType = resolveFieldUnit(fieldRaw, typeRaw, nestedTypeKey)
      const measureValue = extractNumeric(fieldRaw)
      const targetUnit = getStoredUnitOfMeasurement(fieldRaw) ?? 'm'

      if (!Number.isFinite(measureValue)) return null

      return convertToTarget(
        measureValue,
        measureType,
        targetUnit,
        'Measure',
        0,
      )
    }

    const normalizeTemperature = (
      fieldRaw: any,
      typeRaw: any,
      nestedTypeKey?: string,
    ): number | null => {
      const temperatureType = resolveFieldUnit(fieldRaw, typeRaw, nestedTypeKey)
      const temperatureValue = extractNumeric(fieldRaw)
      const targetUnit = getStoredUnitOfMeasurement(fieldRaw) ?? '°C'

      if (!Number.isFinite(temperatureValue)) return null

      return convertToTarget(
        temperatureValue,
        temperatureType,
        targetUnit,
        'Temperature',
        25,
      )
    }

    const capacityRaw = _.get(inputData, 'performance.capacity')
    const liquidInletRaw = _.get(inputData, 'liquid.inlet_temperature')
    const liquidOutletRaw = _.get(inputData, 'liquid.outlet_temperature')
    const maxPressureDropRaw = _.get(inputData, 'liquid.max_pressure_drop')
    const airInletRaw = _.get(inputData, 'air.inlet_temperature')
    const minOperativeRaw = _.get(inputData, 'air.min_operative_temperature')
    const altitudeRaw = _.get(inputData, 'air.altitude')
    const maxPowerRaw = _.get(inputData, 'ventilation.max_power_consumption')
    const maxLengthRaw = _.get(inputData, 'dimensions.max_length')
    const maxHeightRaw = _.get(inputData, 'dimensions.max_height')
    const maxWidthRaw = _.get(inputData, 'dimensions.max_width')
    const distanceRaw = _.get(inputData, 'noise.distance')

    const payload = {
      ...inputData,
      performance: {
        ..._.get(inputData, 'performance', {}),
        capacity: withUpdatedValue(
          capacityRaw,
          normalizeCapacity(
            capacityRaw,
            _.get(inputData, 'performance.capacityType'),
            _.get(inputData, 'performance.capacityBaseW'),
            'capacityType',
          ),
        ),
      },
      liquid: {
        ..._.get(inputData, 'liquid', {}),
        inlet_temperature: withUpdatedValue(
          liquidInletRaw,
          normalizeTemperature(
            liquidInletRaw,
            _.get(inputData, 'liquid.inlet_temperatureType'),
            'inlet_temperatureType',
          ),
        ),
        outlet_temperature: withUpdatedValue(
          liquidOutletRaw,
          normalizeTemperature(
            liquidOutletRaw,
            _.get(inputData, 'liquid.outlet_temperatureType'),
            'outlet_temperatureType',
          ),
        ),
        max_pressure_drop: withUpdatedValue(
          maxPressureDropRaw,
          normalizePressure(
            maxPressureDropRaw,
            _.get(inputData, 'liquid.max_pressure_dropType'),
            _.get(inputData, 'liquid.max_pressure_dropBaseKpa'),
            'max_pressure_dropType',
          ),
        ),
      },
      air: {
        ..._.get(inputData, 'air', {}),
        inlet_temperature: withUpdatedValue(
          airInletRaw,
          normalizeTemperature(
            airInletRaw,
            _.get(inputData, 'air.inlet_temperatureType'),
            'inlet_temperatureType',
          ),
        ),
        min_operative_temperature: withUpdatedValue(
          minOperativeRaw,
          normalizeTemperature(
            minOperativeRaw,
            _.get(inputData, 'air.min_operative_temperatureType'),
            'min_operative_temperatureType',
          ),
        ),
        altitude: withUpdatedValue(
          altitudeRaw,
          normalizeMeasure(
            altitudeRaw,
            _.get(inputData, 'air.altitudeType'),
            'altitudeType',
          ),
        ),
      },
      ventilation: {
        ..._.get(inputData, 'ventilation', {}),
        max_power_consumption: withUpdatedValue(
          maxPowerRaw,
          normalizeCapacity(
            maxPowerRaw,
            _.get(inputData, 'ventilation.max_power_consumptionType'),
            _.get(inputData, 'ventilation.max_power_consumptionBaseW'),
            'max_power_consumptionType',
          ),
        ),
      },
      dimensions: {
        ..._.get(inputData, 'dimensions', {}),
        max_length: withUpdatedValue(
          maxLengthRaw,
          normalizeMeasure(
            maxLengthRaw,
            _.get(inputData, 'dimensions.max_lengthType'),
            'max_lengthType',
          ),
        ),
        max_height: withUpdatedValue(
          maxHeightRaw,
          normalizeMeasure(
            maxHeightRaw,
            _.get(inputData, 'dimensions.max_heightType'),
            'max_heightType',
          ),
        ),
        max_width: withUpdatedValue(
          maxWidthRaw,
          normalizeMeasure(
            maxWidthRaw,
            _.get(inputData, 'dimensions.max_widthType'),
            'max_widthType',
          ),
        ),
      },
      noise: {
        ..._.get(inputData, 'noise', {}),
        distance: withUpdatedValue(
          distanceRaw,
          normalizeMeasure(
            distanceRaw,
            _.get(inputData, 'noise.distanceType'),
            'distanceType',
          ),
        ),
      },
    }

    delete payload.air?.altitudeType
    delete payload.air?.inlet_temperatureType
    delete payload.air?.min_operative_temperatureType
    delete payload.air?.wet_bulb_temperatureType
    delete payload.dimensions?.max_heightType
    delete payload.dimensions?.max_lengthType
    delete payload.dimensions?.max_widthType
    delete payload.liquid?.flow_rateBaseM3h
    delete payload.liquid?.flow_rateType
    delete payload.liquid?.inlet_temperatureType
    delete payload.liquid?.outlet_temperatureType
    delete payload.liquid?.max_pressure_dropType
    delete payload.noise?.distanceType
    delete payload.performance?.capacityBaseW
    delete payload.performance?.capacityType
    delete payload.performance?.espType
    delete payload.performance?.max_power_consumptionBaseW
    delete payload.performance?.max_power_consumptionType
    delete payload.ventilation?.espType
    delete payload.ventilation?.max_power_consumptionBaseW
    delete payload.ventilation?.max_power_consumptionType

    return payload
  }, [])

export default useDryCoolerPayload
