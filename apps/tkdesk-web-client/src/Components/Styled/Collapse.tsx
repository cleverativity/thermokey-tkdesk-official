import styled from 'styled-components'
import { Collapse } from 'antd'
import colors from 'styles/colors.module.scss'

const StyledCollapse = (props: any) => {
  const { backgroundColor = '#f9f9f9' } = props
  return (
    <CollapseStyle backgroundColor={backgroundColor}>
      <Collapse {...props}>{props.children}</Collapse>
    </CollapseStyle>
  )
}

const CollapseStyle = styled.div<any>`
  .ant-collapse {
    background-color: ${(props) =>
      props.backgroundColor ? props.backgroundColor : colors.white};
  }

  .ant-collapse-content {
    background-color: ${colors.white};
    .ant-collapse-content-box {
      padding: 16px 25px 16px 25px;
    }
  }

  .ant-collapse .ant-collapse-item-disabled > .ant-collapse-header,
  .ant-collapse .ant-collapse-item-disabled > .ant-collapse-header > .arrow {
    color: ${colors.text};
  }
`

export default StyledCollapse
