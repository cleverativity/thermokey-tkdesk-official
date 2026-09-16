import _ from 'lodash'
import { Row } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'

import { Span, SpanNumber } from 'Components/Span'
import { StyledTable } from 'Components/Styled'

const compareNullableValues = (leftValue: any, rightValue: any) => {
  if (_.isNil(leftValue) && _.isNil(rightValue)) {
    return 0
  }

  if (_.isNil(leftValue)) {
    return 1
  }

  if (_.isNil(rightValue)) {
    return -1
  }

  if (_.isString(leftValue) || _.isString(rightValue)) {
    return String(leftValue).localeCompare(String(rightValue))
  }

  return Number(leftValue) - Number(rightValue)
}

const extractSortableValue = (value: any) => {
  if (_.isPlainObject(value) && _.has(value, 'value')) {
    return _.get(value, 'value')
  }

  return value
}

const createLocalSorter = (dataIndex: string | string[]) => {
  return (leftRecord: any, rightRecord: any) => {
    const leftValue = extractSortableValue(_.get(leftRecord, dataIndex))
    const rightValue = extractSortableValue(_.get(rightRecord, dataIndex))

    return compareNullableValues(leftValue, rightValue)
  }
}

const fluidChildrens = [
  {
    title: <FormattedMessage id='data.selections.model_detail.flow_rate' />,
    dataIndex: ['liquid', 'flow_rate'],
    sorter: createLocalSorter(['liquid', 'flow_rate']),
    render: (value: number) => <SpanNumber scale={1} value={value} />,
  },
  {
    title: (
      <FormattedMessage id='data.selections.input_parameters.outlet_temperature' />
    ),
    dataIndex: ['liquid', 'outlet_temperature'],
    sorter: createLocalSorter(['liquid', 'outlet_temperature']),
    render: (value: number) => <SpanNumber scale={1} value={value} />,
  },
  {
    title: (
      <FormattedMessage id='data.calculations.model_detail.pressure_drops' />
    ),
    dataIndex: ['liquid', 'pressure_drop'],
    sorter: createLocalSorter(['liquid', 'pressure_drop']),
    render: (value: number) => <SpanNumber scale={1} value={value} />,
  },
]

const ventilationChildrens = [
  {
    title: <FormattedMessage id='data.selections.model_detail.speed' />,
    dataIndex: ['ventilation', 'rpm_percentage'],
    sorter: createLocalSorter(['ventilation', 'rpm_percentage']),
    render: (value: number) => <SpanNumber value={value} />,
  },
  {
    title: (
      <FormattedMessage id='data.selections.model_detail.total_power_consumption' />
    ),
    dataIndex: ['ventilation', 'power_consumption'],
    sorter: createLocalSorter(['ventilation', 'power_consumption']),
    render: (value: number) => <SpanNumber value={value} />,
  },
]

const staticColumns = [
  {
    title: <FormattedMessage id='ui.generic.model_code' />,
    dataIndex: 'model_code',
    sorter: createLocalSorter('model_code'),
    render: (value: string) => <Span value={value} />,
  },
  {
    title: (
      <FormattedMessage id='data.selections.model_detail.power_exchange' />
    ),
    dataIndex: ['performance', 'power_exchange'],
    sorter: createLocalSorter(['performance', 'power_exchange']),
    render: (value: number) => <SpanNumber scale={1} value={value} />,
  },
  {
    title: <FormattedMessage id='data.selections.model_detail.ratio' />,
    dataIndex: ['performance', 'tolerance'],
    sorter: createLocalSorter(['performance', 'tolerance']),
    render: (value: number) => <SpanNumber scale={1} value={value} />,
  },
  {
    title: (
      <FormattedMessage id='ui.selections.steps.input_parameters.liquid' />
    ),
    children: fluidChildrens,
  },
  {
    title: <FormattedMessage id='data.selections.model_detail.air_flow_rate' />,
    dataIndex: ['air', 'air_flow_rate'],
    sorter: createLocalSorter(['air', 'air_flow_rate']),
    render: (value: number) => <SpanNumber scale={1} value={value} />,
  },
  {
    key: 'sound_power',
    title: <FormattedMessage id='data.selections.model_detail.sound_power' />,
    dataIndex: ['noise', 'sound_power'],
    sorter: createLocalSorter(['noise', 'sound_power']),
    render: (value: number) => <SpanNumber value={value} scale={0} />,
  },
  {
    key: 'sound_pressure',
    title: (
      <FormattedMessage id='data.selections.model_detail.sound_pressure' />
    ),
    dataIndex: ['noise', 'sound_pressure'],
    sorter: createLocalSorter(['noise', 'sound_pressure']),
    render: (value: number) => <SpanNumber value={value} scale={0} />,
  },
  {
    title: <FormattedMessage id='ui.selections.steps.input_parameters.fans' />,
    children: ventilationChildrens,
  },
  {
    title: <FormattedMessage id='data.selections.model_detail.price' />,
    dataIndex: 'price',
    sorter: createLocalSorter('price'),
    render: (value: number) => <SpanNumber scale={2} value={value} />,
  },
]

const DetailDataTable = (props: any) => {
  const { data, scroll, className, hasOutletTemp } = props

  const velocity = {
    working_point: _.get(data, 'ventilation.velocity', null),
    nominal_rpm: _.get(data, 'ventilation.nominal_rpm', null),
    rpm_percentage: _.get(data, 'ventilation.rpm_percentage', null),
  }

  const inlet_connection = {
    number: _.get(data, 'dimensions.inlet_connection_number', null),
    diameter: _.get(data, 'dimensions.inlet_connection_diameter', null),
  }
  const outlet_connection = {
    number: _.get(data, 'dimensions.outlet_connection_number', null),
    diameter: _.get(data, 'dimensions.outlet_connection_diameter', null),
  }

  const intl = useIntl()

  const measuresTable = [
    {
      letter: 'A',
      value: _.get(data, 'performance.power_exchange', null),
      key: intl.formatMessage({
        id: 'data.selections.input_parameters.capacity',
      }),
    },
    {
      letter: 'B',
      value: _.get(data, 'performance.tolerance', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.ratio',
      }),
    },
    {
      letter: 'C',
      value: _.get(data, 'performance.min_energy_class', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.nominal_energy_class',
      }),
    },
    {
      letter: 'D',
      value: _.get(data, 'performance.working_point_energy_class', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.working_point_energy_class',
      }),
    },
    {
      letter: 'E',
      value: hasOutletTemp
        ? _.get(data, 'liquid.flow_rate', null)
        : _.get(data, 'liquid.outlet_temperature', null),
      key: intl.formatMessage({
        id: hasOutletTemp
          ? 'data.selections.model_detail.liquid_flow_rate'
          : 'data.selections.model_detail.liquid_outlet_temperature',
      }),
    },
    {
      letter: 'F',
      value: _.get(data, 'liquid.pressure_drop', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.liquid_pressure_drops',
      }),
    },
    {
      letter: 'G',
      value: _.get(data, 'air.air_flow_rate', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.air_flow_rate',
      }),
    },
    {
      letter: 'H',
      value: _.get(data, 'air.outlet_temperature', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.air_outlet_temperature',
      }),
    },
    {
      letter: 'I',
      value: _.get(data, 'ventilation.single_power', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.single_power',
      }),
    },
    {
      letter: 'J',
      value: _.get(data, 'ventilation.nominal_single_power', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.nominal_single_power',
      }),
    },
    {
      letter: 'K',
      value: _.get(data, 'ventilation.single_current', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.single_current',
      }),
    },
    {
      letter: 'L',
      value: _.get(data, 'ventilation.nominal_single_current', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.nominal_single_current',
      }),
    },

    {
      letter: 'M',
      value: velocity,
      key: intl.formatMessage({
        id: 'data.selections.model_detail.fan_speed',
      }),
    },
    {
      letter: 'N',
      value: _.get(data, 'dimensions.length', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.length',
      }),
    },
    {
      letter: 'O',
      value: _.get(data, 'dimensions.width', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.width',
      }),
    },
    {
      letter: 'P',
      value: _.get(data, 'dimensions.height', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.height',
      }),
    },
    {
      letter: 'Q',
      value: _.get(data, 'dimensions.weight', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.weight',
      }),
    },
    {
      letter: 'R',
      value: _.get(data, 'dimensions.internal_volume', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.inner_volume',
      }),
    },
    {
      letter: 'S',
      value: _.get(data, 'dimensions.exchange_area', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.exchange_area',
      }),
    },
    {
      letter: 'T',
      value: inlet_connection,
      key: intl.formatMessage({
        id: 'data.selections.model_detail.inlet_connection',
      }),
    },
    {
      letter: 'U',
      value: outlet_connection,
      key: intl.formatMessage({
        id: 'data.selections.model_detail.outlet_connection',
      }),
    },
    {
      letter: 'V',
      value: _.get(data, 'noise.sound_pressure', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.sound_pressure',
      }),
    },
    {
      letter: 'W',
      value: _.get(data, 'noise.sound_power', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.sound_power',
      }),
    },
    {
      letter: 'X',
      value: _.get(data, 'price', null),
      key: intl.formatMessage({
        id: 'data.selections.model_detail.price',
      }),
    },
  ]

  const commonColumns = [
    {
      title: (
        <FormattedMessage id='ui.coils.microchannel.model_detail.geometric_details.field' />
      ),
      dataIndex: 'key',
      render: (key: string) => <Span value={key} />,
    },
    {
      title: (
        <FormattedMessage id='ui.coils.microchannel.model_detail.geometric_details.value' />
      ),
      dataIndex: 'value',
      render: (value: any, record: any) => {
        const type = _.get(value, 'type', null)
        const isVelocity = _.includes(['M'], record.letter)
        const isConnection = _.includes(['T', 'U'], record.letter)

        if (isVelocity) {
          const { working_point, nominal_rpm, rpm_percentage } = value

          return (
            <Row style={{ gap: '4px', justifyContent: 'flex-start' }}>
              {!_.isNil(working_point) ? (
                <SpanNumber scale={0} value={working_point} />
              ) : (
                ''
              )}

              {!_.isNil(working_point) || !_.isNil(nominal_rpm) ? '/' : ''}

              {!_.isNil(nominal_rpm) ? (
                <SpanNumber scale={0} value={nominal_rpm} />
              ) : (
                ''
              )}
              {!_.isNil(rpm_percentage) ? '(' : ''}
              <SpanNumber scale={0} value={rpm_percentage} />
              {!_.isNil(rpm_percentage) ? ')' : ''}
            </Row>
          )
        }

        if (isConnection) {
          const { number, diameter } = value
          return (
            <Row style={{ gap: '4px', justifyContent: 'flex-start' }}>
              <SpanNumber scale={0} value={number} />
              {!_.isNil(number) && !_.isNil(diameter) ? '×' : ''}
              <Span value={diameter} />
            </Row>
          )
        }

        return type === 'string' ? (
          <Span value={value} />
        ) : (
          <Row style={{ gap: '4px', justifyContent: 'flex-start' }}>
            <SpanNumber
              scale={
                _.includes(['G', 'I', 'J', 'M', 'Q'], record.letter)
                  ? 0
                  : _.includes(
                        ['A', 'B', 'E', 'F', 'H', 'R', 'S', 'V', 'W'],
                        record.letter,
                      )
                    ? 1
                    : 2
              }
              value={value}
            />
          </Row>
        )
      },
    },
  ]

  return (
    <StyledTable
      className={className}
      loading={false}
      pagination={false}
      rowKey='letter'
      size='small'
      bordered
      dataSource={measuresTable}
      columns={commonColumns}
      scroll={scroll}
    />
  )
}

const CondenserDataTable = (props: any) => {
  const { data, scroll, className, columns } = props

  const intl = useIntl()

  const condenserTable = [
    {
      letter: 'A',
      dataIndex: 'capacity',
      value: _.get(data, 'capacity', null),
      key: intl.formatMessage({
        id: 'data.thermal.columns.capacity',
      }),
    },
    {
      letter: 'B',
      dataIndex: 'airflow',
      value: _.get(data, 'airflow', null),
      key: intl.formatMessage({
        id: 'data.thermal.columns.air_flow',
      }),
    },
    {
      letter: 'C',
      dataIndex: 'spl',
      value: _.get(data, 'spl', null),
      key: intl.formatMessage({
        id: 'data.thermal.columns.spl',
      }),
    },
    {
      letter: 'D',
      dataIndex: 'no_Fans',
      value: _.get(data, 'no_Fans', null),
      key: intl.formatMessage({
        id: 'data.thermal.columns.fan_motors_number',
      }),
    },
    {
      letter: 'E',
      dataIndex: 'rpm',
      value: _.get(data, 'rpm', null),
      key: intl.formatMessage({
        id: 'data.thermal.columns.rpm',
      }),
    },
    {
      letter: 'F',
      dataIndex: 'power',
      value: _.get(data, 'power', null),
      key: intl.formatMessage({
        id: 'data.thermal.columns.power',
      }),
    },
    {
      letter: 'G',
      dataIndex: 'current_a',
      value: _.get(data, 'current_a', null),
      key: intl.formatMessage({
        id: 'data.thermal.columns.fan_motors_current',
      }),
    },
    {
      letter: 'H',
      dataIndex: 'internal_Volume',
      value: _.get(data, 'internal_Volume', null),
      key: intl.formatMessage({
        id: 'data.thermal.columns.tube_vol',
      }),
    },
    {
      letter: 'I',
      dataIndex: 'weights',
      value: _.get(data, 'weights', null),
      key: intl.formatMessage({
        id: 'data.thermal.columns.weight',
      }),
    },
    {
      letter: 'J',
      dataIndex: 'inlet_Connection',
      value: _.get(data, 'inlet_Connection', null),
      key: intl.formatMessage({
        id: 'data.thermal.columns.connections_inlet',
      }),
    },
    {
      letter: 'K',
      dataIndex: 'outlet_Connection',
      value: _.get(data, 'outlet_Connection', null),
      key: intl.formatMessage({
        id: 'data.thermal.columns.connections_outlet',
      }),
    },
    {
      letter: 'L',
      dataIndex: 'price',
      value: _.get(data, 'price', null),
      key: intl.formatMessage({
        id: 'data.thermal.columns.price',
      }),
    },
  ]

  const commonColumns = [
    {
      title: <FormattedMessage id='ui.thermal.columns.field' />,
      dataIndex: 'key',
      render: (key: string) => <Span value={key} />,
    },
    {
      title: <FormattedMessage id='ui.thermal.columns.value' />,
      dataIndex: 'value',
      render: (value: any) => {
        if (typeof value === 'number')
          return <SpanNumber scale={2} value={value} />
        return <Span value={value} />
      },
    },
  ]

  return (
    <StyledTable
      className={className}
      loading={false}
      pagination={false}
      rowKey='dataIndex'
      size='small'
      bordered
      dataSource={condenserTable}
      columns={columns ?? commonColumns}
      scroll={scroll}
    />
  )
}

export { staticColumns, DetailDataTable, CondenserDataTable }
