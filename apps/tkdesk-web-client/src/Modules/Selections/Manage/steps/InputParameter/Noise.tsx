import { useAuthorization } from 'Modules/App/Authorization'

import { FieldDecimalNumber } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { SpanIntl } from 'Components/Span'

const Noise = () => {
  const autho = useAuthorization()

  return (
    <StyledCollapse defaultActiveKey={['5']} style={{ marginTop: '30px' }}>
      <StyledCollapsePanel
        header='ui.selections.steps.input_parameters.noise'
        key='5'
      >
        <StyledRow style={{ alignItems: 'center' }}>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 4 }}
            scale={autho.iAmAdmin ? 1 : 0}

            name='input_data.noise.max_sound_power'
            label='data.selections.input_parameters.max_sound_power'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={autho.iAmAdmin ? 1 : 0}
            name='input_data.noise.max_sound_pressure'
            label='data.selections.input_parameters.max_sound_pressure'
          />
          <SpanIntl value='data.generic.at' style={{ padding: '0 10px' }} />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={autho.iAmAdmin ? 1 : 0}
            name='input_data.noise.distance'
            label='data.selections.input_parameters.distance'
          />
          <SpanIntl value='data.selections.model_detail.distance.law' />
        </StyledRow>

        {autho.iAmAdmin ? (
          <StyledRow>
            <FieldDecimalNumber
              span={{ sm: 24, lg: 12, xl: 4 }}
              scale={1}
              name='input_data.noise.tolerance'
              label='data.selections.input_parameters.tolerance'
            />
          </StyledRow>
        ) : null}
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Noise
