import { FieldDecimalNumber, FieldUnitInput } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import React from 'react'

interface AirProps {
  unitTypes: string
}

const TEMP_UNITS = { si: 32, ip: 33 }
const AIR_QUERY = {
  product: 'condenser' as const,
  step: 'Working point',
  section: 'Working Point (air)',
}

function Air(props: AirProps) {
  const { unitTypes } = props
  const { values, setFieldValue } = useFormikContext<any>()
  const twoColSpan = { xs: 24, sm: 12 }

  const initialAirInletTemp = useUnitMeasureField({
    query: {
      ...AIR_QUERY,
      variable: 'airInletTemp',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'wp.airInletTemp',
    unitField: 'wp.airInletTempType',
    defaultValue: 20,
    defaultUnitIds: TEMP_UNITS,
  })

  const finalAirInletTemp = useUnitMeasureField({
    query: {
      ...AIR_QUERY,
      variable: 'finalAirInletTemp',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'wp.finalAirInletTemp',
    unitField: 'wp.finalAirInletTempType',
    defaultValue: 35,
    defaultUnitIds: TEMP_UNITS,
  })

  const tempStep = useUnitMeasureField({
    query: {
      ...AIR_QUERY,
      variable: 'tempStep',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'wp.tempStep',
    unitField: 'wp.tempStepType',
    defaultValue: 1,
    defaultUnitIds: TEMP_UNITS,
    asDelta: true,
  })

  return (
    <>
      <StyledCollapse defaultActiveKey={['2']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.working_point_air'
          key='2'
        >
          <StyledRow gutter={[16, 16]} align='top'>
            <FieldDecimalNumber
              span={twoColSpan}
              name='wp.relHumidity'
              label='data.thermal.wp.rel_humidity'
              scale={1}
              defaultValue={50}
              required
              hasFeedback={false}
              controls={false}
              isPointed={true}
              addonAfter='%'
            />
            <FieldUnitInput
              span={twoColSpan}
              labelId='data.thermal.wp.airInletTemp'
              field={initialAirInletTemp}
              valueName='wp.airInletTemp'
              unitName='wp.airInletTempType'
              required
              unitSelectWidth={72}
            />
            <FieldUnitInput
              span={twoColSpan}
              labelId='data.thermal.wp.finalAirInletTemp'
              field={finalAirInletTemp}
              valueName='wp.finalAirInletTemp'
              unitName='wp.finalAirInletTempType'
              required
              unitSelectWidth={72}
            />
            <FieldUnitInput
              span={twoColSpan}
              labelId='data.thermal.wp.tempStep'
              field={tempStep}
              valueName='wp.tempStep'
              unitName='wp.tempStepType'
              required
              unitSelectWidth={72}
            />
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Air
