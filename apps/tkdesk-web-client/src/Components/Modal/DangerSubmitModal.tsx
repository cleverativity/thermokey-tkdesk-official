import styled from 'styled-components'

import { StyledRow } from 'Components/Styled'
import { Col, Typography } from 'antd'
import SubmitModal from './SubmitModal'
import { WarningOutlined } from '@ant-design/icons'
import _ from 'lodash'
import { useIntl } from 'react-intl'

const StyledSubmitModal = styled(SubmitModal)`
  .ant-modal-content {
    .ant-modal-footer {
      button:last-child {
        background-color: #cf0a2c !important;
        border-color: #cf0a2c !important;
        color: white !important;
        &:hover,
        &:focus {
          background-color: #df534b !important;
          border-color: #df534b !important;
        }
      }
    }
  }
`

const { Title } = Typography

/**
 * A SubmitModal used for Danger actions (red color)
 * To ensure a perfect alignment, wrap your content inside a StyledRow
 * @prop {subtitleContent} jsx - subtitle content
 * @prop {children} jsx - modal body
 */
const DangerSubmitModal = (props: {
  children: any
  titleText: string
  subtitleContent: any
  modal: any
  onSubmit: any
  onCancel: any
}) => {
  const { children, titleText, subtitleContent } = props

  const intl = useIntl()

  return (
    <StyledSubmitModal {...props}>
      <StyledRow>
        <Col span={2}>
          <WarningOutlined style={{ fontSize: 25, color: '#ff4d4f' }} />
        </Col>
        <Col span={22}>
          <Title level={4} style={{ marginTop: 0 }}>
            {!_.isNil(titleText) ? intl.formatMessage({ id: titleText }) : null}
          </Title>
          {subtitleContent}
        </Col>
      </StyledRow>
      {children}
    </StyledSubmitModal>
  )
}

export default DangerSubmitModal
