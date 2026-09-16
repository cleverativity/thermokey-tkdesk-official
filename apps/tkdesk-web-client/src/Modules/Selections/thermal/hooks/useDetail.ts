import { useEffect, useState } from 'react'
import { ConsoleLogger } from 'aws-amplify/utils'
import * as APISettings from 'Api/Thermal/api/endpoints'

const log = new ConsoleLogger('Modules/Selections/thermal/hooks/useDetail')

interface UseDetailParams {
  condenser: any
  unitsType: any
  adjustValue?: any
  adjustType?: string
}

export const useDetail = ({
  condenser,
  unitsType,
  adjustValue,
  adjustType
}: UseDetailParams) => {
  const [isLoading, setIsLoading] = useState(false)
  const [performance, setPerformance] = useState<any>({})



  useEffect(() => {
    setIsLoading(true)

    const newCondenser = {
      ...condenser,
      unitsType: unitsType,
      ...(adjustType === 'ac' && {
        capacityAdjustment: adjustValue?.newCapacity || 0,
        newAirflow: 0
      }),
      ...(adjustType === 'aff' && {
        capacityAdjustment: adjustValue?.newCapacity || 0,
        newAirflow: adjustValue?.newAirFlow || 0
      }),

    }

    log.info('useDetail:', { adjustValue, newCondenser, adjustType })
    const timer = setTimeout(async () => {
      try {
        const { data } = await APISettings.getPerformance(newCondenser)
        setPerformance(data[0])
        setIsLoading(false)
        log.info('useDetailSuccess:', data[0], newCondenser)
      } catch (error) {
        log.error('Error fetching performance results:', error)
        setIsLoading(false)
      }
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [unitsType, condenser, adjustValue])

  return { performance, isLoading }
}
