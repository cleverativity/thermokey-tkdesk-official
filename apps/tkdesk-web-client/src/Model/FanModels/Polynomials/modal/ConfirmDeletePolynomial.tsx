import _ from 'lodash'
import DangerSubmitModal from 'Components/Modal/DangerSubmitModal'
import { FormattedMessage } from 'react-intl'
import { Col, Typography } from 'antd'
import { StyledRow } from 'Components/Styled'

import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Model/FanModels/modal/delete')
const { Text } = Typography

const ConfirmDeletePolynomial = (props: any) => {
  const { onCancel, modal, onDelete } = props

  const { data } = modal

  const modalText = 'data.fan_models.polynomial.delete_modal_text'

  const onSubmit = (values: any, frk: any) => {
    const id = _.get(data, 'polynomials.id', null)

    onDelete(id)
    onCancel()
  }

  return (
    <DangerSubmitModal
      modal={modal}
      onSubmit={onSubmit}
      onCancel={onCancel}
      subtitleContent={
        <FormattedMessage id='data.fan_models.polynomial.delete_modal_subtitle' />
      }
      titleText={'data.fan_models.polynomial.delete'}
    >
      <StyledRow style={{ marginTop: 20, marginBottom: 10 }}>
        <Col span={24}>
          <FormattedMessage id={modalText} />
        </Col>
      </StyledRow>
    </DangerSubmitModal>
  )
}

export default ConfirmDeletePolynomial
