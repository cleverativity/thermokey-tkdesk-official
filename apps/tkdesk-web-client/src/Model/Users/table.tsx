import _ from 'lodash'
import { ActionsButton } from 'Components/Generic'
import { Span, SpanDate, SpanIntl } from 'Components/Span'
import { FormattedMessage } from 'react-intl'
import StateBadge from './badge/State'
import * as C from './constants'

const stateFilters = _.map(Object.keys(C.states), (status) => ({
  text: <SpanIntl value={status} prefix='select.users.status.' />,
  value: status,
}))

const userTypeFilters = _.map(Object.keys(C.userTypes), (status) => ({
  text: <SpanIntl value={status} prefix='select.users.type.' />,
  value: status,
}))

const staticColumns = [
  {
    title: <FormattedMessage id='data.users.username' />,
    dataIndex: 'username',
    render: (username: string) => <Span value={username} />,
  },
  {
    title: <FormattedMessage id='data.users.jde_code' />,
    dataIndex: ['registry', 'jde_id'],
    render: (jde_id: string) => <Span value={jde_id} />,
  },
  {
    title: <FormattedMessage id='data.users.firstname' />,
    dataIndex: ['registry', 'name'],
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.users.lastname' />,
    dataIndex: ['registry', 'surname'],
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.users.user_type' />,
    dataIndex: 'user_type',
    filters: userTypeFilters,
    render: (value: string) => (
      <SpanIntl prefix='select.users.type.' value={value} />
    ),
  },
  {
    title: <FormattedMessage id='data.users.email' />,
    dataIndex: ['registry', 'company_email'],
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.users.activation_date' />,
    dataIndex: 'activation_date',
    sorter: true,
    render: (date: string) => <SpanDate date={date} />,
  },
  {
    title: <FormattedMessage id='data.users.expiration_date' />,
    dataIndex: 'expiration_date',
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
      status: 'disabled' | 'refused' | 'active' | 'pending' | undefined,
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

    const actions = []

    if (!_.isNil(onDetail)) {
      actions.push({
        label: <FormattedMessage id='data.generic.detail' />,
        action: () => {
          onDetail(record.id)
        },
      })
    }

    if (!_.isNil(onEdit)) {
      actions.push({
        label: <FormattedMessage id='data.generic.edit' />,
        action: () => {
          onEdit(record.id)
        },
      })
    }

    return actions
  }

export { staticColumns, actionColumn, actionsCreator }
