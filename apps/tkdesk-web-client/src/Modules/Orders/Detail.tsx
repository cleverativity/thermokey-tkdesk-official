import { StyledPageHeader } from 'Components/Styled'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Modules/Order/Detail')

const OrderDetail = (props: any) => {
  log.info('render.props', props)
  const { data: order } = props

  return (
    <>
      <StyledPageHeader title='data.orders.header' />
    </>
  )
}

export default OrderDetail
