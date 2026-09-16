import _ from 'lodash'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useIntl } from 'react-intl'
import { sanitizeHtml } from 'Utils/sanitizeHtml'

interface SpanIntlProps {
  prefix?: string | null
  value: string
  bold?: boolean
  style?: { [key: string]: string }
  className?: string
  dangerously?: boolean
  tooltip?: any
}

const SpanIntl = (props: SpanIntlProps) => {
  const intl = useIntl()
  const {
    prefix = null,
    value: objOrValue,
    bold = false,
    style = {},
    className = '',
    dangerously = false,
    tooltip = null,
  } = props

  let value: string | number | null | undefined = !_.isPlainObject(objOrValue)
    ? objOrValue
    : _.get(objOrValue, 'value', null)

  const newValue = _.defaultTo(value, '')
  const newPrefix = _.defaultTo(prefix, '')

  if (_.isEmpty(newValue)) {
    return (
      <span className={className} style={style} title=''>
        •
      </span>
    )
  }

  const intlValue = intl.formatMessage({ id: newPrefix + newValue })
  const sanitizedIntlValue = sanitizeHtml(intlValue)

  return (
    <span
      className={className}
      style={style}
      title={intlValue}
      {...(dangerously
        ? { dangerouslySetInnerHTML: { __html: sanitizedIntlValue } }
        : {})}
    >
      {dangerously ? null : intlValue}

      {!_.isNil(tooltip) && (
        <Tooltip title={tooltip}>
          <InfoCircleOutlined
            style={{ marginLeft: '4px', color: 'rgba(0, 0, 0, 0.45)' }}
          />
        </Tooltip>
      )}
    </span>
  )
}

export default SpanIntl
