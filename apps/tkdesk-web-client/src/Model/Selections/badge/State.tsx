import _ from 'lodash'
import * as C from '../constants'
import { SpanBadge } from 'Components/Span'

const StateBadge = (props: any) => {
  const { status = 'created' } = props

  const color: any = _.get(C.states, `${status}.color`, 'neutral')

  return (
    <SpanBadge
      prefix='select.calculation.status.'
      value={status}
      color={color}
    />
  )
}

export default StateBadge
