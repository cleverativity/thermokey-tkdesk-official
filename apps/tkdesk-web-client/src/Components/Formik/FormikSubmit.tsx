import { ComponentType } from 'react'
import _ from 'lodash'
import { connect, FormikContextType } from 'formik'
import styled from 'styled-components'
import { Button } from 'antd'
import { useIntl } from 'react-intl'
import { WarningOutlined } from '@ant-design/icons'
import colors from 'styles/colors.module.scss'

const StyledButton = styled(Button)`
  .anticon-warning {
    font-size: 19px;
    color: ${colors.danger};
    position: relative;
    height: 19px;
    width: auto;
    svg {
      position: relative;
      top: 2px;
    }
  }
  &.ant-btn-primary {
    box-shadow: none;

    span {
      color: ${colors.white};
    }

    &:disabled {
      border-color: ${colors.disabled};
      background: ${colors.disabled_background};
      span {
        color: ${colors.disabled};
      }
    }
  }

  &.notValid {
    span {
      color: ${colors.danger}!important;
    }
    &:hover {
      color: ${colors.danger} !important;
      border-color: ${colors.danger} !important;
    }
  }
`

type FormikSubmitProps = {
  disabled?: boolean
  icon?: any
  label?: string | null
  children?: React.ReactNode
  formik?: FormikContextType<{}>
  [key: string]:
    | object
    | string
    | boolean
    | React.ReactNode
    | FormikContextType<{}>
}

const FormikSubmit: ComponentType<FormikSubmitProps> = connect(
  ({
    formik,
    children,
    disabled = false,
    icon,
    label = null,
    ...otherProps
  }) => {
    const intl = useIntl()
    const { isSubmitting, isValid, isValidating, handleSubmit, submitCount } =
      formik

    return (
      <StyledButton
        {...otherProps}
        data-cy={`cy.${label}`}
        disabled={disabled || isSubmitting || isValidating}
        onClick={(e: any) => handleSubmit(e)}
        htmlType='submit'
        type={submitCount === 0 || isValid ? 'primary' : 'dashed'}
        icon={submitCount === 0 || isValid ? icon : <WarningOutlined />}
        className={submitCount === 0 || isValid ? '' : 'notValid'}
      >
        {_.isNil(label) ? children : intl.formatMessage({ id: label })}
      </StyledButton>
    )
  },
)

export default FormikSubmit
