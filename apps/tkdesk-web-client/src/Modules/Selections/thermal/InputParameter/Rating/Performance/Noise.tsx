import { FieldUnitInput } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'

interface NoiseProps {
  unitTypes: string
}

function Noise(props: NoiseProps) {
  const { unitTypes } = props
  const { values, setFieldValue } = useFormikContext<any>()

  const noise = useUnitMeasureField({
    query: {
      product: 'drycooler',
      step: 'Rating',
      section: 'Noise',
      variable: 'noise',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'rating.noise',
    unitField: 'rating.noiseType',
    defaultUnitIds: { si: 1, ip: 3 },
  })
  return (
    <>
      <StyledCollapse defaultActiveKey={['4']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.rating_noise'
          key='4'
        >
          <StyledRow gutter={[16, 16]}>
            <FieldUnitInput
              span={{ xs: 24 }}
              labelId='data.thermal.rating.noise'
              field={noise}
              valueName='rating.noise'
              unitName='rating.noiseType'
              required
            />
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Noise
