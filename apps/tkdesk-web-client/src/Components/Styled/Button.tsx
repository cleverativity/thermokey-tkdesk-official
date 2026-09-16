import _ from 'lodash'
import { Button, ConfigProvider, Popover } from 'antd'
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl'
import colors from 'styles/colors.module.scss'

const CustomButton = styled(Button)`
  &.ant-btn {
    span {
      font-family: 'Avenir Medium', sans-serif;
    }
    box-shadow: none;

    &.ant-btn-primary {
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

    &.ant-btn-link {
      span {
        color: ${colors.primary};
      }

      &:hover {
        span {
          color: ${colors.primary_hover};
        }
      }
    }

    &.ant-btn-default {
      &:hover:enabled {
        border-color: ${colors.primary_hover};

        span {
          color: ${colors.primary_hover};
        }
      }

      &:disabled {
        span {
          color: ${colors.text};
        }
      }
    }

    &.ant-btn-dangerous {
      box-shadow: none;
      background-color: ${colors.danger};
      border-color: ${colors.danger};

      span {
        color: ${colors.white};
      }

      &:hover:enabled {
        background-color: ${colors.danger_hover} !important;
        border-color: ${colors.danger_hover} !important;

        span {
          color: ${colors.white};
        }
      }
    }

    &.ant-btn-success {
      box-shadow: none;
      background-color: ${colors.success};
      border-color: ${colors.success};

      span {
        color: ${colors.white};
      }

      &:hover:enabled {
        background-color: ${colors.success_hover} !important;
        border-color: ${colors.success_hover} !important;

        span {
          color: ${colors.white};
        }
      }
    }
  }
`

const DisabledButton = styled(Button)`
  &.ant-btn {
    span {
      font-family: 'Avenir Medium', sans-serif;
    }

    &.ant-btn-primary {
      text-shadow: none;
      box-shadow: none;

      &:disabled {
        border-color: ${colors.disabled} !important;
        background: ${colors.disabled_background} !important;
        span {
          color: ${colors.text};
        }
      }
    }
    &.ant-btn-link {
      span {
        color: ${colors.primary};
      }
    }
  }
`

const StyledButton = ({
  id,
  label,
  type,
  onClick,
  style = {},
  icon = null,
  disabledPopover = null,
  children,
  success = false,
  ...otherProps
}: {
  id: string
  label?: string | any
  onClick: any
  disabledPopover?: any
  danger?: boolean
  type?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined
  style?: any
  disabled?: boolean
  icon?: any
  loading?: boolean
  children?: any
  success?: boolean
}) => {
  const intl = useIntl()
  const buttonType = success ? 'primary' : type

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.primary,
          colorPrimaryHover: colors.primary_hover,
        },
      }}
    >
      {_.isNil(disabledPopover) ? (
        <CustomButton
          id={id}
          {...otherProps}
          icon={icon}
          style={style}
          onClick={onClick}
          type={buttonType}
          className={success ? 'ant-btn-success' : ''}
        >
          {!_.isNil(label) ? intl.formatMessage({ id: label }) : ''}
          {children}
        </CustomButton>
      ) : (
        <Popover
          trigger='hover'
          content={
            <p style={{ textAlign: 'center' }}>
              <FormattedMessage id={disabledPopover} />
            </p>
          }
          placement='bottomRight'
        >
          <DisabledButton
            id={id}
            {...otherProps}
            icon={icon}
            style={style}
            onClick={onClick}
            type={buttonType}
            className={success ? 'ant-btn-success' : ''}
          >
            {!_.isNil(label) ? intl.formatMessage({ id: label }) : ''}
          </DisabledButton>
        </Popover>
      )}
    </ConfigProvider>
  )
}

export default StyledButton
