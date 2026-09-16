import FieldRangeSelect from './FieldRangeSelect'
import rawVisibilityType from 'Localization/Constants/visibility_types.json'

const FieldSelectVisibility = (props: {
  name: string
  mode?: string
  required?: boolean
  span?: any
}) => {
  const { name, span, mode, required = false } = props

  return (
    <FieldRangeSelect
      optionKeyPath={['key']}
      optionMessagePath={['key']}
      prefix='select.fan_models.visibility.'
      placeholder='ui.fan_models.placholder_visibility'
      options={rawVisibilityType}
      required={required}
      name={name}
      mode={mode}
      span={span}
      label='data.fan_models.visibility'
      showSearch
    />
  )
}

export default FieldSelectVisibility
