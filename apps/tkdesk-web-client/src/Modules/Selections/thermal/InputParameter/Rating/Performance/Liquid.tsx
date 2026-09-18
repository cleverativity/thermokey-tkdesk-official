import { FieldThermalSelect, FieldUnitInput } from 'Components/Field'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import React from 'react'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'

interface LiquidProps {
  data?: {
    refType?: any[]
  }
  unitTypes: string
}

function Liquid(props: LiquidProps) {
  const { unitTypes } = props
  const { refType } = props.data ?? {}
  const { values, setFieldValue } = useFormikContext<any>()
  const twoColSpan = { xs: 24, sm: 12 }

  const condensing = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Fluid',
      variable: 'condensing',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'rating.condensing',
    unitField: 'rating.condensingType',
    defaultValue: 45,
    defaultUnitIds: { si: 32, ip: 33 },
  })

  const subCooling = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Fluid',
      variable: 'subCooling',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'rating.subCooling',
    unitField: 'rating.subCoolingType',
    defaultValue: 5,
    defaultUnitIds: { si: 35, ip: 33 },
  })

  const capacity = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Performance',
      variable: 'capacity',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'rating.thermalCapacity',
    unitField: 'rating.thermalCapacityType',
    extraUnitFields: ['rating.thermalCapacity_unit'],
    defaultUnitIds: { si: 6, ip: 8 },
    defaultValue: 100,
    baseField: 'rating.thermalCapacityBaseW',
  })

  return (
    <>
      <StyledCollapse defaultActiveKey={['3']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.rating_liquid'
          key='3'
        >
          <StyledRow gutter={[16, 16]} align='top'>
            <FieldThermalSelect
              span={twoColSpan}
              data={refType}
              name='rating.refrigerantType'
              label='data.thermal.field.refrigerant_type'
              field='condenser_type'
              defaultValue='R404A'
              required
              hasFeedback={false}
            />
            <FieldUnitInput
              span={twoColSpan}
              labelId='data.thermal.rating.condensing'
              field={condensing}
              valueName='rating.condensing'
              unitName='rating.condensingType'
              required
            />
            <FieldUnitInput
              span={twoColSpan}
              labelId='data.thermal.rating.subCooling'
              field={subCooling}
              valueName='rating.subCooling'
              unitName='rating.subCoolingType'
              required
            />
            <FieldUnitInput
              span={twoColSpan}
              labelId='data.thermal.rating.capacity'
              field={capacity}
              valueName='rating.thermalCapacity'
              unitName='rating.thermalCapacityType'
              required
            />
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Liquid
