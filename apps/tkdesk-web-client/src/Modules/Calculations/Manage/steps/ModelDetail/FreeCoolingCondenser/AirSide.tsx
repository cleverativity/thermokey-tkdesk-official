import _ from 'lodash'

import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'
import { DetailNumber } from 'Components/Detail'
import { SpanIntl, SpanNumber } from 'Components/Span'

const AirSide = ({ coreKey, detailData }: any) => {
  const outlet_velocity_air = _.get(
    detailData,
    `c1.air_details.outlet_velocity_air.value`,
    null,
  )
  const battery_active_length =
    _.get(
      detailData,
      `${coreKey}.geometric_details.battery_active_length.value`,
      null,
    ) / 1000
  const core_height_fc =
    _.get(detailData, `c1.geometric_details.core_height.value`, null) / 1000
  const core_height =
    _.get(detailData, `${coreKey}.geometric_details.core_height.value`, null) /
    1000

  const A_freeCooler = battery_active_length * core_height_fc
  const A_condenser = battery_active_length * core_height

  const items = [
    {
      label: <SpanIntl value='data.calculations.model_detail.flow_rate' />,
      children: (
        <DetailNumber
          name={`detail_data.${coreKey}.air_details.flow_rate_air`}
          scale={0}
        />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.ad_pressure_drops_air' />
      ),
      children: (
        <DetailNumber
          scale={0}
          name={`detail_data.${coreKey}.air_details.ad_pressure_drops_air`}
        />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.inlet_temperature_air' />
      ),
      children:
        coreKey === 'c1' ? (
          <DetailNumber
            name={`detail_data.${coreKey}.air_details.inlet_temperature_air`}
            scale={1}
          />
        ) : (
          <DetailNumber
            name={`detail_data.c1.air_details.outlet_temperature_air`}
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
          name={`detail_data.${coreKey}.air_details.outlet_temperature_air`}
          scale={1}
        />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.inlet_velocity_air' />
      ),
      children:
        coreKey === 'c1' ? (
          <DetailNumber
            name={`detail_data.${coreKey}.air_details.inlet_velocity_air`}
          />
        ) : (
          <SpanNumber
            value={{
              value: outlet_velocity_air * (A_freeCooler / A_condenser),
              unit_of_measurement: 'm/s',
            }}
          />
        ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.outlet_velocity_air' />
      ),
      children: (
        <DetailNumber
          name={`detail_data.${coreKey}.air_details.outlet_velocity_air`}
        />
      ),
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.altitude' />,
      children: (
        <DetailNumber
          scale={0}
          name={`detail_data.${coreKey}.air_details.altitude`}
        />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.inlet_air_humidity' />
      ),
      children: (
        <DetailNumber
          scale={0}
          name={`detail_data.${coreKey}.air_details.inlet_air_humidity`}
        />
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['3']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='3'
        header='ui.coils.microchannel.model_detail.air_side'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default AirSide
