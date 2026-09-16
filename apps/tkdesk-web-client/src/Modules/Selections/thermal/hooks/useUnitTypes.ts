import { useEffect, useState } from 'react'
import * as APISettings from 'Api/Thermal/api/endpoints'
import { ConsoleLogger } from 'aws-amplify/utils'

interface UnitTypeInputFields {

  unitTypes: string
  capacity: number
  altitude: number
  drybulb: number
  compressor: number
  condensing: number
  subCooling: number
  distance: number
  relhumidity: number
  atmposphericPress?: number
  relHumidity?: number
}


function useUnitTypes(unitTypesFieldProps?: UnitTypeInputFields | null) {
  const log = new ConsoleLogger('Modules/Selections/thermal/hooks/useUnitTypes')
  // Initialize with props so consumers have values immediately while API loads
  const [unitTypesField, setUnitTypesField] = useState<UnitTypeInputFields | null>(
    unitTypesFieldProps ?? null
  )

  useEffect(() => {

    if (!unitTypesFieldProps) return

    const load = async () => {
      try {
        const { data } = await APISettings.getUnitTypeFields(unitTypesFieldProps)
        setUnitTypesField(data ?? unitTypesFieldProps)
      } catch (error) {
        log.error('Error fetching unit type fields:', error)
        setUnitTypesField(unitTypesFieldProps)
      }
    }
    load()
  }, [
    unitTypesFieldProps
  ])


  log.info("useUnitTypes", unitTypesField, unitTypesFieldProps)
  return { unitTypesField }
}

export default useUnitTypes