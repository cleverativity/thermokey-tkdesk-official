import { FieldUnitInput } from 'Components/Field'
import { SpanIntl } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import { useAuthorization } from 'Modules/App/Authorization'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'

interface NoiseProps {
  unitTypes: string
}

function Noise(props: NoiseProps) {
  const { values, setFieldValue } = useFormikContext<any>()
  const autho = useAuthorization()
  const maxSoundPowerField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Noise',
      variable: 'maxSoundPower',
    },
    values,
    setFieldValue,
    unitTypes: props.unitTypes,
    valueField: 'condenser.maxSoundPower',
    unitField: 'condenser.maxSoundPowerType',
    defaultUnitIds: { si: 168, ip: 168 },
  })
  const maxSoundPressureField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Noise',
      variable: 'maxSoundPressure',
    },
    values,
    setFieldValue,
    unitTypes: props.unitTypes,
    valueField: 'condenser.maxSoundPressure',
    unitField: 'condenser.maxSoundPressureType',
    defaultUnitIds: { si: 168, ip: 168 },
  })
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
    defaultUnitIds: { si: 1, ip: 3 },
  })
  const noiseToleranceField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Noise',
      variable: 'noiseTolerance',
    },
    values,
    setFieldValue,
    unitTypes: props.unitTypes,
    valueField: 'condenser.noiseTolerance',
    unitField: 'condenser.noiseToleranceType',
    defaultValue: 3,
    defaultUnitIds: { si: 168, ip: 168 },
  })

  return (
    <>
      <StyledCollapse defaultActiveKey={['6']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel header='ui.thermal.panelHeader.noise' key='6'>
          <StyledRow gutter={[16, 16]} style={{ alignItems: 'center' }}>
            <FieldUnitInput
              span={{ sm: 24, lg: 12, xl: 4 }}
              labelId='data.selections.input_parameters.max_sound_power'
              field={maxSoundPowerField}
              valueName='condenser.maxSoundPower'
              unitName='condenser.maxSoundPowerType'
              unitSelectWidth={112}
            />
            <FieldUnitInput
              span={{ sm: 24, lg: 12, xl: 5 }}
              labelId='data.selections.input_parameters.max_sound_pressure'
              field={maxSoundPressureField}
              valueName='condenser.maxSoundPressure'
              unitName='condenser.maxSoundPressureType'
              unitSelectWidth={112}
            />
            <SpanIntl value='data.generic.at' style={{ padding: '0 10px' }} />
            <FieldUnitInput
              span={{ sm: 24, lg: 12, xl: 5 }}
              labelId='data.selections.input_parameters.distance'
              field={distanceField}
              valueName='condenser.distance'
              unitName='condenser.distanceType'
              unitSelectWidth={64}
            />
            <SpanIntl value='data.selections.model_detail.distance.law' />
          </StyledRow>
          {autho.iAmAdmin ? (
            <StyledRow gutter={[16, 16]} style={{ marginTop: 16 }}>
              <FieldUnitInput
                span={{ sm: 24, lg: 12, xl: 4 }}
                labelId='data.selections.input_parameters.tolerance'
                field={noiseToleranceField}
                valueName='condenser.noiseTolerance'
                unitName='condenser.noiseToleranceType'
                unitSelectWidth={112}
              />
            </StyledRow>
          ) : null}
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Noise
