import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'
import { DetailNumber } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'

const AirSide = () => {
  const items = [
    {
      label: <SpanIntl value='data.calculations.model_detail.flow_rate' />,
      children: (
        <DetailNumber name='detail_data.air_details.flow_rate_air' scale={0} />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.ad_pressure_drops_air' />
      ),
      children: (
        <DetailNumber
          scale={0}
          name='detail_data.air_details.ad_pressure_drops_air'
        />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.inlet_temperature_air' />
      ),
      children: (
        <DetailNumber
          name='detail_data.air_details.inlet_temperature_air'
          scale={1}
        />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.outlet_temperature_air' />
      ),
      children: (
        <DetailNumber
          name='detail_data.air_details.outlet_temperature_air'
          scale={1}
        />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.inlet_velocity_air' />
      ),
      children: (
        <DetailNumber name='detail_data.air_details.inlet_velocity_air' />
      ),
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.altitude' />,
      children: (
        <DetailNumber scale={0} name='detail_data.air_details.altitude' />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.inlet_air_humidity' />
      ),
      children: (
        <DetailNumber
          scale={0}
          name='detail_data.air_details.inlet_air_humidity'
        />
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['5']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='5'
        header='ui.coils.microchannel.model_detail.air_side'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default AirSide
