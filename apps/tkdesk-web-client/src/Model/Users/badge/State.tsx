import _ from 'lodash'
import * as C from 'Model/Users/constants'
import { SpanBadge } from 'Components/Span'

const StateBadge = (props: any) => {
  const { status = 'pending' } = props

  const color: any = _.get(C.states, `${status}.color`, 'neutral')

  return (
    <SpanBadge prefix='select.users.status.' value={status} color={color} />
  )
}

export default StateBadge
