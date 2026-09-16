import { useEffect } from 'react'
import _ from 'lodash'
import { Row, Col } from 'antd'
import { StyledSpinner } from 'Components/Styled'
import styled from 'styled-components'

import ErrorModal from './Error/ErrorModal'
import ErrorResult from './Error/ErrorResult'
import { useAuthorization } from 'Modules/App/Authorization'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('ResourceLoading')

const Container = styled.div`
  position: relative;
  height: auto;
  z-index: 2;
  overflow: hidden;
  transition: all ease 0.35s;
  &.invisible {
    opacity: 0;
    pointer-events: none;
    /* display: none; */
  }
`

const BlockSpinner = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1000000000;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(255, 255, 255, 0.6);

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease 1s;
`

/**
 * This HOC wraps a component enabling it the capability to handle
 * blocking and non blocking errors, loading and updating state.
 * @param {() =>JSXElement} Component - Component to be rendered
 * @param {Object} options - object containing overriding options
 * @param {Boolean=false} options.legacy - no automatic handling of eny
 * @param {Boolean=false} options.forwardError - do not handle `error` key
 * @param {Boolean=false} options.forwardErrorModal - do not handle `errorModal` key
 * @param {Boolean=false} options.forwardUpdating - do not handle `updating` key
 * @param {Boolean=false} options.forwardLoading - do not handle `loading` key
 */
const makeResourceLoading = (Component: any, Header?: any, options?: any) => {
  return (props: {
    loading: boolean
    updating: boolean
    error: boolean | string
    errorModal: boolean | string
    onLoad: any
    [index: string]: any
  }) => {
    const {
      loading = false,
      updating = false,
      error = false,
      errorModal = false,
      onLoad,
    } = props
    const autho = useAuthorization()

    const forwardError: boolean = _.get(options, 'forwardError', false)
    const forwardErrorModal: boolean = _.get(
      options,
      'forwardErrorModal',
      false,
    )
    const forwardLoading: boolean = _.get(options, 'forwardLoading', false)
    const forwardUpdating: boolean = _.get(options, 'forwardUpdating', false)

    useEffect(
      () => {
        if (!_.isNil(onLoad)) {
          onLoad()
        }
      },
      _.values(_.get(props, ['match', 'params'], {})),
    )

    const filteredProps = _.omitBy(props, (v, k: string) =>
      _.cond([
        [(k: string) => _.isEqual('error', k), _.constant(!forwardError)],
        [
          (k: string) => _.isEqual('errorModal', k),
          _.constant(!forwardErrorModal),
        ],
        [(k: string) => _.isEqual('updating', k), _.constant(!forwardUpdating)],
        [(k: string) => _.isEqual('loading', k), _.constant(!forwardLoading)],
        [_.stubTrue, _.constant(false)],
      ])(k),
    )

    if (!forwardLoading && loading) {
      return (
        <>
          {!_.isNil(Header) && !loading ? <Header /> : null}
          <Row justify='center' align='middle' style={{ height: '80%' }}>
            <Col>
              <StyledSpinner />
            </Col>
          </Row>
        </>
      )
    } else if (!forwardError && error) {
      return <ErrorResult error={error} onRetry={onLoad} />
    } else {
      return (
        <>
          <Container
            className={
              !forwardUpdating && updating ? 'CONTAINER' : 'invisible CONTAINER'
            }
          >
            <BlockSpinner>
              <StyledSpinner />
            </BlockSpinner>
          </Container>
          {!_.isNil(Header) ? <Header /> : null}
          <Component {...filteredProps} />
          {!forwardErrorModal && (
            <ErrorModal autho={autho} error={errorModal} />
          )}
        </>
      )
    }
  }
}

export default makeResourceLoading
