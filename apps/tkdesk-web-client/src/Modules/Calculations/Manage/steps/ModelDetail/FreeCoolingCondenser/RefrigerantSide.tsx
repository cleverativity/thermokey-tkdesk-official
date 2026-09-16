import { DetailIntl, DetailNumber, DetailPercentage } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'

const RefrigerantSide = ({ coreKey }: any) => {
  const isFirst = coreKey === 'c1'

  const items = [
    {
      label: (
        <SpanIntl
          value={`data.calculations.model_detail.fluid_c1.${isFirst ? 'fluid' : 'refrigerant'}`}
        />
      ),
      children: (
        <DetailIntl
          prefix='select.coils.microchannel.fluid_type.'
          name={`detail_data.${coreKey}.refrigerant_details.fluid`}
        />
      ),
    },
    isFirst
      ? {
          label: (
            <SpanIntl value='data.calculations.model_detail.concentration' />
          ),
          children: (
            <DetailPercentage
              name={`input_data.${coreKey}.glycol_percentage`}
              scale={0}
            />
          ),
        }
      : {
          label: (
            <SpanIntl value='data.calculations.model_detail.saturation_temperature_c1' />
          ),
          children: (
            <DetailNumber
              name={`detail_data.${coreKey}.refrigerant_details.saturation_temperature`}
              scale={1}
            />
          ),
        },
    !isFirst && {
      label: (
        <SpanIntl value='data.calculations.model_detail.saturation_title_c1' />
      ),
      children: (
        <DetailIntl
          name={`input_data.${coreKey}.saturation_title`}
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
          name={`detail_data.${coreKey}.refrigerant_details.pressure_drops`}
          scale={0}
        />
      ),
    },
    isFirst
      ? {
          label: (
            <SpanIntl value='data.calculations.model_detail.flow_rate_fluid' />
          ),
          children: (
            <DetailNumber
              name={`detail_data.${coreKey}.refrigerant_details.flow_rate_m3h`}
            />
          ),
        }
      : {
          label: <SpanIntl value='data.calculations.model_detail.flow_rate' />,
          children: (
            <DetailNumber
              name={`detail_data.${coreKey}.refrigerant_details.flow_rate_kgh`}
              scale={0}
            />
          ),
        },
    isFirst
      ? {
          label: (
            <SpanIntl value='data.calculations.model_detail.inlet_temperature_c1' />
          ),
          children: (
            <DetailNumber
              scale={1}
              name={`detail_data.${coreKey}.refrigerant_details.inlet_temperature`}
            />
          ),
        }
      : {
          label: (
            <SpanIntl value='data.calculations.model_detail.desuperheat' />
          ),
          children: (
            <DetailNumber
              name={`detail_data.${coreKey}.refrigerant_details.desuperheat`}
              scale={0}
            />
          ),
        },
    isFirst
      ? {
          label: (
            <SpanIntl value='data.calculations.model_detail.outlet_temperature_c1' />
          ),
          children: (
            <DetailNumber
              scale={1}
              name={`detail_data.${coreKey}.refrigerant_details.outlet_temperature`}
            />
          ),
        }
      : {
          label: <SpanIntl value='data.calculations.model_detail.subcooling' />,
          children: (
            <DetailNumber
              name={`detail_data.${coreKey}.refrigerant_details.subcooling`}
              scale={0}
            />
          ),
        },
    isFirst
      ? {
          label: (
            <SpanIntl value='data.calculations.model_detail.saturation_pressure_c1' />
          ),
          children: (
            <DetailNumber
              scale={1}
              name={`detail_data.${coreKey}.refrigerant_details.saturation_pressure`}
            />
          ),
        }
      : {
          label: (
            <SpanIntl value='data.calculations.model_detail.saturation_pressure_c1' />
          ),
          children: (
            <DetailNumber
              scale={1}
              name={`detail_data.${coreKey}.refrigerant_details.saturation_pressure`}
            />
          ),
        },
    isFirst && {
      label: (
        <SpanIntl value='data.calculations.model_detail.outlet_velocity_c1' />
      ),
      children: (
        <DetailNumber
          name={`detail_data.${coreKey}.refrigerant_details.outlet_velocity`}
        />
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['4']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='4'
        header={
          isFirst
            ? 'ui.coils.microchannel.model_detail.fluid_side'
            : 'ui.coils.microchannel.model_detail.refrigerant_side'
        }
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default RefrigerantSide
