import _ from 'lodash'
// import * as R from 'ramda'
import { ActionsButton } from 'Components/Generic'
import { Span, SpanDate, SpanIntl } from 'Components/Span'
import { FormattedMessage } from 'react-intl'
import StateBadge from './badge/State'
import * as C from './InputParameters/constants'

const stateFilters = _.map(Object.keys(C.states), (status) => ({
  text: <SpanIntl value={status} prefix='select.calculation.status.' />,
  value: status,
}))

const applicationFilters = _.map(Object.keys(C.useCases), (use_case) => ({
  text: (
    <SpanIntl value={use_case} prefix='select.coils.microchannel.use_case.' />
  ),
  value: use_case,
}))

const staticColumns = [
  {
    title: <FormattedMessage id='data.calculations.code' />,
    dataIndex: 'id',
    render: (id: string) => <Span value={id} />,
  },
  {
    title: <FormattedMessage id='ui.coils.microchannel.steps.use_case' />,
    dataIndex: 'use_case',
    filters: applicationFilters,
    render: (value: string) => (
      <SpanIntl prefix='select.coils.microchannel.use_case.' value={value} />
    ),
  },
  {
    title: <FormattedMessage id='data.users.user' />,
    dataIndex: 'user',
    render: (user: User) => <Span value={user.username} />,
  },
  {
    title: <FormattedMessage id='data.calculations.created_at' />,
    dataIndex: 'date',
    render: (date: string) => <SpanDate date={date} />,
    sorter: true,
  },
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
    const { onEdit, onDetail } = events

    const actions: any[] = []

    // if (!R.isNil(onDetail)) {
    //   actions.push({
    //     label: <FormattedMessage id='data.users.detail_user' />,
    //     action: () => {
    //       onDetail(record.id)
    //     },
    //   })
    // }

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

export { staticColumns, actionColumn, actionsCreator }
