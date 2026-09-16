import _ from 'lodash'
import FieldRangeSelect from './FieldRangeSelect'
import rawPolynomialType from 'Localization/Constants/polynomial_type.json'

interface Option {
  key: string
}

const FieldSelectPolynomialType = (props: {
  name: string
  mode?: string
  required?: boolean
  disabled?: boolean
  span?: number
  usedOptions?: Option[]
}) => {
  const { name, span, mode, required = false, usedOptions, disabled } = props

  const filteredOptions = usedOptions
    ? _.differenceBy(rawPolynomialType, usedOptions, 'key')
    : rawPolynomialType

  return (
    <FieldRangeSelect
      optionKeyPath={['key']}
      optionMessagePath={['key']}
      placeholder='ui.fan_models.polynomial.placholder_polynomial_type'
      options={filteredOptions}
      required={required}
      name={name}
      mode={mode}
      span={span}
      disabled={disabled}
      label='ui.fan_models.polynomial.polynomial_type'
      showSearch
      prefix='select.polynomialType.'
    />
  )
}

export default FieldSelectPolynomialType
