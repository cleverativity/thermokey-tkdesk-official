import { Card } from 'antd'
import styled from 'styled-components'
import colors from 'styles/colors.module.scss'

const Style = styled(Card)`
  width: 100%;
  margin-bottom: 20px !important;
  border: 0.5px solid ${colors.border};

  &:last-child {
    margin-bottom: 0px !important;
  }
  .ant-card-head {
    background-color: ${colors.background};
  }
`

const StyledCard = (props: any) => {
  return <Style {...props} />
}

export default StyledCard
