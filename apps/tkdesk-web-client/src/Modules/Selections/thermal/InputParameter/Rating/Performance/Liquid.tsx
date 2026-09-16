import {
  FieldThermalSelect,
  FieldUnitInput,
} from 'Components/Field'
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
    defaultUnitIds: { si: 34, ip: 33 },
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
    valueField: 'rating.capacity',
    unitField: 'rating.capacityType',
    extraUnitFields: ['rating.capacity_unit'],
    defaultUnitIds: { si: 6, ip: 8 },
    baseField: 'rating.capacityBaseW',
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
              defaultValue='R-404A'
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
              valueName='rating.capacity'
              unitName='rating.capacityType'
              required
            />
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Liquid
