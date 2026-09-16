import _ from 'lodash'
import { Formik } from 'formik'
import { Row, Modal, Form as AntdForm, Progress } from 'antd'

import * as FUtils from 'Utils/formik'

import ErrorAlert from 'Components/Layout/Error/ErrorAlert'
import { StyledButton } from 'Components/Styled'
import { FormattedMessage } from 'react-intl'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Modules/Generic/SubmitModal/Modal')

interface SubmitModalProps {
  onCancel?: () => void
  onSubmit?: any
  title?: string
  prefix?: string
  modal?: { [key: string]: any }
  okText?: string
  cancelText?: string
  width?: number
  okButtonDisabled?: boolean
  [key: string]: any
}
const SubmitModal = (props: SubmitModalProps) => {
  log.info('SubmitModal.props', props)
  const {
    onCancel,
    onSubmit,
    prefix = 'modal.',
    width = 650,
    title = null,
    modal = {},
    okText,
    cancelText,
    okButtonDisabled,
    ...other
  } = props
  const {
    data = {},
    visible = false,
    loading = false,
    error = false,
    progress = null,
  } = modal

  const handleCustomSubmit = (values: { [key: string]: any }, frk: any) => {
    log.info('handleSubmit.values', values)
    // remove house keeping value of formik
    onSubmit(FUtils.filterFormValues(values), frk)
    frk.setSubmitting(false)
  }

  const okFormatted = _.defaultTo(okText, 'ui.generic.save')
  const cancelFormatted = _.defaultTo(cancelText, 'ui.generic.cancel')
  return (
    <>
      <Formik
        initialValues={data}
        onSubmit={handleCustomSubmit}
        enableReinitialize
      >
        {({ handleSubmit }) => (
          <Modal
            {...other}
            width={width}
            open={visible}
            title={!_.isNil(title) ? <FormattedMessage id={title} /> : null}
            onCancel={() => {
              if (onCancel) onCancel()
            }}
            footer={
              <>
                <StyledButton
                  onClick={() => {
                    if (onCancel) onCancel()
                  }}
                  disabled={loading}
                  id={`button.${prefix}cancel`}
                  label={cancelFormatted}
                />
                <StyledButton
                  type='primary'
                  id={`button.${prefix}save`}
                  loading={loading}
                  disabled={okButtonDisabled}
                  onClick={handleSubmit}
                  label={okFormatted}
                />
              </>
            }
          >
            <AntdForm layout='vertical' onFinish={handleSubmit}>
              {props.children}
              <Row>
                <ErrorAlert error={error} />
                {progress ? <Progress percent={progress} /> : null}
              </Row>
            </AntdForm>
          </Modal>
        )}
      </Formik>
    </>
  )
}

export default SubmitModal
