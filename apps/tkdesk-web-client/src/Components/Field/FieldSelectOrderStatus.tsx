import rawOrderStatus from 'Localization/Constants/order_status.json'
import FieldRangeSelect from './FieldRangeSelect'

const FieldSelectOrderStatus = (props: {
  name: string
  mode?: string
  span?: number
  [key: string]: any
}) => {
  const { name, mode, span, ...otherProps } = props
  return (
    <FieldRangeSelect
      optionKeyPath={['key']}
      optionMessagePath={['key']}
      prefix='select.orders.status.'
      label='data.orders.new_status'
      options={rawOrderStatus}
      name={name}
      mode={mode}
      span={span}
      {...otherProps}
    />
  )
}

export default FieldSelectOrderStatus
