import { useIntl } from 'react-intl'
import _ from 'lodash'
import Detail from './Detail'

interface DetailIntlProps {
  prefix?: string
  children?: string | any
  fetch: any
  label?: string
  unlocalizeLabel?: boolean
  size?: 'small' | 'medium' | 'large'
  transform?: any
  style: { [key: string]: any }
  onClick: any
}
const DetailIntlPrefix = (props: DetailIntlProps) => {
  const intl = useIntl()
  const { prefix, children, ...other } = props

  const data_ = _.isNil(_.get(children, 'type', null))
    ? children
    : _.get(children, 'value')
  const prefix_ = prefix

  let localData = null

  if (!_.isNil(data_) && !_.isEmpty(data_)) {
    localData = intl.formatMessage({ id: prefix_ + data_ })
  }

  return <Detail {...other}>{localData}</Detail>
}

export default DetailIntlPrefix
