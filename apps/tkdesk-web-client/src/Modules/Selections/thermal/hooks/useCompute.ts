import { useEffect, useState } from 'react'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Modules/Selections/thermal/hooks/useCompute')

type ApiFn = (payload: any) => Promise<{ data: any; error?: any }>

interface useComputeParams {
  compute: any
  unitsType: string
  apiFn: ApiFn
  enabled?: boolean // Add enabled flag to control when API calls should be made
}

export const useCompute = ({
  compute,
  unitsType,
  apiFn,
  enabled = true, // Default to true for backward compatibility
}: useComputeParams) => {
  const [adjustResult, setAdjustResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const calculate = async (value: any) => {
    if (!enabled) return

    try {
      setIsLoading(true)
      setError(null)

      const newCompute = {
        ...value,
        unitsType: unitsType,
      }
      log.info('onCompute:', newCompute)
      const { data } = await apiFn(newCompute)
      const result = Array.isArray(data) ? data[0] : data
      setAdjustResult(result ?? null)
      log.info('onComputeSuccess:', result)
    } catch (err) {
      setAdjustResult(null)
      setError(err)
      log.error('Error in onCompute:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Skip API call if not enabled or compute is null/undefined/empty
    if (!enabled || !compute || Object.keys(compute).length === 0) {
      log.info('useCompute.UseEffect: Skipped', {
        enabled,
        compute,
        hasCompute: !!compute,
      })
      return
    }

    const newCompute = {
      ...compute,
      unitsType: unitsType,
    }
    log.info('useCompute.UseEffect: Executing API call', {
      newCompute,
      enabled,
      unitsType,
    })

    setIsLoading(true)
    setError(null)

    const timer = setTimeout(async () => {
      try {
        const { data } = await apiFn(newCompute)
        const result = Array.isArray(data) ? data[0] : data
        setAdjustResult(result ?? null)

        log.info('useComputeSuccess:', result, newCompute)
      } catch (err) {
        setAdjustResult(null)
        setError(err)
        log.error('Error fetching useCompute results:', err)
      } finally {
        setIsLoading(false)
      }
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [unitsType, JSON.stringify(compute), enabled])

  return { adjustResult, calculate, isLoading, error }
}
