import { DetailIntl, DetailNumber } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'

const RefrigerantSide = () => {
  const items = [
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.fluid_c1.refrigerant' />
      ),
      children: (
        <DetailIntl
          prefix='select.coils.microchannel.fluid_type.'
          name='detail_data.refrigerant_details.fluid_c1'
        />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.saturation_temperature_c1' />
      ),
      children: (
        <DetailNumber
          name='detail_data.refrigerant_details.saturation_temperature_c1'
          scale={1}
        />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.saturation_title_c1' />
      ),
      children: (
        <DetailIntl
          name='input_data.saturation_title_c1'
          prefix='select.sat_temp_modes.'
          scale={1}
        />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.pressure_drops_c1' />
      ),
      children: (
        <DetailNumber
          name='detail_data.refrigerant_details.pressure_drops_c1'
          scale={0}
        />
      ),
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.flow_rate' />,
      children: (
        <DetailNumber
          name='detail_data.refrigerant_details.flow_rate_kgh_c1'
          scale={0}
        />
      ),
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.desuperheat' />,
      children: (
        <DetailNumber
          name='detail_data.refrigerant_details.desuperheat'
          scale={0}
        />
      ),
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.subcooling' />,
      children: (
        <DetailNumber
          name='detail_data.refrigerant_details.subcooling'
          scale={0}
        />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.saturation_pressure_c1' />
      ),
      children: (
        <DetailNumber
          scale={1}
          name='detail_data.refrigerant_details.saturation_pressure_c1'
        />
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['8']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='8'
        header='ui.coils.microchannel.model_detail.refrigerant_side'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default RefrigerantSide
