import _ from 'lodash'
import { Result, Button } from 'antd'
import ReactJson from 'react-json-view'
import { useIntl } from 'react-intl'

import * as E from 'Utils/errors'
import { useAuthorization } from 'Modules/App/Authorization'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Comp/Layout/ErrorResult')

const ErrorResult = (props: any) => {
  const { error, showErrorPayload = false, onRetry = null } = props
  const intl = useIntl()
  const autho = useAuthorization()

  if (_.isBoolean(error) && !error) {
    return null
  }

  log.info('render.props', props)
  const { message, description } = E.prettyError(autho, error, intl)
  log.info('ErrorResult.prettyError', { message, description })

  return (
    <>
      <Result
        status='error'
        title={message}
        subTitle={description}
        extra={(() => {
          let buttons: any = []
          if (!_.isNil(onRetry)) {
            buttons = [
              ...buttons,
              <Button key='1' onClick={onRetry}>
                Riprova
              </Button>,
            ]
          }

          return [...buttons]
        })()}
      />
      {showErrorPayload ? <ReactJson src={E.refineError(error)} /> : null}
    </>
  )
}

export default ErrorResult
