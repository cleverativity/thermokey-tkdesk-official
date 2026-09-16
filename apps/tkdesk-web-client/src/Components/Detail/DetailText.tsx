import { Span } from 'Components/Span'
import Detail from './Detail'

interface DetailTextProps {
  prefix?: string
  children?: string | any
  intl?: any
  fetch?: any
  label: string
  unlocalizeLabel?: boolean
  size?: 'small' | 'medium' | 'large'
  transform?: any
  style?: { [key: string]: any }
  onClick?: any
  scale?: number
  name: string
  sign?: string
}
const DetailText = (props: DetailTextProps) => {
  const { children, scale = 2, sign = 'no_sign', ...other } = props

  return (
    <Detail {...other}>
      <Span value={children} />
    </Detail>
  )
}

export default DetailText
