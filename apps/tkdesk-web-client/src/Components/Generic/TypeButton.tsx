import { Button } from 'antd'
import styled from 'styled-components'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Comp/Generic/Buttons/TypeButton')

const orange = '#faad14'
const hoverOrange = '#ffc553'

const green = '#00af91'
const hoverGreen = '#00c2a1'

const TypeButtonStyled = styled(Button)`
  margin-left: 8px;

  /* type = warning */
  &.ant-btn-warning {
    background-color: ${orange};
    border-color: ${orange};
    color: white;
    &:hover,
    &:focus {
      background-color: ${hoverOrange};
      border-color: ${hoverOrange};
      color: white;
    }
  }
  &.ant-btn-warning[disabled] {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.25);
    &:hover,
    &:focus {
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      color: rgba(0, 0, 0, 0.25);
    }
  }

  /* type = success */
  &.ant-btn-success {
    background-color: ${green};
    border-color: ${green};
    color: white;
    &:hover,
    &:focus {
      background-color: ${hoverGreen};
      border-color: ${hoverGreen};
      color: white;
    }
  }
  &.ant-btn-success[disabled] {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.25);
    &:hover,
    &:focus {
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      color: rgba(0, 0, 0, 0.25);
    }
  }
`

const TypeButton = (props: any) => {
  const {
    defaultAction,
    actions,
    label,
    className,
    ids,
    type = 'default',
    href,
    target,
    ...other
  } = props

  return (
    <TypeButtonStyled
      href={href}
      target={target}
      type={type}
      {...other}
      {...ids}
    />
  )
}

export default TypeButton
