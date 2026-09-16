import { Checkbox } from 'antd'
import _ from 'lodash'
import styled from 'styled-components'
import { FormikField } from '../Formik'

const CheckboxGroup = Checkbox.Group

const StyledCheckboxGroup = styled(CheckboxGroup)`
  gap: clamp(10px, 5vw, 100px);
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
`

const FieldCheckBoxGroup = (props: any) => {
  const {
    children,
    value = false,
    label = null,
    requiredSingle,
    defaultValue,
    name,
    onChange = null,
    ...other
  } = props

  const newDefault = _.isNil(defaultValue) ? [] : defaultValue
  return (
    <FormikField
      {...other}
      name={name}
      label={label}
      component={(p: any) => {
        return (
          <StyledCheckboxGroup
            {...props}
            value={_.defaultTo(p.value, newDefault)}
            options={_.defaultTo(p.options, newDefault)}
            data-cy={`cy.${name}`}
            onChange={(checkedValue) => {
              let finalValue = checkedValue
              if (
                requiredSingle &&
                Array.isArray(checkedValue) &&
                checkedValue.length > 1
              ) {
                const currentValue = _.defaultTo(p.value, newDefault)
                const newlySelected = checkedValue.find(
                  (val) => !currentValue.includes(val),
                )
                finalValue = newlySelected
                  ? [newlySelected]
                  : [checkedValue[checkedValue.length - 1]]
              }

              if (p.onChange) {
                p.onChange(finalValue)
              }

              if (onChange) {
                onChange(finalValue)
              }
            }}
          />
        )
      }}
    />
  )
}

export default FieldCheckBoxGroup
