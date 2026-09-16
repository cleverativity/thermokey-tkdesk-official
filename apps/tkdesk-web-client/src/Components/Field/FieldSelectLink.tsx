import FieldRangeSelect from './FieldRangeSelect'

import rawLink from 'Localization/Constants/link.json'

const FieldSelectLink = (props: {
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
      prefix='select.fan_models.link.'
      placeholder='ui.fan_models.placholder_link'
      options={rawLink}
      required={required}
      name={name}
      mode={mode}
      span={span}
      label='data.fan_models.link'
      showSearch
    />
  )
}

export default FieldSelectLink
