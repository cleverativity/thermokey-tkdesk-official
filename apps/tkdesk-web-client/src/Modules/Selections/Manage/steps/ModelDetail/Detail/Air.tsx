import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'
import { DetailNumber } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'

const Air = () => {
  const items = [
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.inlet_temperature_air' />
      ),
      children: (
        <DetailNumber name='detail_data.air.inlet_temperature' scale={1} />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.outlet_temperature_air' />
      ),
      children: (
        <DetailNumber name='detail_data.air.outlet_temperature' scale={1} />
      ),
    },
    {
      label: (
        <SpanIntl value='data.selections.model_detail.inlet_air_humidity' />
      ),
      children: (
        <DetailNumber name='detail_data.air.inlet_humidity' scale={0} />
      ),
    },
    {
      label: (
        <SpanIntl value='data.selections.model_detail.outlet_air_humidity' />
      ),
      children: (
        <DetailNumber name='detail_data.air.outlet_humidity' scale={0} />
      ),
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.altitude' />,
      children: <DetailNumber name='detail_data.air.altitude' scale={0} />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.air_flow_rate' />,
      children: <DetailNumber name='detail_data.air.flow_rate' scale={0} />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.velocity' />,
      children: <DetailNumber name='detail_data.air.velocity' />,
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['3']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='3'
        header='ui.selections.steps.input_parameters.air'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Air
