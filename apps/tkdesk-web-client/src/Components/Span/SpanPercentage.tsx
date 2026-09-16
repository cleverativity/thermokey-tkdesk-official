import { useIntl } from 'react-intl'
import { Span } from 'Components/Span'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('SpanPercentage')

const SpanPercentage = (props: any) => {
  const intl = useIntl()
  const { ...other } = props
  return (
    <Span
      {...other}
      transform={(value: any) => intl.formatNumber(value) + ' %'}
    />
  )
}

SpanPercentage.displayName = 'SpanPercentage'

export default SpanPercentage
