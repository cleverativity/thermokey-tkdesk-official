import _ from 'lodash'
import { Span, SpanIntl } from 'Components/Span'
import { FormattedMessage } from 'react-intl'
import { ActionsButton } from 'Components/Generic'
import * as C from './constants'

const fanTypeFilters = _.map(Object.keys(C.fanType), (fanType) => ({
  text: <SpanIntl prefix='select.fan_models.fan_type.' value={fanType} />,
  value: fanType,
}))

const frequencyFilters = _.map(Object.keys(C.frequency), (frequency) => ({
  text: <SpanIntl value={frequency} />,
  value: frequency,
}))

const phaseTypeFilters = _.map(Object.keys(C.phaseType), (phaseType) => ({
  text: <SpanIntl prefix='select.fan_models.phase_type.' value={phaseType} />,
  value: phaseType,
}))

const trueFalseFilters = _.map(Object.keys(C.trueFalse), (value) => ({
  text: <SpanIntl prefix='select.generic.trueFalse.' value={value} />,
  value,
}))

const staticColumns = [
  {
    title: <FormattedMessage id='ui.generic.model_code' />,
    dataIndex: 'model_code',
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.fan_models.article_no' />,
    dataIndex: 'article_no',
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.fan_models.serie_id' />,
    dataIndex: 'serie_id',
    render: (value: number) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.fan_models.fan_diameter' />,
    dataIndex: 'fan_diameter',
    sorter: true,
    render: (value: number) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.fan_models.fan_type' />,
    dataIndex: 'fan_type',
    filters: fanTypeFilters,
    render: (value: string) => (
      <SpanIntl prefix='select.fan_models.fan_type.' value={value} />
    ),
  },
  {
    title: <FormattedMessage id='data.fan_models.frequency' />,
    dataIndex: 'frequency',
    filters: frequencyFilters,
    render: (value: number) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.fan_models.voltage' />,
    dataIndex: 'voltage',
    sorter: true,
    render: (value: number) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.fan_models.phase_type' />,
    dataIndex: 'phase_type',
    filters: phaseTypeFilters,
    render: (value: string) => (
      <SpanIntl prefix='select.fan_models.phase_type.' value={value} />
    ),
  },
  {
    title: <FormattedMessage id='data.fan_models.ul' />,
    dataIndex: 'ul',
    filters: trueFalseFilters,
    render: (value: boolean) => (
      <SpanIntl prefix='select.generic.trueFalse.' value={String(value)} />
    ),
  },
  {
    title: <FormattedMessage id='data.fan_models.link' />,
    dataIndex: 'link',
    render: (value: string) => (
      <SpanIntl prefix='select.fan_models.link.' value={value} />
    ),
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
