import { FieldUnitInput, FieldDecimalNumber } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'

interface FluidProps {
  unitTypes: string
}

function Noise(props: FluidProps) {
  const { values, setFieldValue } = useFormikContext<any>()
  const distanceField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Noise',
      variable: 'distance',
    },
    values,
    setFieldValue,
    unitTypes: props.unitTypes,
    valueField: 'condenser.distance',
    unitField: 'condenser.distanceType',
    defaultValue: 10,
    defaultUnitIds: { si: 167, ip: 167 },
  })

  return (
    <>
      <StyledCollapse defaultActiveKey={['6']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel header='ui.thermal.panelHeader.noise' key='6'>
          <StyledRow gutter={[16, 16]}>
            <FieldDecimalNumber
              span={{ sm: 24, md: 12, lg: 6 }}
              name='condenser.splValue'
              label='data.thermal.field.spl'
              scale={1}
              required
              hasFeedback={false}
              controls={false}
              defaultValue={65}
              isPointed={true}
            />

            <FieldUnitInput
              span={{ sm: 24, lg: 12, xl: 6 }}
              labelId='data.thermal.field.distance'
              field={distanceField}
              valueName='condenser.distance'
              unitName='condenser.distanceType'
              required
              unitSelectWidth={112}
            />
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Noise
