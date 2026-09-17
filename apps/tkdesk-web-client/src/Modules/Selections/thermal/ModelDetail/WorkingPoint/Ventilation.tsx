import { FieldUnitInput } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'

interface VentilationProps {
  unitTypes: string
}

function Ventilation(props: VentilationProps) {
  const { unitTypes } = props
  const { values, setFieldValue } = useFormikContext<any>()

  const liquidDistanceTemp = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Working point',
      section: 'Working Point (ventilation)',
      variable: 'liquidDistanceTemp',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'wp.liquidDistanceTemp',
    unitField: 'wp.liquidDistanceTempType',
    defaultValue: 10,
    defaultUnitIds: { si: 1, ip: 3 },
  })

  return (
    <>
      <StyledCollapse defaultActiveKey={['4']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.working_ventilation'
          key='4'
        >
          <StyledRow gutter={[16, 16]} align='top'>
            <FieldUnitInput
              span={{ xs: 24 }}
              labelId='data.thermal.wp.liquidDistanceTemp'
              field={liquidDistanceTemp}
              valueName='wp.liquidDistanceTemp'
              unitName='wp.liquidDistanceTempType'
              required
              unitSelectWidth={72}
            />
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Ventilation
