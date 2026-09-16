import React from 'react'
import { ConsoleLogger } from 'aws-amplify/utils'
import _ from 'lodash'
import * as Sentry from '@sentry/browser'
import { Col, Modal } from 'antd'
import { useIntl } from 'react-intl'
import ReactJson from 'react-json-view'

import * as E from 'Utils/errors'
import { StyledButton, StyledRow } from 'Components/Styled'

const log = new ConsoleLogger('Comp/Layout/Error/ErrorModal')

interface IErrorModalProps {
  error?: any
  showErrorPayload?: any
  autho?: any
}

interface IErrorModalViewProps extends IErrorModalProps {
  intl: any
}

interface IErrorModalState {
  signal?: any
  hide?: any
}

class ErrorModalView extends React.Component<
  IErrorModalViewProps,
  IErrorModalState
> {
  static defaultProps: {}

  constructor(props: any) {
    super(props)
    this.state = { hide: false, signal: { done: false, loading: false } }
    this.onHideError = this.onHideError.bind(this)
    this.onSignalError = this.onSignalError.bind(this)
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    const { error } = this.props
    if (!_.isEqual(error, prevProps.error)) {
      this.setState({ hide: false })
    }
  }

  onSignalError() {
    const { error } = this.props
    this.setState({ signal: { loading: true, done: false } })
    log.error(error)
    log.error('trying to send the error to sentry: ', { ...error })
    Sentry.captureException(error)

    const p = new Promise((resolve) => setTimeout(resolve, 1000))
    p.then(() => this.setState({ signal: { done: true, loading: false } }))
  }

  onHideError() {
    this.setState({ hide: true })
  }

  render() {
    const { error, intl, showErrorPayload = false, autho } = this.props
    const { signal, hide } = this.state

    if ((_.isBoolean(error) && !error) || hide || _.isNil(error)) {
      return null
    }
    log.info('render.props', this.props)

    const pretty = E.prettyError(autho, error, intl)

    return (
      <Modal
        closable
        // showIcon
        // type='error'
        open={!hide}
        title={pretty.message}
        onCancel={this.onHideError}
        onOk={this.onHideError}
        footer={
          <StyledRow align='end'>
            <Col>
              <StyledButton
                type='primary'
                id={`button.close.save`}
                onClick={this.onHideError}
              >
                Ok
              </StyledButton>
            </Col>
          </StyledRow>
        }
      >
        {pretty.description}

        {showErrorPayload ? (
          <>
            <ReactJson src={E.refineError(error)} />
          </>
        ) : null}
      </Modal>
    )
  }
}

const ErrorModal = (props: IErrorModalProps) => {
  const intl = useIntl()

  return <ErrorModalView {...props} intl={intl} />
}

export default ErrorModal
