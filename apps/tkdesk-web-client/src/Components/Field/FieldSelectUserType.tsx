import _ from 'lodash'
import rawUserTypes from 'Localization/Constants/user_types.json'
import FieldRangeSelect from './FieldRangeSelect'

const FieldSelectUserType = (props: {
  name: string
  mode?: string
  required?: boolean
  hideRequired?: boolean
  span?: any
  label: string
}) => {
  const {
    name,
    span,
    label,
    mode,
    required = false,
    hideRequired = false,
  } = props

  const newOptions = _.filter(
    rawUserTypes,
    (option: { key: string; [key: string]: string }) =>
      option.key !== 'superadmin',
  )
  return (
    <FieldRangeSelect
      optionKeyPath={['key']}
      optionMessagePath={['key']}
      prefix='select.users.type.'
      placeholder='ui.users.placholder_type'
      options={newOptions}
      required={required}
      hideRequired={hideRequired}
      name={name}
      mode={mode}
      span={span}
      label={label}
    />
  )
}

export default FieldSelectUserType
