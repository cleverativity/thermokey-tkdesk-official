import { Steps } from 'antd'
import styled from 'styled-components'
import colors from 'styles/colors.module.scss'

const Style = styled(Steps)`
  margin-bottom: 20px;

  .ant-steps-item-title {
    font-size: 15px;
    font-family: 'Avenir Heavy', sans-serif;
  }

  .ant-steps-item-content {
    color: ${colors.description} !important;
    font-size: 14px;
  }

  .ant-steps-item-finish {
    .ant-steps-item-icon {
      background: ${colors.white} !important;
      border-color: ${colors.primary} !important;
      color: ${colors.primary} !important;
    }
  }
`

const StyledSteps = (props: any) => {
  return <Style {...props} />
}

export default StyledSteps
