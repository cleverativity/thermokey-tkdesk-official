import { FormattedMessage } from 'react-intl'

import { SpanIntl } from 'Components/Span'
import { FieldDecimalNumber } from 'Components/Field'
import { DetailNumber } from 'Components/Detail'

const childrens = (type, admin) => [
  {
    title: <FormattedMessage id='data.selections.model_detail.working_point' />,
    render: ({ label }) =>
      admin ? (
        <FieldDecimalNumber
          hideLabel
          name={`detail_data.ventilation.${label}_${type}`}
          scale={type === 'power' ? 0 : 2}
        />
      ) : (
        <DetailNumber
          name={`detail_data.ventilation.${label}_${type}`}
          scale={type === 'power' ? 0 : 1}
        />
      ),
  },
  {
    title: <FormattedMessage id='data.selections.model_detail.nominal' />,
    render: ({ label }) =>
      admin ? (
        <FieldDecimalNumber
          hideLabel
          name={`detail_data.ventilation.nominal_${label}_${type}`}
          scale={type === 'power' ? 0 : 2}
        />
      ) : (
        <DetailNumber
          name={`detail_data.ventilation.nominal_${label}_${type}`}
          scale={type === 'power' ? 0 : 1}
        />
      ),
  },
]

const staticColumns = (admin) => [
  {
    dataIndex: 'label',
    render: (value: string) => (
      <SpanIntl value={`data.selections.model_detail.${value}`} />
    ),
  },
  {
    title: <FormattedMessage id='data.selections.model_detail.power' />,
    children: childrens('power', admin),
  },
  {
    title: <FormattedMessage id='data.selections.model_detail.current' />,
    children: childrens('current', admin),
  },
]

export { staticColumns }
