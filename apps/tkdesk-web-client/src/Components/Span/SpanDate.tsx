import _ from 'lodash'
import { useIntl } from 'react-intl'
import dayjs from 'dayjs'

const SpanDate = (props: { date: string }) => {
  const intl = useIntl()
  const { date } = props

  if (_.isNil(date) || _.isEmpty(date)) {
    return '•'
  }

  return intl.formatDate(dayjs(date).toDate())
}

export default SpanDate
