import _ from 'lodash'
import { Span, SpanIntl, SpanPolynomial } from 'Components/Span'
import { FormattedMessage } from 'react-intl'
import { ActionsButton } from 'Components/Generic'

const staticColumns = [
  {
    title: <FormattedMessage id='data.fan_models.polynomial.polynomial_type' />,
    dataIndex: 'polynomial_type',
    render: (value: string) => (
      <SpanIntl prefix='select.polynomialType.' value={value} />
    ),
  },
  {
    title: (
      <FormattedMessage id='data.fan_models.polynomial.unit_of_measurement' />
    ),
    align: 'center',
    dataIndex: 'polynomial_type',
    render: (value: string) => (
      <SpanIntl prefix='select.fan_models.unit_of_measurement.' value={value} />
    ),
  },
  {
    title: <FormattedMessage id='data.fan_models.polynomial.min' />,
    width: 100,
    dataIndex: ['poly_config', 'variables'],
    render: (values: any) => {
      return _.map(values, ({ min, name }) => {
        return (
          <>
            {name}: <Span value={min} />
            <br />
          </>
        )
      })
    },
  },
  {
    title: <FormattedMessage id='data.fan_models.polynomial.max' />,
    width: 100,
    dataIndex: ['poly_config', 'variables'],
    render: (values: any) => {
      return _.map(values, ({ max, name }) => {
        return (
          <>
            {name}: <Span value={max} />
            <br />
          </>
        )
      })
    },
  },
  {
    title: <FormattedMessage id='data.fan_models.polynomial.function' />,
    dataIndex: 'poly_config',
    render: (values: any) => {
      return <SpanPolynomial value={values} />
    },
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
    const { onEdit, onDelete } = events

    const actions = []

    if (!_.isNil(onEdit)) {
      actions.push({
        label: <FormattedMessage id='data.generic.edit' />,
        action: () => {
          onEdit(record)
        },
      })
    }

    if (!_.isNil(onDelete)) {
      actions.push({
        label: <FormattedMessage id='data.generic.delete' />,
        action: () => {
          onDelete(record)
        },
      })
    }

    return actions
  }

export { staticColumns, actionColumn, actionsCreator }
