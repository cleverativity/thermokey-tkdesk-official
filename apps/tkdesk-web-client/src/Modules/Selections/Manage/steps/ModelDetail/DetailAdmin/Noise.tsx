import { DetailNumber } from 'Components/Detail'
import { FieldDecimalNumber } from 'Components/Field'
import { SpanIntl } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'

const Noise = () => {
  return (
    <StyledCollapse defaultActiveKey={['6']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='6'
        header='ui.selections.steps.input_parameters.noise'
      >
        <StyledRow style={{ alignItems: 'center' }}>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 4 }}
            scale={1}
            name='detail_data.noise.sound_power'
            label='data.selections.model_detail.sound_power'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={1}
            name='detail_data.noise.sound_pressure'
            label='data.selections.model_detail.sound_pressure'
          />
          <SpanIntl value='data.generic.at' style={{ padding: '0 10px' }} />
          <DetailNumber scale={1} name='detail_data.noise.distance' />
          <SpanIntl
            value='data.selections.model_detail.distance.law'
            style={{ paddingLeft: '10px' }}
          />
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Noise
