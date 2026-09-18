import { useEffect, useState } from 'react'
import { ConsoleLogger } from 'aws-amplify/utils'
import * as APISettings from 'Api/Thermal/api/endpoints'
import { convertUnit, type ConvertibleUnit } from 'Modules/Selections/units/shared/conversion/unitConvertion'
import {
  getUnitById,
  getUnitIdByName,
  type UnitDef,
  type UnitType,
} from 'Modules/Selections/units/shared/unitsMeasureTable'
import { PefMachine } from '../InputParameter/Rating/Result/types'

const log = new ConsoleLogger('Modules/Selections/thermal/hooks/useRating')

const DEBOUNCE_MS = 500
const RATING_PAGE = 1
const RATING_PAGE_SIZE = 500

interface UseRatingParams {
  rating: any
  unitsType: string
  selectedMachine?: PefMachine | null
  enabled?: boolean
}

const unwrapList = (data: any): any[] => {
  if (data == null) return []
  if (Array.isArray(data)) return data
  if (Array.isArray(data.results)) return data.results
  if (Array.isArray(data.machines)) return data.machines
  if (Array.isArray(data.items)) return data.items
  if (Array.isArray(data.data)) return data.data
  if (data.identification || data.modelCode || data.modelId) return [data]
  return []
}

const unwrapTotal = (data: any, listLength: number) => {
  const n = Number(data?.totalCount ?? data?.total)
  return Number.isFinite(n) ? n : listLength
}

const unwrapResult = (data: any) => {
  if (data == null) return null
  return Array.isArray(data) ? (data[0] ?? null) : data
}

const firstDefined = (...values: any[]) =>
  values.find((value) => value !== undefined && value !== null)

const normalizeMachine = (item: any, index: number): PefMachine => {
  const identification = item?.identification ?? {}
  const fans = item?.fans ?? {}
  const dimensions = item?.dimensions ?? {}

  const id = firstDefined(
    item?.id,
    item?.modelId,
    identification.modelCode,
    item?.modelCode,
    index,
  )

  return {
    ...item,
    id: String(id),
    modelId: firstDefined(item?.modelId, item?.id),
    modelCode: String(
      firstDefined(identification.modelCode, item?.modelCode, ''),
    ),
    fanCode: String(firstDefined(identification.fanCode, item?.fanCode, '')),
    coilCode: firstDefined(identification.coilCode, item?.coilCode, null),
    series: firstDefined(identification.series, item?.series, null),
    fanType: firstDefined(fans.fanType, item?.fanType, null),
    fanNumber: firstDefined(fans.number, item?.fanNumber, null),
    rows: firstDefined(fans.numberOfModules, item?.rows, null),
    length: firstDefined(dimensions.length, item?.length, null),
    width: firstDefined(dimensions.width, item?.width, null),
    height: firstDefined(dimensions.height, item?.height, null),
    quantity: item?.quantity,
    fanQuantity: firstDefined(item?.fanQuantity, fans.number),
  }
}

const isUnconstrained = (value: any) => {
  if (value === undefined || value === null || value === '') return true
  if (typeof value === 'string' && value.trim().toLowerCase() === 'all') {
    return true
  }
  return false
}

const readRaw = (rating: any, keys: string[]) => {
  for (const key of keys) {
    const value = rating?.[key]
    if (value !== undefined && value !== null && value !== '') {
      return value
    }
  }
  return undefined
}

const readScalar = (rating: any, keys: string[], fallback: any) => {
  const raw = readRaw(rating, keys)
  if (raw === undefined) return fallback
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    return firstDefined(raw.value, fallback)
  }
  return raw
}

const readOptionalScalar = (rating: any, keys: string[]) => {
  const raw = readScalar(rating, keys, undefined)
  return isUnconstrained(raw) ? undefined : raw
}

const readNumber = (rating: any, keys: string[], fallback: number) => {
  const n = Number(readScalar(rating, keys, fallback))
  return Number.isFinite(n) ? n : fallback
}

const readOptionalNumber = (rating: any, keys: string[]) => {
  const raw = readOptionalScalar(rating, keys)
  if (raw === undefined) return undefined
  const n = Number(raw)
  return Number.isFinite(n) ? n : undefined
}

const readBoolean = (rating: any, keys: string[], fallback = false) => {
  const raw = readRaw(rating, keys)
  if (typeof raw === 'boolean') return raw
  if (Array.isArray(raw)) return raw.includes(true)
  if (raw === undefined) return fallback
  return Boolean(raw)
}

const readFanSpeed = (rating: any) => {
  const fanSpeed = rating?.fanSpeed
  if (fanSpeed && typeof fanSpeed === 'object') {
    const value = Number(firstDefined(fanSpeed.value, 100))
    const unit = fanSpeed.unit === 'rpm' ? 'rpm' : '%'
    return { value: Number.isFinite(value) ? value : 100, unit }
  }

  const value = Number(
    firstDefined(rating?.fan_speed_value, rating?.fanSpeed, 100),
  )
  const unit = rating?.fan_speed === 'rpm' ? 'rpm' : '%'
  return { value: Number.isFinite(value) ? value : 100, unit }
}

const readAssembly = (rating: any) => {
  const raw = readScalar(rating, ['assembly', 'single_assembled'], 'All')
  const lower = String(raw).toLowerCase()
  if (lower === 'single') return 'Single'
  if (lower === 'assembled') return 'Assembled'
  if (lower === 'all') return 'All'
  return raw
}

const toNumericId = (value: any) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : value
}

const TEMPERATURE_TYPES = new Set(['Temperature', 'Temperature Difference'])

const unitMatchesType = (unit: UnitDef | undefined, type?: UnitType) => {
  if (!unit) return false
  if (!type) return true
  if (unit.type === type) return true
  return TEMPERATURE_TYPES.has(type) && TEMPERATURE_TYPES.has(unit.type)
}

const getUnitDef = (name: string, type?: UnitType): UnitDef | undefined => {
  const id = getUnitIdByName(name, type) ?? getUnitIdByName(name)
  const unit = id !== undefined ? getUnitById(id) : undefined
  return unitMatchesType(unit, type) ? unit : undefined
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
    const id = Number((raw as any).id)
    if (Number.isFinite(id)) {
      const byId = getUnitById(id)
      if (unitMatchesType(byId, type)) return byId
    }
    if ('factor' in raw && 'delta' in raw) return raw as ConvertibleUnit
    const name = (raw as any).name ?? (raw as any).value ?? (raw as any).type
    if (typeof name === 'string') {
      return getUnitDef(name, type)
    }
  }

  if (typeof raw === 'string') {
    const asId = Number(raw)
    if (raw.trim() !== '' && Number.isFinite(asId)) {
      const byId = getUnitById(asId)
      if (unitMatchesType(byId, type)) return byId
    }
    return getUnitDef(raw, type)
  }

  return undefined
}

const convertToTarget = (
  value: number | undefined,
  fromRaw: unknown,
  targetName: string,
  type: UnitType,
  fallback?: number,
  asDelta = false,
) => {
  if (value === undefined || !Number.isFinite(value)) return fallback

  const to = getUnitDef(targetName, type)
  const from = resolveUnitDef(fromRaw, type) ?? to
  if (!from || !to) return value

  return convertUnit(value, from, to, { asDelta })
}

const buildRatingPayload = (
  rating: any,
  unitsType?: string,
  selectedMachine?: PefMachine | null,
) => {
  const source = rating && typeof rating === 'object' ? rating : {}

  const payload: Record<string, unknown> = {
    series: readScalar(source, ['series'], 'All'),
    subseries: readScalar(source, ['subseries'], 'All'),
    assembly: readAssembly(source),
    fansConnection: readScalar(
      source,
      ['fansConnection', 'fan_connection'],
      'All~50Hz',
    ),
    fanBrand: readScalar(source, ['fanBrand', 'brand'], 'All'),
    fanSpeed: readFanSpeed(source),
    noiseClass: readScalar(source, ['noiseClass', 'noise_class'], 'All'),
    fluidPassages: readScalar(
      source,
      ['fluidPassages', 'fluid_passages'],
      'All',
    ),
    coilGeometry: readScalar(source, ['coilGeometry', 'tube_geo'], 'All'),
    dryBulb: convertToTarget(
      readNumber(source, ['dryBulb', 'airInletTemp'], 35),
      source.dryBulbType,
      '°C',
      'Temperature',
      35,
    ),
    relHumidity: readNumber(source, ['relHumidity'], 50),
    altitude: convertToTarget(
      readNumber(source, ['altitude'], 0),
      source.altitudeType,
      'm',
      'Measure',
      0,
    ),
    refrigerantType: readScalar(source, ['refrigerantType'], 'R404A'),
    condensing: convertToTarget(
      readNumber(source, ['condensing'], 45),
      source.condensingType,
      '°C',
      'Temperature',
      45,
    ),
    subCooling: convertToTarget(
      readNumber(source, ['subCooling'], 5),
      source.subCoolingType,
      'K',
      'Temperature Difference',
      5,
      true,
    ),
    distance: convertToTarget(
      readNumber(source, ['distance', 'noise'], 10),
      source.distanceType,
      'm',
      'Measure',
      10,
    ),
    useContainerWidth: readBoolean(
      source,
      ['useContainerWidth', 'container_width'],
      false,
    ),
    unitsType: unitsType || 'si',
  }

  const thermalCapacityBaseW = Number(source.thermalCapacityBaseW)
  payload.thermalCapacity = Number.isFinite(thermalCapacityBaseW)
    ? convertToTarget(thermalCapacityBaseW, 'W', 'kW', 'Capacity', 100)
    : convertToTarget(
        readNumber(source, ['thermalCapacity', 'capacity'], 100),
        source.thermalCapacityType,
        'kW',
        'Capacity',
        100,
      )

  const numberOfModules = readOptionalNumber(source, [
    'numberOfModules',
    'n_modules',
  ])
  if (numberOfModules !== undefined) {
    payload.numberOfModules = numberOfModules
  }

  const numberOfFans = readOptionalNumber(source, ['numberOfFans', 'n_fans'])
  if (numberOfFans !== undefined) {
    payload.numberOfFans = numberOfFans
  }

  const fanDiameter = readOptionalNumber(source, ['fanDiameter', 'diameter'])
  if (fanDiameter !== undefined) {
    payload.fanDiameter = fanDiameter
  }

  const maxLength = convertToTarget(
    readOptionalNumber(source, ['maxLength']),
    source.maxLengthType,
    'm',
    'Measure',
  )
  if (maxLength !== undefined) {
    payload.maxLength = maxLength
  }

  const maxHeight = convertToTarget(
    readOptionalNumber(source, ['maxHeight']),
    source.maxHeightType,
    'm',
    'Measure',
  )
  if (maxHeight !== undefined) {
    payload.maxHeight = maxHeight
  }

  const maxWidth = convertToTarget(
    readOptionalNumber(source, ['maxWidth']),
    source.maxWidthType,
    'm',
    'Measure',
  )
  if (maxWidth !== undefined) {
    payload.maxWidth = maxWidth
  }

  const maxWeight = convertToTarget(
    readOptionalNumber(source, ['maxWeight', 'weight']),
    source.weightType ?? source.maxWeightType,
    'kg',
    'Weight',
  )
  if (maxWeight !== undefined) {
    payload.maxWeight = maxWeight
  }

  if (selectedMachine) {
    payload.id = toNumericId(selectedMachine.id)
    payload.modelId = toNumericId(
      firstDefined(selectedMachine.modelId, selectedMachine.id),
    )
    if (selectedMachine.modelCode) {
      payload.modelCode = selectedMachine.modelCode
    }
  }

  return payload
}

export const useRating = ({
  rating,
  unitsType,
  selectedMachine = null,
  enabled = true,
}: UseRatingParams) => {
  const [machines, setMachines] = useState<PefMachine[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [calculation, setCalculation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    if (!enabled) {
      log.info('useRating.machines: Skipped', { enabled, rating })
      return
    }

    let cancelled = false
    const payload = buildRatingPayload(rating, unitsType)

    log.info('useRating.machines: Executing API call', { payload })
    setIsLoading(true)
    setError(null)

    const timer = setTimeout(async () => {
      try {
        const { data } = await APISettings.getRatingResult(payload, {
          page: RATING_PAGE,
          pageSize: RATING_PAGE_SIZE,
        })
        if (cancelled) return

        const nextMachines = unwrapList(data).map(normalizeMachine)
        setMachines(nextMachines)
        setTotalCount(unwrapTotal(data, nextMachines.length))
        log.info('useRating.machines.success', {
          count: nextMachines.length,
          totalCount: unwrapTotal(data, nextMachines.length),
          payload,
        })
      } catch (err) {
        if (cancelled) return
        setMachines([])
        setTotalCount(0)
        setError(err)
        log.error('useRating.machines.error', err)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [unitsType, JSON.stringify(rating), enabled])

  useEffect(() => {
    setCalculation(null)
  }, [selectedMachine?.id])

  const calculate = async (machine: PefMachine | null = selectedMachine) => {
    if (!enabled || !machine) {
      log.info('useRating.calculation: Skipped', {
        enabled,
        hasMachine: !!machine,
      })
      return
    }

    const payload = buildRatingPayload(rating, unitsType, machine)
    log.info('useRating.calculation: Executing API call', { payload })
    setIsCalculating(true)
    setError(null)

    try {
      const { data } = await APISettings.getRatingCalculation(payload)
      const result = unwrapResult(data)
      setCalculation(result)
      log.info('useRating.calculation.success', { result, payload })
    } catch (err) {
      setCalculation(null)
      setError(err)
      log.error('useRating.calculation.error', err)
    } finally {
      setIsCalculating(false)
    }
  }

  return {
    machines,
    totalCount,
    calculation,
    isLoading,
    isCalculating,
    error,
    calculate,
  }
}

export default useRating
