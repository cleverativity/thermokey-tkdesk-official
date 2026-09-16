import _ from 'lodash'
import { InputNumber } from 'antd'
import styled from 'styled-components'
import { FormikField } from '../Formik'
import * as V from 'Components/Field/ValidateFunctions'
import * as F from 'Model/functions'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { normalizeRoundedSignedZero } from 'Utils/functions'

const StyledAntdUnitField = styled(FormikField)`
  .ant-input-number {
    width: 100%;
    padding: 0 11px;

    input {
      text-align: right;
    }
  }
`

const FieldDecimalNumber = (props: {
  [key: string]: any
  isPointed?: boolean
}) => {
  const {
    scale = 2,
    incompatibilityError = false,
    controls = false,
    // addonAfter = '',
    prefix = <span />,
    suffix = <span />,
    transformTo = null,
    min = null,
    max = null,
    name = null,
    dependOn = null,
    positiveValidation,
    validate = null,
    isPointed,
    defaultValue = null,
    ...other
  } = props

  const { values, setFieldValue } = useFormikContext()
  const objFormikValue = _.get(values, name, null)

  const fieldValue = _.isPlainObject(objFormikValue)
    ? _.get(objFormikValue, 'value', null)
    : objFormikValue

  const fieldName = _.isPlainObject(objFormikValue) ? `${name}.value` : name

  const normalizeFieldValue = (value: any) =>
    normalizeRoundedSignedZero(value, scale)

  const transformFunction = (value: any) => {
    const transformedValue = _.isNil(transformTo) ? value : transformTo(value)

    return normalizeFieldValue(transformedValue)
  }

  const unit_of_measurement = F.unitMapping(
    _.get(objFormikValue, 'unit_of_measurement', ''),
  )
  const validations = _.get(objFormikValue, 'validations', {})
  let minimum = _.isNil(min) ? _.get(validations, 'minimum', 0) : min
  let maximum = _.isNil(max) ? _.get(validations, 'maximum', null) : max

  if (positiveValidation) {
    minimum = Math.abs(minimum)
    maximum = Math.abs(maximum)

    if (minimum > maximum) [minimum, maximum] = [maximum, minimum]
  }

  useEffect(() => {
    if (defaultValue !== null && defaultValue !== undefined) {
      const currentValue = _.get(values, name, null)

      if (currentValue === null || currentValue === undefined) {
        setFieldValue(name, defaultValue)
      }
    }
  }, [defaultValue, name, setFieldValue, values])

  useEffect(() => {
    const normalizedValue = normalizeRoundedSignedZero(fieldValue, scale)

    if (!Object.is(normalizedValue, fieldValue)) {
      setFieldValue(fieldName, normalizedValue, false)
    }
  }, [fieldName, fieldValue, scale, setFieldValue])

  return (
    <StyledAntdUnitField
      // placeholder="1'000.00"
      transformTo={transformFunction}
      transformFrom={normalizeFieldValue}
      component={InputNumber}
      addonAfter={unit_of_measurement}
      precision={scale}
      decimalSeparator={isPointed ? '.' : ','}
      componentClass='ant-input'
      controls={controls}
      defaultValue={defaultValue}
      localizationErrorValues={() => ({
        min: `${minimum} ${unit_of_measurement}`,
        max: `${maximum} ${unit_of_measurement}`,
        dependOn: `${dependOn}`,
      })}
      validate={
        !_.isNil(validate)
          ? validate
          : _.isNil(maximum) || _.isNil(minimum)
            ? null
            : V.validateNumberBetween(
                Number(minimum),
                Number(maximum),
                dependOn,
                incompatibilityError,
              )
      }
      name={name}
      {...other}
    />
  )
}

export default FieldDecimalNumber
