import _ from 'lodash'
import * as F from 'Model/functions'
import { NumericFormat } from 'react-number-format'
import { ConsoleLogger } from 'aws-amplify/utils'
import { normalizeRoundedSignedZero } from 'Utils/functions'

const log = new ConsoleLogger('DisplayNumber')
interface SpanNumberProps {
  scale?: number
  sign?: string
  value: number | string | any
  fixedDecimalScale?: boolean
  style?: any
  isPointed?: boolean
}

const SpanNumber = (props: SpanNumberProps) => {
  const {
    scale = 2,
    sign = 'no_sign',
    fixedDecimalScale = true,
    style = {},
    isPointed,
  } = props
  let { value: objOrValue = undefined } = props

  let value: string | number | null | undefined = !_.isPlainObject(objOrValue)
    ? objOrValue
    : _.get(objOrValue, 'value', null)

  let unit_of_measurement: any = F.unitMapping(
    _.get(objOrValue, 'unit_of_measurement', ''),
  )

  if (_.isNil(value)) {
    return (
      <span style={style} title=''>
        {'•'}
      </span>
    )
  }

  if (sign == 'absolute' && _.isNumber(value)) {
    value = Math.abs(value)
  }

  value = normalizeRoundedSignedZero(value, scale)

  return (
    <NumericFormat
      style={style}
      decimalScale={scale}
      displayType='text'
      fixedDecimalScale={fixedDecimalScale}
      value={value}
      valueIsNumericString
      suffix={` ${unit_of_measurement}`}
      decimalSeparator={isPointed ? '.' : ','}
      // decimalSeparator=','
    />
  )
}

SpanNumber.displayName = 'SpanNumber'

export default SpanNumber
