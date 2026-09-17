import { useEffect, useState } from 'react'
import { ConsoleLogger } from 'aws-amplify/utils'
import * as APISettings from 'Api/Thermal/api/endpoints'
import { PefMachine } from '../InputParameter/Rating/Result/types'

const log = new ConsoleLogger('Modules/Selections/thermal/hooks/useRating')

const DEBOUNCE_MS = 500

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

const readNumber = (rating: any, keys: string[], fallback: number) => {
  const n = Number(readScalar(rating, keys, fallback))
  return Number.isFinite(n) ? n : fallback
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

const buildRatingPayload = (
  rating: any,
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
    dryBulb: readNumber(source, ['dryBulb', 'airInletTemp'], 35),
    relHumidity: readNumber(source, ['relHumidity'], 50),
    altitude: readNumber(source, ['altitude'], 0),
    refrigerantType: readScalar(source, ['refrigerantType'], 'R404A'),
    condensing: readNumber(source, ['condensing'], 45),
    subCooling: readNumber(source, ['subCooling'], 5),
    thermalCapacity: readNumber(source, ['thermalCapacity', 'capacity'], 100),
    distance: readNumber(source, ['distance', 'noise'], 10),
    useContainerWidth: readBoolean(
      source,
      ['useContainerWidth', 'container_width'],
      false,
    ),
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
    const payload = buildRatingPayload(rating)

    log.info('useRating.machines: Executing API call', { payload })
    setIsLoading(true)
    setError(null)

    const timer = setTimeout(async () => {
      try {
        const { data } = await APISettings.getRatingResult(payload)
        if (cancelled) return

        const nextMachines = unwrapList(data).map(normalizeMachine)
        setMachines(nextMachines)
        log.info('useRating.machines.success', {
          count: nextMachines.length,
          payload,
        })
      } catch (err) {
        if (cancelled) return
        setMachines([])
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

    const payload = buildRatingPayload(rating, machine)
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
    calculation,
    isLoading,
    isCalculating,
    error,
    calculate,
  }
}

export default useRating
