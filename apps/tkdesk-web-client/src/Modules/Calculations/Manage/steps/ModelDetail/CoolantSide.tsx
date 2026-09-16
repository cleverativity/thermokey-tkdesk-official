import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
  StyledSeparator,
} from 'Components/Styled'
import { DetailIntl, DetailNumber } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'

const CoolantSide = ({ useCase }: any) => {
  const isRW = useCase === 'double_flow_rw'

  const primaryCoolant = [
    {
      label: (
        <SpanIntl
          value={
            isRW
              ? 'data.calculations.model_detail.fluid_c1.refrigerant'
              : 'data.calculations.model_detail.fluid_c1.fluid'
          }
        />
      ),
      children: (
        <DetailIntl
          prefix='select.coils.microchannel.fluid_type.'
          name='detail_data.refrigerant_details.fluid_c1'
        />
      ),
    },
    isRW && {
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
    isRW && {
      label: (
        <SpanIntl value='data.calculations.model_detail.saturation_title_c1' />
      ),
      children: (
        <DetailIntl
          prefix='select.sat_temp_modes.'
          name='input_data.saturation_title_c1'
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
      label: (
        <SpanIntl value='data.calculations.model_detail.heat_transfer_rate' />
      ),
      children: (
        <DetailNumber name='detail_data.heat_transfer_rate' scale={1} />
      ),
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.flow_rate' />,
      children: (
        <DetailNumber name='detail_data.refrigerant_details.flow_rate_kgh_c1' />
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
    isRW && {
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

  const secondaryCoolant = [
    {
      label: <SpanIntl value='data.calculations.model_detail.fluid_c1.fluid' />,
      children: (
        <DetailIntl
          prefix='select.coils.microchannel.fluid_type.'
          name='detail_data.refrigerant_details.fluid_c2'
        />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.pressure_drops_c1' />
      ),
      children: (
        <DetailNumber
          name='detail_data.refrigerant_details.pressure_drops_c2'
          scale={0}
        />
      ),
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.flow_rate' />,
      children: (
        <DetailNumber name='detail_data.refrigerant_details.flow_rate_c2' />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.inlet_temperature_c1' />
      ),
      children: (
        <DetailNumber
          scale={1}
          name='detail_data.refrigerant_details.inlet_temperature_c2'
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
          name='detail_data.refrigerant_details.outlet_temperature_c2'
        />
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['9']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='9'
        header='ui.coils.microchannel.model_detail.fluid_side'
      >
        <StyledSeparator withText='ui.coils.microchannel.steps.input_parameters.entry_conditions.fluid_primary' />
        <StyledDescriptions items={primaryCoolant} />

        <StyledSeparator withText='ui.coils.microchannel.steps.input_parameters.entry_conditions.fluid_secondary' />
        <StyledDescriptions items={secondaryCoolant} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default CoolantSide
