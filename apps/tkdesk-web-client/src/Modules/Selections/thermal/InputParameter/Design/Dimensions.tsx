import { FieldThermalSelect, FieldUnitInput } from 'Components/Field'
import { StyledCollapse, StyledCollapsePanel } from 'Components/Styled'
import Row from 'Components/Styled/Row'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import React from 'react'

interface DimensionsProps {
  data?: {
    condensersType?: any[]
  }
  unitTypes: string
}

function Dimensions(props: DimensionsProps) {
  const { condensersType } = props.data ?? {}
  const { unitTypes } = props
  const { values, setFieldValue } = useFormikContext<any>()

  const maxLengthField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Dimensions',
      variable: 'maxLength',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'condenser.maxLength',
    unitField: 'condenser.maxLengthType',
    defaultUnitIds: { si: 1, ip: 3 },
  })
  const maxHeightField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Dimensions',
      variable: 'maxHeight',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'condenser.maxHeight',
    unitField: 'condenser.maxHeightType',
    defaultUnitIds: { si: 1, ip: 3 },
  })
  const maxWidthField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Dimensions',
      variable: 'maxWidth',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'condenser.maxWidth',
    unitField: 'condenser.maxWidthType',
    defaultUnitIds: { si: 1, ip: 3 },
  })

  return (
    <>
      <StyledCollapse defaultActiveKey={['4']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.selections.steps.input_parameters.dimensions'
          key='4'
        >
          <Row gutter={[16, 16]}>
            <FieldThermalSelect
              span={{ sm: 24, md: 12, lg: 6 }}
              data={condensersType}
              name='condenser.condenserType'
              label='data.thermal.field.condenser_type'
              field='condenser_type'
              defaultValue='All'
              required
            />
            <FieldUnitInput
              span={{ sm: 24, md: 12, lg: 6 }}
              labelId='data.selections.input_parameters.max_length'
              field={maxLengthField}
              valueName='condenser.maxLength'
              unitName='condenser.maxLengthType'
              unitSelectWidth={64}
              useFormikValueChange
            />
            <FieldUnitInput
              span={{ sm: 24, md: 12, lg: 6 }}
              labelId='data.selections.input_parameters.max_height'
              field={maxHeightField}
              valueName='condenser.maxHeight'
              unitName='condenser.maxHeightType'
              unitSelectWidth={64}
              useFormikValueChange
            />
            <FieldUnitInput
              span={{ sm: 24, md: 12, lg: 6 }}
              labelId='data.selections.input_parameters.max_width'
              field={maxWidthField}
              valueName='condenser.maxWidth'
              unitName='condenser.maxWidthType'
              unitSelectWidth={64}
              useFormikValueChange
            />
          </Row>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Dimensions
