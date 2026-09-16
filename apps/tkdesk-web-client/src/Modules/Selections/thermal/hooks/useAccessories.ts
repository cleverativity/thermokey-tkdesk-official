import { useState, useEffect } from 'react'
import * as APISettings from 'Api/Thermal/api/endpoints'
import { ConsoleLogger } from 'aws-amplify/utils'

interface UseAccessoriesParams {

  selectedAccessoryIds: number[]
  condenser: any

}
export const useAccessories = ({ condenser, selectedAccessoryIds }: UseAccessoriesParams) => {
  const log = new ConsoleLogger('Modules/Selections/thermal/hooks/useDetail')


  const [isLoading, setIsLoading] = useState(false)
  const [accessoriesList, setAccessoriesList] = useState<any>(null)
  const [accessoriesPrice, setAccessoriesPrice] = useState<any>({})
  const [discount, setDiscount] = useState({
    accDiscount: 0,
    unitDiscount: 0,
  })

  useEffect(() => {
    if (!condenser) return
    const load = async () => {
      try {
        const { data } = await APISettings.getAccessories(condenser)
        setAccessoriesList(data)
      } catch (error) {
        log.error('Error fetching accessories:', error)
        setAccessoriesList(null)
      }
    }
    load()
  }, [condenser])



  useEffect(() => {

    const selectedItems = Array.isArray(selectedAccessoryIds) ? selectedAccessoryIds : []
    const newCondenser = {
      ...condenser,
      selectedItems,
      unitDiscount: Number(discount?.unitDiscount) || 0,
      accessoriesDiscount: Number(discount?.accDiscount) || 0,
    }
    log.info("useAccessories.newCondenser", newCondenser)

    const timer = setTimeout(async () => {
      try {
        const { data } = await APISettings.getAccessoriesPrice(newCondenser)
        setAccessoriesPrice(data[0])
        setIsLoading(false)
        log.info('useAccessories:', data[0], newCondenser)
      } catch (error) {
        log.error('Error fetching performance results:', error)
        setIsLoading(false)
      }
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [selectedAccessoryIds, discount])

  log.info("useAccessories", condenser, accessoriesList, accessoriesPrice, selectedAccessoryIds)

  return { accessoriesList, accessoriesPrice, isLoading, setDiscount, discount }
}

