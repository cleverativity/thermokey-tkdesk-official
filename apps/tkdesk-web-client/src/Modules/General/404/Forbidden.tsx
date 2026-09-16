import { FormattedMessage } from 'react-intl'
import { Card } from 'antd'

const Forbidden = (props: any) => {
  // const { message } = props
  return (
    <Card>
      <h2>
        <FormattedMessage id='pages.forbidden.title' />
      </h2>
      {/* {message ? <div> {message}</div> : null} */}
    </Card>
  )
}

export default Forbidden
