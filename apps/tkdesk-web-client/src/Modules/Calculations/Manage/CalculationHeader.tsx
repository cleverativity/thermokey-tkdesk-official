import { useEffect, useState } from 'react'
import { StyledButton, StyledPageHeader, StyledSteps } from 'Components/Styled'
import { ConsoleLogger } from 'aws-amplify/utils'
import * as APIProfile from 'Api/Profile/endpoints'

import { Col, Row } from 'antd'
import _ from 'lodash'
import { connect } from 'react-redux'
import actions from '../actions'
import confirmCleanedRouteEn from 'Model/BackModals/confirmCleanedRouteEn'
import confirmCleanedRouteIt from 'Model/BackModals/confirmCleanedRouteIt'

import confirmOrderCreationEn from 'Model/Orders/modal/confirmOrderCreationEn'
import confirmOrderCreationIt from 'Model/Orders/modal/confirmOrderCreationIt'
import { useIntl } from 'react-intl'

const log = new ConsoleLogger('Modules/Calculations/CalculationsHeaderProps')
interface CalculationsHeaderProps {
  data: any
  profile: any
  loading?: boolean
  onStep?: (id: number | string, step: number, language: string) => any
  onBackToList?: () => void
  onCreateOrder?: (id: number | string, language: string) => void
  onDownload?: (value: {
    storage_url: string
    language: string
    id: string
  }) => void
  onRegenerate?: (id: string) => void
  onReceiveUpdate: () => void
  params?: any
}

const CalculationHeader = (props: CalculationsHeaderProps) => {
  log.info('render.props', props)

  const {
    onStep,
    onBackToList,
    onCreateOrder,
    onDownload,
    onRegenerate,
    onReceiveUpdate,
    data,
    profile,
    loading,
    params,
  } = props

  const { isRegenerating, isLanguageChanged } = params

  const calculation = _.get(data, 'calculation', {})

  const order_id = _.get(calculation, 'order_id', null)
  const id = _.get(calculation, 'id', '')
  const code = _.get(calculation, 'code', '')
  const use_case = _.get(calculation, 'use_case', '')
  const status = _.get(calculation, 'status', '')
  const [storage_url, setStorageUrl] = useState(
    _.get(calculation, 'storage_url', null),
  )
  const intl = useIntl()

  let currentStep = (() => {
    switch (status) {
      case 'created':
        return 0
      case 'use_case_selected':
        return 1
      case 'solved':
        return 2
      case 'detailed':
        return 3
      default:
        return 0
    }
  })()

  const language = _.get(profile, 'data.preferences.language', 'it')

  const handleBackToStep = (step: number) => {
    if (onStep) onStep(id, step, language)
  }

  const handleCreationModal = () => {
    if (onCreateOrder) onCreateOrder(id, language)
  }

  const handleDownload = (
    storage_url: string,
    language: string,
    id: string,
  ) => {
    if (onDownload) onDownload({ storage_url, language, id })
  }

  const handleRegeneratePdf = (id: string) => {
    if (onRegenerate) onRegenerate(id)
  }

  const items = [
    {
      title: intl.formatMessage({ id: 'ui.coils.microchannel.steps.use_case' }),
      description:
        currentStep === 0
          ? null
          : intl.formatMessage({
              id: `ui.coils.microchannel.steps.use_case.${use_case}`,
            }),
      disabled: currentStep <= 0,
    },
    {
      title: intl.formatMessage({
        id: 'ui.coils.microchannel.steps.input_parameters',
      }),
      disabled: currentStep <= 1,
    },
    {
      title: intl.formatMessage({
        id: 'ui.coils.microchannel.steps.model_choice',
      }),
      disabled: currentStep <= 2,
    },
    {
      title: intl.formatMessage({
        id: 'ui.coils.microchannel.steps.model_detail',
      }),
      disabled: currentStep <= 3,
    },
  ]

  useEffect(() => {
    if (status === 'completed') {
      let subscription: any
      const apiCall: any = APIProfile.onCreateRealTimeCallbackSubscription(code)
      // subscribe
      subscription = apiCall.subscribe({
        next: (data: any) => {
          log.info('onCreateRealTimeCallback.subscription', data)

          const notificationData = JSON.parse(
            _.get(data, 'data.onCreateRealTimeCallbackByCode.data', {}),
          )

          const new_storage_url = _.get(notificationData, 'storage_url', null)

          if (new_storage_url) {
            setStorageUrl(new_storage_url)
            onReceiveUpdate()
          } else setStorageUrl(notificationData)

          log.info(
            'onCreateRealTimeCallback.notificationData',
            notificationData,
          )
        },
        error: (error: any) => log.warn('Error:', error),
      })
      return () => {
        //unsubscribe
        if (!_.isNil(subscription)) subscription.unsubscribe()
      }
    }
  }, [code, status])

  useEffect(() => {
    if (status === 'completed') {
      if (isLanguageChanged) {
        handleRegeneratePdf(id)
      }
    }
  }, [isLanguageChanged])

  return (
    <>
      <StyledPageHeader title='data.calculations.header' />
      {loading ? null : status === 'completed' ? (
        <>
          <Row
            align='middle'
            justify='space-between'
            style={{ margin: '0 0 16px 0' }}
          >
            <Col>
              <StyledButton
                label='ui.coils.microchannel.steps.back_to_list'
                onClick={onBackToList}
                id='button.calculation_list.back_to_list'
              />
            </Col>
            <Row align='middle' justify='space-between'>
              {/* <Col style={{ margin: '0 16px' }}>
                {_.isNil(order_id) ? (
                  <StyledButton
                    type='primary'
                    label='ui.order.create_order'
                    onClick={handleCreationModal}
                    id='button.model_detail.order_new'
                  />
                ) : (
                  <Alert
                    message={
                      <FormattedMessage id='data.orders.already_created_order' />
                    }
                    type='warning'
                  />
                )}
              </Col> */}

              <StyledButton
                label='ui.coils.microchannel.model_detail.download'
                onClick={() => handleDownload(storage_url, language, id)}
                id='button.model_detail.download'
                loading={isRegenerating || _.isNil(storage_url)}
              />
            </Row>
          </Row>
        </>
      ) : (
        <StyledSteps
          current={currentStep}
          labelPlacement='vertical'
          onChange={(current: any) => handleBackToStep(current)}
          items={items}
        />
      )}
    </>
  )
}

export default connect(
  (state: AppState) => ({
    ...state.calculation.manage,
    profile: state.general.profile,
  }),
  (dispatch) => {
    return {
      onBackToList: () => dispatch(actions.search.route()),
      onDownload: (value: {
        storage_url: string
        language: string
        id: string
      }) => {
        dispatch(actions.manage.download(value))
      },
      onRegenerate: (id: string) => {
        dispatch(actions.manage.regenerate({ id }))
      },
      onReceiveUpdate: () => {
        dispatch(actions.manage.receivedUpdate())
      },
      onCreateOrder: (id: number | string, language: string) => {
        if (language === 'it') {
          confirmOrderCreationIt(() =>
            dispatch(actions.manage.createOrder({ id })),
          )()
        } else {
          confirmOrderCreationEn(() =>
            dispatch(actions.manage.createOrder({ id })),
          )()
        }
      },
      onStep: (id: number | string, step: number, language: string) => {
        switch (step) {
          case 0:
            if (language === 'it') {
              confirmCleanedRouteIt(() =>
                dispatch(actions.manage.resetStatus({ id, status: 'created' })),
              )()
            } else {
              confirmCleanedRouteEn(() =>
                dispatch(actions.manage.resetStatus({ id, status: 'created' })),
              )()
            }

            break
          case 1:
            dispatch(
              actions.manage.resetStatus({ id, status: 'use_case_selected' }),
            )
            break
          case 2:
            dispatch(actions.manage.resetStatus({ id, status: 'solved' }))
            break
          default:
            dispatch(
              actions.manage.resetStatus({ id, status: 'use_case_selected' }),
            )
            break
        }
      },
    }
  },
)(CalculationHeader)
