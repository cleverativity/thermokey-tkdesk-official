import { FormattedMessage } from 'react-intl'

import { Span, SpanNumber } from 'Components/Span'

const staticColumn = [
  {
    title: <FormattedMessage id='data.thermal.wp_columns.air_inlet_temp' />,
    dataIndex: 'airInletTemp',
    width: 160,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.air_inlet_rh' />,
    dataIndex: 'airInletRh',
    width: 140,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.liquid_inlet_temp' />,
    dataIndex: 'liquidInletTemp',
    width: 165,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.liquid_outlet_temp' />,
    dataIndex: 'liquidOutletTemp',
    width: 170,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.liquid_flowrate' />,
    dataIndex: 'liquidFlowrate',
    width: 165,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.adiabatic_state' />,
    dataIndex: 'adiabaticState',
    width: 140,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.capacity' />,
    dataIndex: 'capacity',
    width: 135,
    render: (capacity: string) => (
      <SpanNumber value={Number(capacity)} scale={2} />
    ),
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.liquid_speed' />,
    dataIndex: 'liquidSpeed',
    width: 150,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: (
      <FormattedMessage id='data.thermal.wp_columns.liquid_pressure_drop' />
    ),
    dataIndex: 'liquidPressureDrop',
    width: 185,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.air_flowrate' />,
    dataIndex: 'airFlowrate',
    width: 155,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.air_outlet_temp' />,
    dataIndex: 'airOutletTemp',
    width: 160,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.air_outlet_rh' />,
    dataIndex: 'airOutletRh',
    width: 145,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.air_pressure_drop' />,
    dataIndex: 'airPressureDrop',
    width: 165,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: (
      <FormattedMessage id='data.thermal.wp_columns.ext_static_pressure' />
    ),
    dataIndex: 'extStaticPressure',
    width: 170,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.fan_speed_rpm' />,
    dataIndex: 'fanSpeedRpm',
    width: 145,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.fan_speed_percent' />,
    dataIndex: 'fanSpeedPercent',
    width: 140,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: (
      <FormattedMessage id='data.thermal.wp_columns.total_power_consump' />
    ),
    dataIndex: 'totalPowerConsump',
    width: 185,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: (
      <FormattedMessage id='data.thermal.wp_columns.total_current_consump' />
    ),
    dataIndex: 'totalCurrentConsump',
    width: 195,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.sound_power' />,
    dataIndex: 'soundPower',
    width: 150,
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.thermal.wp_columns.sound_pressure' />,
    dataIndex: 'soundPressure',
    width: 160,
    render: (value: string) => <Span value={value} />,
  },
]

export { staticColumn }
