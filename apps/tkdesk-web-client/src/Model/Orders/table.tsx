import { Span, SpanDate, SpanIntl } from 'Components/Span'
import _ from 'lodash'
import { FormattedMessage } from 'react-intl'
import type { ReactElement } from 'react'
import StateBadge from './badge/State'
import * as C from './constants'
import { ActionsButton } from 'Components/Generic'

const stateFilters = _.map(Object.keys(C.states), (status) => ({
  text: <SpanIntl value={status} prefix='select.orders.status.' />,
  value: status,
}))

const staticColumns: {
  title: ReactElement
  dataIndex: string | string[]
  width?: number
  render: (value: any) => ReactElement
  [key: string]: any
}[] = [
  {
    title: <FormattedMessage id='data.orders.code' />,
    dataIndex: 'id',
    render: (id: string) => <Span value={id} />,
  },
  {
    title: <FormattedMessage id='data.orders.user' />,
    dataIndex: ['calculation', 'user', 'username'],
    render: (username: string) => <Span value={username} />,
  },
  {
    title: <FormattedMessage id='data.orders.created_at' />,
    dataIndex: 'created_at',
    width: 200,
    render: (date: string) => <SpanDate date={date} />,
    sorter: true,
  },
  {
    title: <FormattedMessage id='data.orders.status' />,
    dataIndex: 'status',
    align: 'center',
    width: 150,
    filters: stateFilters,
    render: (status: 'pending' | undefined) => <StateBadge status={status} />,
  },
]

const actionColumn = (actions: any): any => {
  return {
    title: <FormattedMessage id='data.generic.actions' />,
    align: 'center',
    width: 200,
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
    const { onCalculationDetail, onChangeStatus } = events
    const actions: {
      label: ReactElement
      action: () => void
    }[] = []

    if (!_.isNil(onChangeStatus)) {
      actions.push({
        label: <FormattedMessage id='data.orders.change_status' />,
        action: () => {
          onChangeStatus(record.id)
        },
      })
    }

    if (!_.isNil(onCalculationDetail)) {
      actions.push({
        label: <FormattedMessage id='data.orders.go_to_calculation' />,
        action: () => {
          const calculation_id = _.get(record, 'calculation.id')
          onCalculationDetail(calculation_id)
        },
      })
    }

    return actions
  }

export { staticColumns, actionColumn, actionsCreator }
