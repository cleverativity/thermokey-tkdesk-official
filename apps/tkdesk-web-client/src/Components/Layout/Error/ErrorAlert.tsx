// import { permissions } from 'Model/RBAC/constants'
// import { useAuthorization } from 'Modules/App/Authorization'
import _ from 'lodash'
import { Alert } from 'antd'
import ReactJson from 'react-json-view'
import { useIntl } from 'react-intl'

import * as E from 'Utils/errors'
import { useAuthorization } from 'Modules/App/Authorization'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Comp/Layout/ErrorAlert')

const ErrorAlert = (props: any) => {
  // const autho = useAuthorization()
  const { error, showErrorPayload = false, ...other } = props
  const intl = useIntl()
  const autho = useAuthorization()

  if (_.isBoolean(error) && !error) {
    return null
  }

  log.info('render.props', props)
  const { message, description } = E.prettyError(autho, error, intl)

  return (
    <>
      <Alert
        showIcon
        type='error'
        message={message}
        description={description}
        {...other}
      />
      {/* || autho.check(permissions.rbac.dev_func.exec) */}
      {showErrorPayload && (
        <ReactJson collapsed={0} src={E.refineError(error)} />
      )}
    </>
  )
}

export default ErrorAlert
