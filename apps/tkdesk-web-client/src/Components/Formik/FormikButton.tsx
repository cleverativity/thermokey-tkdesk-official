import { ComponentType } from 'react'
import _ from 'lodash'
import { connect, FormikContextType } from 'formik'
import styled from 'styled-components'
import { Button } from 'antd'
import { useIntl } from 'react-intl'

const StyledButton = styled(Button)`
  span {
    font-family: 'Avenir Medium', sans-serif;
  }
  .anticon-warning {
    font-size: 19px;
    color: #d14e45;
    position: relative;
    height: 19px;
    width: 22px;
    svg {
      position: relative;
      top: 2px;
    }
  }

  &.notValid {
    span {
      color: #d14e45 !important;
    }
    &:hover {
      color: #d14e45 !important;
      border-color: #d14e45 !important;
    }
  }
`

type FormikButtonProps = {
  disabled?: boolean
  icon?: any
  label?: string | null
  children?: React.ReactNode
  formik?: FormikContextType<{}>
  type?: 'link' | 'text' | 'primary' | 'default' | 'dashed' | undefined
  [key: string]:
    | string
    | boolean
    | React.ReactNode
    | FormikContextType<{}>
    | any
}

const FormikButton: ComponentType<FormikButtonProps> = connect(
  ({
    formik,
    children,
    disabled = false,
    icon,
    label = null,
    type,
    onClick,
    ...otherProps
  }) => {
    const intl = useIntl()
    const { isSubmitting, isValidating, setFieldValue, values } = formik

    return (
      <StyledButton
        {...otherProps}
        data-cy={`cy.${label}`}
        disabled={disabled || isSubmitting || isValidating}
        onClick={(e: any) => {
          e.preventDefault()
          if (onClick) onClick({ values, setFieldValue })
        }}
        htmlType='submit'
        type={type}
        icon={icon}
      >
        {_.isNil(label) ? children : intl.formatMessage({ id: label })}
      </StyledButton>
    )
  },
)

export default FormikButton
