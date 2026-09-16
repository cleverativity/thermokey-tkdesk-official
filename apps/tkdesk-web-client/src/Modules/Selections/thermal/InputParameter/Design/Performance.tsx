import {
  FieldUnitInput,
  FieldDecimalNumber,
  FieldThermalSelect,
} from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from '../../../units/shared/variableUnitField'

const CAPACITY_UNITS_QUERY = {
  product: 'condenser' as const,
  step: 'Input parameters',
  section: 'Performance',
  variable: 'capacity',
}

interface PerformanceProps {
  data?: {
    condensersModel?: any[]
  }
  unitTypes?: string
}
function Performance(props: PerformanceProps) {
  const { values, setFieldValue } = useFormikContext<any>()
  const { condensersModel } = props.data

  const capacityField = useUnitMeasureField({
    query: CAPACITY_UNITS_QUERY,
    values,
    setFieldValue,
    unitTypes: props.unitTypes,
    valueField: 'condenser.thermalCapacity',
    unitField: 'condenser.thermalCapacityType',
    extraUnitFields: ['condenser.capacity_unit'],
    defaultValue: 50,
    defaultUnitIds: { si: 6, ip: 8 },
    baseField: 'condenser.thermalCapacityBaseW',
  })

  return (
    <>
      <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.performance'
          key='1'
        >
          <StyledRow gutter={[16, 16]}>
            <FieldUnitInput
              span={{ sm: 24, lg: 12, xl: 7 }}
              labelId='data.thermal.field.thermalCapacity'
              field={capacityField}
              valueName='condenser.thermalCapacity'
              unitName='condenser.thermalCapacityType'
              required
              unitSelectWidth={128}
            />
            <FieldDecimalNumber
              span={{ xs: 24, sm: 24, md: 24, lg: 6 }}
              name='condenser.tolerance'
              label='data.thermal.field.tolerance'
              showUnitAddon={false}
              required
              hasFeedback={false}
              controls={false}
              defaultValue={10}
              isPointed={true}
            />
            <FieldThermalSelect
              span={{ xs: 24, sm: 24, md: 24, lg: 6 }}
              data={condensersModel}
              name='condenser.condenserModel'
              label='data.thermal.field.condenser_model'
              defaultValue='TMCH1140HLL1'
              field='model'
              required
            />
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Performance
