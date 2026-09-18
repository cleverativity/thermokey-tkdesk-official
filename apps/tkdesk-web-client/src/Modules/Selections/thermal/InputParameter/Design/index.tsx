import React, { useEffect, useRef } from 'react'
import _ from 'lodash'
import { ConsoleLogger } from 'aws-amplify/utils'
import { useFormikContext } from 'formik'
import useAtmospheric from '../../hooks/useAtmospheric'

import Performance from './Performance'
import Dimensions from './Dimensions'
import Fans from './Fans'
import Noise from './Noise'
import Air from './Air'
import Fluid from './Fluid'

interface DesignInputParameterProps {
  data?: any
  preferences: any
}

function DesignInputParameter(props: DesignInputParameterProps) {
  const log = new ConsoleLogger('Modules/Selections/DesignInputParameterProps')
  const { data, preferences } = props
  const { values, setFieldValue } = useFormikContext<any>()
  const lastAtmosphericPressRef = useRef<number | null>(null)

  const unitsType = _.get(preferences, 'um_system', 'si')
  const condenser: any = _.get(values, 'condenser', {})

  const { atmosphericPress } = useAtmospheric({
    condenser,
    unitsType,
  })

  useEffect(() => {
    setFieldValue('condenser.currentUnitType', unitsType)
  }, [unitsType, setFieldValue])

  useEffect(() => {
    const min = _.get(values, 'condenser.toleranceMin')
    const max = _.get(values, 'condenser.toleranceMax')

    if (min === null || min === undefined || min === '') {
      setFieldValue('condenser.toleranceMin', -10, false)
    }
    if (max === null || max === undefined || max === '') {
      setFieldValue('condenser.toleranceMax', 10, false)
    }
  }, [setFieldValue, values])

  useEffect(() => {
    if (atmosphericPress == null) return
    if (lastAtmosphericPressRef.current === atmosphericPress) return

    lastAtmosphericPressRef.current = atmosphericPress
    setFieldValue('condenser.atmosphericPress', atmosphericPress, false)
    log.info('DesignInputParameter.atmosphericPress', atmosphericPress)
  }, [atmosphericPress, setFieldValue])

  const onChangeRelHumidity = (value: number) => {
    setFieldValue('condenser.relHumidity', value)
    log.info('onChangeRelHumidity', value)
  }

  const onChangeAltitude = (value: number) => {
    setFieldValue('condenser.altitude', value)
    log.info('onChangeAltitude', value)
  }

  return (
    <>
      <Performance data={data} unitTypes={unitsType} />
      <Fluid data={data} unitTypes={unitsType} />
      <Air
        onChangeRelHumidity={onChangeRelHumidity}
        onChangeAltitude={onChangeAltitude}
        unitTypes={unitsType}
      />
      <Dimensions data={data} unitTypes={unitsType} />
      <Fans data={data} unitTypes={unitsType} />
      <Noise unitTypes={unitsType} />
    </>
  )
}

export default DesignInputParameter
