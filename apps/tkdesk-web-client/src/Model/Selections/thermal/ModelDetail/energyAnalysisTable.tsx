import { FormattedMessage } from 'react-intl'

import { Span, SpanNumber } from 'Components/Span'

const staticColumn = [
  {
    title: <FormattedMessage id='data.thermal.columns.air_temp_inlet' />,
    dataIndex: 'airTempInlet',
    width: 150,
    render: (airTempInlet: string) => <Span value={airTempInlet} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.capacity' />,
    dataIndex: 'capacity',
    render: (capacity: string) => (
      <SpanNumber value={Number(capacity)} scale={2} />
    ),
  },
  {
    title: <FormattedMessage id='data.thermal.columns.air_flow' />,
    dataIndex: 'airFlow',
    render: (airFlow: string) => <Span value={airFlow} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.dp_air' />,
    dataIndex: 'dpAir',
    render: (dpAir: string) => <Span value={dpAir} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.spl' />,
    dataIndex: 'spl',
    render: (spl: string) => <Span value={spl} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.rpm' />,
    dataIndex: 'rpm',
    render: (rpm: string) => <Span value={rpm} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.power' />,
    dataIndex: 'power',
    render: (power: string) => <Span value={power} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.current_all_fans' />,
    dataIndex: 'currentFans',
    render: (currentFans: string) => <Span value={currentFans} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.tube_vol' />,
    dataIndex: 'tubeVolume',
    render: (tubeVolume: string) => <Span value={tubeVolume} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.weight' />,
    dataIndex: 'weight',
    render: (weight: string) => <Span value={weight} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.connections_outlet' />,
    dataIndex: 'connectDiamInlet',
    render: (connectDiamOutlet: string) => <Span value={connectDiamOutlet} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.connections_inlet' />,
    dataIndex: 'connectDiamOutlet',
    render: (connectDiamOutlet: string) => <Span value={connectDiamOutlet} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.price' />,
    dataIndex: 'price',
    render: (price: string) => <Span value={price} />,
  },
]

export { staticColumn }
