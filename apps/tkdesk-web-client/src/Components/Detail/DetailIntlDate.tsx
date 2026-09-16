import { SpanDate } from 'Components/Span'
import Detail from './Detail'

interface DetailIntlDateProps {
  prefix?: string
  children?: string | any
  intl: any
  fetch: any
  label?: string
  unlocalizeLabel?: boolean
  size?: 'small' | 'medium' | 'large'
  transform?: any
  style: { [key: string]: any }
  onClick: any
}
const DetailIntlDate = (props: DetailIntlDateProps) => {
  const { children, ...other } = props

  const date = children

  return (
    <Detail {...other}>
      <SpanDate date={date} />
    </Detail>
  )
}

export default DetailIntlDate
