import _ from 'lodash'
import { FormattedMessage } from 'react-intl'

import { FieldCheckbox } from 'Components/Field'
import { SpanIntl } from 'Components/Span'

const visibilities = ['oem', 'internal', 'admin', 'superadmin']

const staticColumnsDetail = [
  {
    title: <FormattedMessage id='data.settings.refrigerants.header' />,
    dataIndex: 'name',
    render: (value: string) => {
      return (
        <SpanIntl
          prefix='select.coils.microchannel.fluid_type.'
          value={value}
        />
      )
    },
  },
  ..._.map(visibilities, (type) => ({
    title: <FormattedMessage id={`select.users.type.${type}`} />,
    dataIndex: 'visibility',
    align: 'center',
    width: 300,
    render: (value: string) => {
      const visibility = _.includes(value, type) ? (
        <FieldCheckbox
          name={`${type}`}
          checked
          hideLabel
          disabled
          options={[value]}
        />
      ) : (
        <FieldCheckbox
          name={`${type}`}
          checked={false}
          hideLabel
          disabled
          options={[value]}
        />
      )
      return visibility
    },
  })),
]

export { staticColumnsDetail }
