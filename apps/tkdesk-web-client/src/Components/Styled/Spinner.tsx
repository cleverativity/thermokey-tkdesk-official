import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const StyledSpin = (props: any) => {
  const { size = 50, ...other } = props

  const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />
  return <Spin indicator={antIcon} {...other} />
}

export default StyledSpin
