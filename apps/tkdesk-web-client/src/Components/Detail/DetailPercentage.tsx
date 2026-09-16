import Detail from './Detail'
import { SpanPercentage } from 'Components/Span'
const DetailPercentage = (props: any) => {
  const { children, ...other } = props

  return (
    <Detail {...other}>
      <SpanPercentage value={children} />
    </Detail>
  )
}

export default DetailPercentage
