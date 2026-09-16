import { Switch as AntsSwitch } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { FormikField } from '../Formik'

export const Switch = (props: any) => {
  const { value, icon = false } = props
  return (
    <AntsSwitch
      checkedChildren={!icon ? 'ON' : <CheckOutlined />}
      unCheckedChildren={!icon ? 'OFF' : <CloseOutlined />}
      {...props}
      checked={value}
    />
  )
}
const FieldSwitch = (props: any) => (
  <FormikField {...props} component={Switch} />
)

export default FieldSwitch
