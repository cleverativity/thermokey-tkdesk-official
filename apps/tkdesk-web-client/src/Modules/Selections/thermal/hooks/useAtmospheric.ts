import { useEffect, useState } from 'react'
import { ConsoleLogger } from 'aws-amplify/utils'
import * as APISettings from 'Api/Thermal/api/endpoints'

const log = new ConsoleLogger('Modules/Selections/thermal/hooks/useAtmospheric')

const DEBOUNCE_MS = 500

const DEFAULTS = {
  capacity: 50,
  drybulb: 25,
  compressor: 25,
  condensing: 40,
  subCooling: 3,
  distance: 10,
  relHumidity: 50,
  atmposphericPress: 101.326,
} as const

interface UseAtmosphericParams {
  condenser?: any
  unitsType?: string
  enabled?: boolean
}

const unwrap = (raw: any) =>
  raw && typeof raw === 'object' && !Array.isArray(raw) ? raw.value : raw

const readNumber = (source: any, path: string, fallback: number) => {
  const value = path.split('.').reduce((acc, key) => acc?.[key], source)
  const n = Number(unwrap(value))
  return Number.isFinite(n) ? n : fallback
}

const toApiUnitType = (unitsType?: string) => {
  const raw = String(unitsType || 'si').toLowerCase()
  if (raw === 'imp' || raw.includes('i-p') || raw.includes('english')) {
    return 'I-P (English)'
  }
  return 'SI (Metric)'
}

const buildAtmosphericPayload = (condenser: any = {}, unitsType?: string) => ({
  unitTypes: toApiUnitType(unitsType),
  capacity: DEFAULTS.capacity,
  altitude: readNumber(condenser, 'altitude', 0),
  drybulb: DEFAULTS.drybulb,
  compressor: DEFAULTS.compressor,
  condensing: DEFAULTS.condensing,
  subCooling: DEFAULTS.subCooling,
  distance: DEFAULTS.distance,
  atmposphericPress: DEFAULTS.atmposphericPress,
  relHumidity: DEFAULTS.relHumidity,
})

const readAtmosphericPress = (data: any) => {
  if (data == null) return null
  const raw =
    data.atmposphericPress ??
    data.atmosphericPress ??
    data.atmospheric_pressure ??
    data
  const n = Number(unwrap(raw))
  return Number.isFinite(n) ? n : null
}

const dependencyKey = (condenser: any = {}, unitsType?: string) =>
  JSON.stringify({
    unitTypes: toApiUnitType(unitsType),
    altitude: readNumber(condenser, 'altitude', 0),
  })

export const useAtmospheric = ({
  condenser,
  unitsType = 'si',
  enabled = true,
}: UseAtmosphericParams) => {
  const [atmosphericPress, setAtmosphericPress] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const payloadKey = dependencyKey(condenser, unitsType)

  useEffect(() => {
    if (!enabled || !condenser) {
      log.info('useAtmospheric: Skipped', {
        enabled,
        hasCondenser: !!condenser,
      })
      return
    }

    let cancelled = false
    const payload = buildAtmosphericPayload(condenser, unitsType)

    log.info('useAtmospheric: Executing API call', { payload })
    setIsLoading(true)
    setError(null)

    const timer = setTimeout(async () => {
      try {
        const { data } = await APISettings.getUnitTypeFields(payload)
        if (cancelled) return

        const next = readAtmosphericPress(data)
        setAtmosphericPress(next)
        log.info('useAtmospheric.success', {
          data,
          atmosphericPress: next,
          payload,
        })
      } catch (err) {
        if (cancelled) return
        setError(err)
        log.error('useAtmospheric.error', err)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [enabled, payloadKey])

  return { atmosphericPress, isLoading, error }
}

export default useAtmospheric
