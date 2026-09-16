import _ from 'lodash'
import { FormattedMessage } from 'react-intl'

import StateBadge from './badge/State'
import * as C from './constants'

import { Span, SpanIntl, SpanNumber } from 'Components/Span'
import { ActionsButton } from 'Components/Generic'

const stateFilters = _.map(Object.keys(C.states), (status) => ({
  text: <SpanIntl value={status} prefix='select.calculation.status.' />,
  value: status,
}))

const staticColumns = [
  {
    title: <FormattedMessage id='data.selections.id' />,
    dataIndex: 'id',
    render: (id: string) => <Span value={id} />,
  },
  {
    title: <FormattedMessage id='ui.selections.steps.macro_series' />,
    dataIndex: 'macro_serie',
    // filters: applicationFilters,
    render: (value: string) => <SpanIntl value={value} />,
  },
  // {
  //   title: <FormattedMessage id='data.users.user' />,
  //   dataIndex: 'user',
  //   render: (user: User) => <Span value={user.username} />,
  // },
  {
    title: <FormattedMessage id='data.users.status' />,
    dataIndex: 'status',
    align: 'center',
    width: 150,
    filters: stateFilters,
    render: (
      status:
        | 'created'
        | 'use_case_selected'
        | 'solved'
        | 'detailed'
        | 'completed'
        | undefined,
    ) => <StateBadge status={status} />,
  },
]

const actionColumn = (actions: any): any => {
  return {
    title: <FormattedMessage id='data.generic.actions' />,
    align: 'center',
    render: (prop: any, record: any, index: any) => (
      <ActionsButton
        ids={{
          id: 'actios-id',
          seq: 'actios-seq',
          'id-custom': 'actios-custom',
        }}
        actions={actions(prop, record, index)}
        defaultAction
      />
    ),
  }
}

const actionsCreator =
  (events: any, autho: any) => (prop: any, record: any, index: any) => {
    const { onEdit } = events

    const actions: any[] = []

    if (!_.isNil(onEdit)) {
      actions.push({
        label: <FormattedMessage id='ui.generic.open' />,
        action: () => {
          onEdit(record.id)
        },
      })
    }

    return actions
  }

const staticColumnThermalResults = [
  {
    title: <FormattedMessage id='data.thermal.columns.model' />,
    dataIndex: 'modelName',
    width: 150,
    render: (modelName: string) => <Span value={modelName} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.capacity' />,
    dataIndex: 'capacity',
    render: (capacity: string) => (
      <SpanNumber value={Number(capacity)} scale={2} isPointed={true} />
    ),
  },
  {
    title: <FormattedMessage id='data.thermal.columns.air_flow' />,
    dataIndex: 'airflow',
    render: (airflow: string) => <Span value={airflow} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.spl' />,
    dataIndex: 'spl',
    render: (spl: string) => <Span value={spl} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.fan_motors_number' />,
    dataIndex: 'no_Fans',
    render: (no_Fans: string) => <Span value={no_Fans} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.fan_motors_rpm' />,
    dataIndex: 'rpm',
    render: (rpm: string) => <Span value={rpm} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.fan_motors_power' />,
    dataIndex: 'power',
    render: (power: string) => <Span value={power} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.fan_motors_current' />,
    dataIndex: 'current_a',
    render: (current_a: string) => <Span value={current_a} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.tube_vol' />,
    dataIndex: 'internal_Volume',
    render: (internal_Volume: string) => <Span value={internal_Volume} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.weight' />,
    dataIndex: 'weights',
    render: (weights: string) => <Span value={weights} />,
  },
  {
    title: <FormattedMessage id='data.thermal.columns.price' />,
    dataIndex: 'price',
    render: (price: string) => <Span value={price} />,
  },
]

const staticColumnPefResults = [
  {
    title: <FormattedMessage id='data.thermal.rating.pef.model_code' />,
    dataIndex: 'modelCode',
    width: 180,
    render: (modelCode: string) => <Span value={modelCode} empty='-' />,
  },
  {
    title: <FormattedMessage id='data.thermal.rating.pef.fan_code' />,
    dataIndex: 'fanCode',
    width: 160,
    render: (fanCode: string) => <Span value={fanCode} empty='-' />,
  },
  {
    title: <FormattedMessage id='data.thermal.rating.pef.coil_code' />,
    dataIndex: 'coilCode',
    width: 100,
    render: (coilCode: string) => <Span value={coilCode} empty='-' />,
  },
  {
    title: <FormattedMessage id='data.thermal.rating.pef.series' />,
    dataIndex: 'series',
    width: 100,
    render: (series: string) => <Span value={series} empty='-' />,
  },
  {
    title: <FormattedMessage id='data.thermal.rating.pef.fan_type_number' />,
    dataIndex: 'fanType',
    width: 160,
    render: (_value: unknown, record: any) => {
      const fanType = record?.fanType
      const fanNumber = record?.fanNumber
      const rows = record?.rows
      const value =
        fanType == null && fanNumber == null && rows == null
          ? null
          : `${fanType ?? '-'} / ${fanNumber ?? '-'} rows x ${rows ?? '-'}`
      return <Span value={value} empty='- / - rows x -' />
    },
  },
  {
    title: <FormattedMessage id='data.thermal.rating.pef.dimensions' />,
    dataIndex: 'length',
    width: 140,
    render: (_value: unknown, record: any) => {
      const length = record?.length
      const recordWidth = record?.width
      const height = record?.height
      const value =
        length == null && recordWidth == null && height == null
          ? null
          : `${length ?? '-'} x ${recordWidth ?? '-'} x ${height ?? '-'}`
      return <Span value={value} empty='- x - x -' />
    },
  },
]

export {
  staticColumns,
  actionColumn,
  actionsCreator,
  staticColumnThermalResults,
  staticColumnPefResults,
}
