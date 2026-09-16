import _ from 'lodash'

import SpanLinkButton from './SpanLinkButton'

const Span = (props: { [key: string]: any }) => {
  const {
    value: objOrValue = undefined,
    transform = null,
    empty = '•',
    onClick = null,
    whiteSpace = 'break-spaces',
  } = props

  let value: string | number = !_.isPlainObject(objOrValue)
    ? objOrValue
    : _.get(objOrValue, 'value', null)

  if (_.isNil(value) || (_.isString(value) && _.isEmpty(value))) {
    return empty
  }
  const transformed = !_.isNil(transform) ? transform(value) : value

  if (
    _.isNil(transformed) ||
    (_.isString(transformed) && _.isEmpty(transformed))
  ) {
    return empty
  }

  return (
    <>
      <span style={{ whiteSpace }}>
        {!_.isNil(onClick) ? (
          <SpanLinkButton
            style={{ display: 'inline' }}
            onClick={() => onClick(value, transformed)}
          />
        ) : null}
        <span style={{ display: 'inline', whiteSpace }}>{transformed}</span>
      </span>
    </>
  )
}

export default Span
