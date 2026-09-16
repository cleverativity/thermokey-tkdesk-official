import styled from 'styled-components'

import { StyledRow } from 'Components/Styled'
import { Col, Typography } from 'antd'
import SubmitModal from './SubmitModal'
import { WarningOutlined } from '@ant-design/icons'
import { FormattedMessage } from 'react-intl'

const StyledSubmitModal = styled(SubmitModal)`
  .ant-modal-content {
    .ant-modal-footer {
      button:last-child {
        background-color: #faad14 !important;
        border-color: #faad14 !important;
        color: white !important;
        &:hover,
        &:focus {
          background-color: #ffc553 !important;
          border-color: #ffc553 !important;
        }
      }
    }
  }
`

const { Title } = Typography

/**
 * A SubmitModal used for Warning actions (yellow color)
 * To ensure a perfect alignment, wrap your content inside a StyledRow
 * @prop {titleText} string
 * @prop {subtitleContent} jsx - subtitle content
 * @prop {children} jsx - modal body
 */
const WarningSubmitModal = (props: {
  children: any
  titleText: string
  subtitleContent: any
  modal?: any
  width?: number
  onSubmit?: any
  onCancel?: any
  okText?: string
}) => {
  const { children = null, titleText, subtitleContent = '' } = props
  return (
    <StyledSubmitModal {...props}>
      <StyledRow>
        <Col span={2}>
          <WarningOutlined style={{ fontSize: 25, color: '#faad14' }} />
        </Col>
        <Col span={22}>
          <Title level={4}>{<FormattedMessage id={titleText} />}</Title>
          {subtitleContent}
        </Col>
      </StyledRow>
      {children}
    </StyledSubmitModal>
  )
}

export default WarningSubmitModal
