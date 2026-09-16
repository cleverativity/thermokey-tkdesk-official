import _ from 'lodash'
import * as R from 'ramda'
import styled from 'styled-components'
import { useFormikContext } from 'formik'

import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

import { FormikItem } from 'Components/Formik'
import colors from 'styles/colors.module.scss'
import { useIntl } from 'react-intl'

const StyledPhoneInput = styled(PhoneInput)`
  display: flex;
  align-items: center;

  .PhoneInputCountry {
    border: 1px solid ${colors.border};
    border-radius: 6px 0 0 6px;
    padding: 4px 11px;

    position: relative;
    align-self: stretch;
    display: flex;
    align-items: center;
    width: 50px;

    &:hover {
      border-color: ${colors.primary};
    }

    select {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 1;
      border: 0;
      opacity: 0;
      cursor: pointer;
    }

    div {
      display: flex;
      align-items: center;

      img {
        width: 100%;
        padding: 0;
      }
    }
  }

  input {
    border-radius: 0 6px 6px 0;
    border: 1px solid ${colors.border};
    padding: 4px 11px;
    width: 100%;

    &:hover {
      border-color: ${colors.primary};
    }
  }
`

interface FieldPhoneNumberProps {
  name: string
  label: string
  [key: string]: any
}

const FieldPhoneNumber = (props: FieldPhoneNumberProps) => {
  const { name, onChange, ...other } = props

  const formikContext: any = useFormikContext()
  const intl = useIntl()

  return (
    <FormikItem
      name={name}
      validate={(val: any) => {
        if (!isValidPhoneNumber(val))
          return intl.formatMessage({
            id: 'ui.generic.email_invalid_format',
          })
        return undefined
      }}
      {...other}
    >
      <StyledPhoneInput
        international
        defaultCountry='IT'
        value={_.get(formikContext, `values.${name}`)}
        onChange={(value: any) => {
          formikContext.setFieldValue(name, value)
          if (!R.isNil(onChange)) onChange(value, formikContext)
        }}
        onBlur={() => formikContext.setFieldTouched(name, true)}
      />
    </FormikItem>
  )
}

export default FieldPhoneNumber
