import { DetailIntl, DetailNumber } from 'Components/Detail'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'
import { DetailPercentage } from 'Components/Detail'
import _ from 'lodash'
import { SpanIntl } from 'Components/Span'

const FluidSide = ({ fluid_c1 }: any) => {
  const showConcentration = _.includes(['ethylene', 'propylene'], fluid_c1)

  const items = [
    {
      label: <SpanIntl value='data.calculations.model_detail.fluid_c1.fluid' />,
      children: (
        <DetailIntl
          prefix='select.coils.microchannel.fluid_type.'
          name='detail_data.refrigerant_details.fluid_c1'
        />
      ),
    },
    showConcentration && {
      label: <SpanIntl value='data.calculations.model_detail.concentration' />,
      children: (
        <DetailPercentage name='input_data.glycol_percentage_c1' scale={0} />
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
      label: (
        <SpanIntl value='data.calculations.model_detail.flow_rate_fluid' />
      ),
      children: (
        <DetailNumber name='detail_data.refrigerant_details.flow_rate_m3h_c1' />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.inlet_temperature_c1' />
      ),
      children: (
        <DetailNumber
          scale={1}
          name='detail_data.refrigerant_details.inlet_temperature_c1'
        />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.outlet_temperature_c1' />
      ),
      children: (
        <DetailNumber
          scale={1}
          name='detail_data.refrigerant_details.outlet_temperature_c1'
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
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.outlet_velocity_c1' />
      ),
      children: (
        <DetailNumber name='detail_data.refrigerant_details.outlet_velocity_c1' />
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['7']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='7'
        header='ui.coils.microchannel.model_detail.fluid_side'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default FluidSide
