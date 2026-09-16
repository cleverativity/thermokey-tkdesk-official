import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { ConsoleLogger } from 'aws-amplify/utils'
import { useFormikContext } from 'formik'
import useUnitTypes from '../../hooks/useUnitTypes'

import Performance from './Performance'
import Dimensions from './Dimensions'
import Fans from './Fans'
import Noise from './Noise'
import Air from './Air'
import Fluid from './Fluid'

import { Tabs } from 'antd'
import { useIntl } from 'react-intl'

interface DesignInputParameterProps {
  data?: any
  preferences: any
}

// interface UnitTypeInputFields {
//   unitTypes: string
//   capacity: number
//   altitude: number
//   drybulb: number
//   compressor: number
//   condensing: number
//   subCooling: number
//   distance: number
//   relhumidity: number
// }

function DesignInputParameter(props: DesignInputParameterProps) {
  const intl = useIntl()
  const log = new ConsoleLogger('Modules/Selections/DesignInputParameterProps')
  const { data, preferences } = props
  const formik = useFormikContext()
  const { values, setFieldValue } = formik
  const [newValueRelHumidity, setNewValueRelHumidity] = useState<number | null>(
    50,
  )

  const tabsPanels = [
    {
      label: intl.formatMessage({
        id: 'ui.thermal.tabs.design',
      }),
      key: 'design',
    },
    {
      label: intl.formatMessage({ id: 'ui.thermal.tabs.rating' }),
      key: 'rating',
    },
  ]

  const [activeTab, setActiveTab] = React.useState(tabsPanels[0].key)

  const [newValueAltitude, setNewValueAltitude] = useState<number | null>(0)
  // const hasNormalizedThermalCapacityRef = useRef(false)

  const unitsType = _.get(preferences, 'um_system', 'si')
  const condenser: any = _.get(values, 'condenser', [])

  // const defaultPressureUnit: PressureUnit = unitsType === 'imp' ? 'psi' : 'kPa'
  //const defaultCapacityUnit: CapacityUnit = unitsType === 'imp' ? 'Btu/h' : 'kW'

  useEffect(() => {
    setFieldValue('condenser.currentUnitType', unitsType)
  }, [unitsType])

  // useEffect(() => {
  //   if (hasNormalizedThermalCapacityRef.current) return

  //   const type = _.get(
  //     values,
  //     'condenser.thermalCapacityType.value',
  //     _.get(
  //       values,
  //       'condenser.thermalCapacityType',
  //       _.get(values, 'condenser.capacity_unit'),
  //     ),
  //   )
  //   const rawValue = _.get(values, 'condenser.thermalCapacity')
  //   const value = Number(_.get(rawValue, 'value', rawValue))
  //   if (!type || !Number.isFinite(value)) return

  //   hasNormalizedThermalCapacityRef.current = true

  //   if (type !== 'kW') {
  //     const convertedKw = convertCapacity(value, type as CapacityUnit, 'kW', {
  //       round: false,
  //     })
  //     setFieldValue('condenser.thermalCapacity', convertedKw, false)
  //     setFieldValue('condenser.thermalCapacity.value', convertedKw, false)
  //     setFieldValue('condenser.thermalCapacity.type', 'kW', false)
  //     setFieldValue('condenser.thermalCapacityType', 'kW', false)
  //     setFieldValue('condenser.thermalCapacityType.value', 'kW', false)
  //     setFieldValue('condenser.capacity_unit', 'kW', false)
  //   }
  // }, [setFieldValue, values])

  // const [newValueUnitType, setNewValueUnitTypes] =
  //   useState<UnitTypeInputFields | null>(null)

  // let unitTypesPayload: UnitTypeInputFields

  // if (unitsType === 'si') {
  //   unitTypesPayload = {
  //     unitTypes: unitsType,
  //     capacity: 170605,
  //     altitude: newValueAltitude,
  //     drybulb: 77,
  //     compressor: 45,
  //     condensing: 104,
  //     subCooling: 5.4,
  //     distance: 32.81,
  //     relhumidity: newValueRelHumidity,
  //   }
  // } else {
  //   unitTypesPayload = {
  //     unitTypes: unitsType,
  //     capacity: 50,
  //     altitude: newValueAltitude,
  //     drybulb: 25,
  //     compressor: 25,
  //     condensing: 40,
  //     subCooling: 3,
  //     distance: 10,
  //     relhumidity: newValueRelHumidity,
  //   }
  // }

  //UnitTypeFields Hook
  // const { unitTypesField } = useUnitTypes(newValueUnitType)

  // useEffect(() => {
  //   if (unitTypesField) {
  //     //setFieldValue('condenser.thermalCapacity', unitTypesField.capacity)
  //     // setFieldValue('condenser.altitude', unitTypesPayload.altitude)
  //     // setFieldValue('condenser.dryBulb', unitTypesField.drybulb)
  //     // setFieldValue('condenser.compressor', unitTypesField.compressor)
  //     // setFieldValue('condenser.condensing', unitTypesField.condensing)
  //     // setFieldValue('condenser.subCooling', unitTypesField.subCooling)
  //     // setFieldValue('condenser.distance', unitTypesField.distance)
  //     setFieldValue('condenser.relHumidity', unitTypesPayload.relhumidity)
  //     // setFieldValue(
  //     //   'condenser.atmosphericPress',
  //     //   unitTypesField.atmposphericPress,
  //     // )
  //   }

  //   log.info('CondenserResults.useEffect:', {
  //     unitTypesPayload,
  //     condenser,
  //   })
  // }, [
  //   //defaultCapacityUnit,
  //   // defaultPressureUnit,
  //   setFieldValue,
  //   unitTypesField,
  //   unitsType,
  //   values,
  // ])

  const onTabChange = (key: string) => {
    setActiveTab(key)
    setFieldValue('ea.activeThermalTab', key)
    log.info('ThermalModelDetail.tabChanged', { activeTab: key })
  }

  // useEffect(() => {
  //   // Set default values when unit type changes (SI vs I-P) so useUnitTypes + form get correct defaults
  //   setNewValueUnitTypes({
  //     unitTypes: unitsType,
  //     capacity: unitTypesPayload.capacity,
  //     altitude: newValueAltitude,
  //     drybulb: unitTypesPayload.drybulb,
  //     compressor: unitTypesPayload.compressor,
  //     condensing: unitTypesPayload.condensing,
  //     subCooling: unitTypesPayload.subCooling,
  //     distance: unitTypesPayload.distance,
  //     relhumidity: newValueRelHumidity,
  //   })
  // }, [unitsType, newValueAltitude, newValueRelHumidity])

  // log.info(
  //   'ThermalInputParameter.useEffect',
  //   newValueUnitType,
  //   unitTypesPayload,
  //   data,
  // )

  const OnChangeRelHumidity = (value: number) => {
    setNewValueRelHumidity(value)
    setFieldValue('condenser.relHumidity', value)
    log.info('OnChangeRelHumidity', value)
  }

  const OnChangeAltitude = (value: number) => {
    setNewValueAltitude(value)
    setFieldValue('condenser.altitude', value)
    log.info('OnChangeAltitude', value)
  }

  // log.info(
  //   'ThermalInputParameter.render',
  //   unitTypesField,
  //   newValueUnitType,
  //   unitTypesPayload,
  // )

  return (
    <>
      <Performance data={data} unitTypes={unitsType} />
      <Air
        OnChangeRelHumidity={OnChangeRelHumidity}
        OnChangeAltitude={OnChangeAltitude}
        unitTypes={unitsType}
      />
      <Fluid data={data} unitTypes={unitsType} />
      <Dimensions data={data} />
      <Fans data={data} />
      <Noise unitTypes={unitsType} />
    </>
  )
}

export default DesignInputParameter
