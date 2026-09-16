import _ from 'lodash'
import DangerSubmitModal from 'Components/Modal/DangerSubmitModal'
import { FormattedMessage, useIntl } from 'react-intl'
import { Col, Typography } from 'antd'
import { StyledRow } from 'Components/Styled'
import { FieldInput } from 'Components/Field'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Model/FanModels/modal/delete')
const { Text } = Typography

const ConfirmDeleteFanModal = (props: any) => {
  const { onCancel, modal, onDelete } = props

  const fan_modal = _.get(modal, 'data.fan_modal', {})
  const { internal_code, model_code } = fan_modal

  const intl = useIntl()

  const modalTitle = 'data.fan_models.delete'
  const modalText = 'data.fan_models.delete_modal_text'

  const onSubmit = (values: any, frk: any) => {
    const { setFieldError } = frk
    log.info('delete.onSubmit', { values, frk, props })
    const { fan_modal } = values
    const { id, internal_code } = fan_modal
    const { repeat_code } = values
    if (repeat_code !== internal_code) {
      setFieldError(
        'repeat_code',
        intl.formatMessage({ id: 'ui.generic.codes_not_match' }),
      )
    } else {
      log.info('delete.onSubmit body', { id })
      onDelete(id)
      onCancel()
    }
  }

  return (
    <DangerSubmitModal
      modal={modal}
      onSubmit={onSubmit}
      onCancel={onCancel}
      subtitleContent={
        <Text>
          <FormattedMessage id='data.fan_models.delete_modal_subtitle' />
          <code>{model_code}</code>?
        </Text>
      }
      titleText={modalTitle}
    >
      <StyledRow style={{ marginBottom: 10 }}>
        <Col span={24}>
          <Text style={{ marginTop: 20, display: 'block' }}>
            <FormattedMessage id={modalText} />
            <br />
            <code>{internal_code}</code>
          </Text>
        </Col>
      </StyledRow>
      <StyledRow>
        <FieldInput
          span={24}
          placeholder={internal_code}
          required
          name='repeat_code'
          hideLabel
          unlocalizedLabel
        />
      </StyledRow>
    </DangerSubmitModal>
  )
}

export default ConfirmDeleteFanModal
