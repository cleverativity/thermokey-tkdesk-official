import { Row } from 'antd'

import { DetailNumber } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'

const Noise = () => {
  const items = [
    {
      label: <SpanIntl value='data.selections.model_detail.sound_power' />,
      children: <DetailNumber name='detail_data.noise.sound_power' scale={0} />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.sound_pressure' />,
      children: (
        <Row style={{ alignItems: 'center' }}>
          <DetailNumber name='detail_data.noise.sound_pressure' scale={0} />
          <SpanIntl value='data.generic.at' style={{ padding: '0 10px' }} />
          <DetailNumber name='detail_data.noise.distance' scale={0} />
          <SpanIntl
            value='data.selections.model_detail.distance.law'
            style={{ paddingLeft: '10px' }}
          />
        </Row>
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['7']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='7'
        header='ui.selections.steps.input_parameters.noise'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Noise
