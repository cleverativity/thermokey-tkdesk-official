import { useCallback, useRef, useState } from 'react'
import { ConsoleLogger } from 'aws-amplify/utils'
import { useFormikContext } from 'formik'
import * as APISettings from 'Api/Thermal/api/endpoints'

const log = new ConsoleLogger(
  'Modules/Selections/thermal/hooks/useWorkingPoint',
)

type WorkingPointRow = {
  id: number
  airInletTemp?: number
  airInletRh?: number
  condensing?: number
  capacity?: number
  refrigerantPressureDrop?: number
  airFlowrate?: number
  airOutletTemp?: number
  airPressureDrop?: number
  fanSpeedRpm?: number
  fanSpeedPercent?: number
  totalPowerConsump?: number
  totalCurrentConsump?: number
  soundPower?: number
  soundPressure?: number
}

const get = (source: any, path: string) =>
  path.split('.').reduce((acc, key) => acc?.[key], source)

const unwrap = (raw: any) =>
  raw && typeof raw === 'object' && !Array.isArray(raw) ? raw.value : raw

const readNumber = (source: any, path: string, fallback = 0) => {
  const n = Number(unwrap(get(source, path)))
  return Number.isFinite(n) ? n : fallback
}

const readText = (source: any, path: string, fallback = '') => {
  const value = unwrap(get(source, path))
  return value == null || value === '' ? fallback : String(value)
}

const unwrapList = (data: any): any[] => {
  if (data == null) return []
  if (Array.isArray(data)) return data

  const nested =
    data.results ??
    data.items ??
    data.data ??
    data.workingPoints ??
    data.rows ??
    data.value

  if (Array.isArray(nested)) return nested
  if (Array.isArray(nested?.results)) return nested.results
  if (Array.isArray(nested?.data)) return nested.data
  return []
}

const mapRow = (row: any, index: number): WorkingPointRow => ({
  id: index,
  airInletTemp: row?.inletAirTemp,
  airInletRh: row?.inletRelativeHumidity,
  condensing: row?.condensing,
  capacity: row?.capacity,
  refrigerantPressureDrop: row?.refrigerantPressureDrop,
  airFlowrate: row?.airFlow,
  airOutletTemp: row?.outletAirTemp,
  airPressureDrop: row?.airPressureDrop,
  fanSpeedRpm: row?.fanSpeedRpm,
  fanSpeedPercent: row?.fanSpeedPercent,
  totalPowerConsump: row?.totalPower,
  totalCurrentConsump: row?.totalCurrent,
  soundPower: row?.soundPower,
  soundPressure: row?.soundPressure,
})

const toTemperatureUnit = (raw: string) => {
  const value = raw.replace('°', '').trim()
  if (value === 'C' || value === 'F' || value === 'K') return value
  return 'C'
}

const buildPayload = (values: any, condenser: any = {}) => {
  const isFixedCapacity =
    readText(values, 'wp.speedMode', 'fixed_speed') === 'fixed_capacity'
  const modelCode = readText(condenser, 'remoteModel')

  return {
    id: readNumber(condenser, 'modelId'),
    modelId: readNumber(condenser, 'id'),
    model: modelCode,
    modelCode,
    mode: isFixedCapacity ? 'FixedCapacity' : 'FixedSpeed',
    fanSpeed: {
      value: readNumber(values, 'wp.fixedSpeed', 100),
      unit: '%',
    },
    refrigerantType: readText(condenser, 'refrigerantType'),
    subCooling: readNumber(condenser, 'subCooling'),
    condensing: readNumber(values, 'wp.liquidInletTemp'),
    relHumidity: readNumber(values, 'wp.relHumidity', 50),
    altitude: readNumber(condenser, 'altitude'),
    distance: readNumber(values, 'wp.liquidDistanceTemp'),
    initialInletAir: readNumber(values, 'wp.airInletTemp'),
    finalInletAir: readNumber(values, 'wp.finalAirInletTemp'),
    temperatureStep: readNumber(values, 'wp.tempStep', 1),
    distanceUnit: readText(values, 'wp.liquidDistanceTempType', 'm'),
    capacityUnit: readText(
      values,
      'wp.fixedCapacityType',
      readText(condenser, 'thermalCapacityType', 'kW'),
    ),
    temperatureUnit: toTemperatureUnit(
      readText(values, 'wp.airInletTempType', 'C'),
    ),
    airFlowUnit: 'm3/h',
    airPressureDropUnit: 'Pa',
    refrigerantPressureDropUnit: 'kPa',
    powerUnit: 'W',
    currentUnit: 'A',
    soundUnit: 'dB(A)',
    ...(isFixedCapacity && {
      thermalCapacity: readNumber(
        values,
        'wp.fixedCapacity',
        readNumber(condenser, 'thermalCapacity'),
      ),
    }),
  }
}

export const useWorkingPoint = (condenser?: any) => {
  const { values } = useFormikContext<any>()
  const valuesRef = useRef(values)
  const condenserRef = useRef(condenser)
  valuesRef.current = values
  condenserRef.current = condenser

  const [rows, setRows] = useState<WorkingPointRow[]>([])
  const [isCalculating, setIsCalculating] = useState(false)

  const calculate = useCallback(async () => {
    const payload = buildPayload(valuesRef.current, condenserRef.current)
    log.info('useWorkingPoint.calculate', {
      payload,
      condenser: condenserRef.current,
    })
    setIsCalculating(true)

    try {
      const { data } = await APISettings.getRatingWorkingPoint(payload)
      const nextRows = unwrapList(data).map(mapRow)
      log.info('useWorkingPoint.calculate.success', { data, nextRows, payload })
      setRows(nextRows)
    } catch (err) {
      setRows([])
      log.error('useWorkingPoint.calculate.error', err)
    } finally {
      setIsCalculating(false)
    }
  }, [])

  return { rows, isCalculating, calculate }
}

export default useWorkingPoint
