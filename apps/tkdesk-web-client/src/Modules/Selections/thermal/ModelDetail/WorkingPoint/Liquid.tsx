import { FieldUnitInput } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import React from 'react'

interface LiquidProps {
  unitTypes: string
}

function Liquid(props: LiquidProps) {
  const { unitTypes } = props
  const { values, setFieldValue } = useFormikContext<any>()

  const liquidInletTemp = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Working point',
      section: 'Working Point (liquid)',
      variable: 'liquidInletTemp',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'wp.liquidInletTemp',
    unitField: 'wp.liquidInletTempType',
    defaultValue: 45,
    defaultUnitIds: { si: 32, ip: 33 },
  })

  return (
    <>
      <StyledCollapse defaultActiveKey={['2']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.working_point_liquid'
          key='2'
        >
          <StyledRow gutter={[16, 16]} align='top'>
            <FieldUnitInput
              span={{ xs: 24 }}
              labelId='data.thermal.wp.liquidInletTemp'
              field={liquidInletTemp}
              valueName='wp.liquidInletTemp'
              unitName='wp.liquidInletTempType'
              required
              unitSelectWidth={72}
            />
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Liquid
