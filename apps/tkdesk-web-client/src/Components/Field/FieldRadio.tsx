import _ from 'lodash'
import * as R from 'ramda'
import { useIntl } from 'react-intl'
import { Tooltip } from 'antd'
import { useFormikContext } from 'formik'
import { Radio } from 'formik-antd'

import { FormikItem } from 'Components/Formik'
import { ConditionalWrapper } from 'Components/Generic'

import styled from 'styled-components'
import colors from 'styles/colors.module.scss'

interface FieldRadioProps {
  options: {
    label: string | Element | React.ReactNode
    value: string | boolean | number
    disabled?: boolean
    description?: string
  }[]
  optionType?: 'default' | 'button'
  label?: string | any
  noIntl?: boolean
  [key: string]: any
}

const FieldRadio = (props: FieldRadioProps) => {
  const {
    name,
    options,
    optionType = 'default',
    size = 'middle',
    onChange,
    defaultValue,
    disabled,
    vertical = false,
    noIntl,
    ...other
  } = props

  const intl = useIntl()
  const formikContext = useFormikContext()

  const newOptions = R.map((el: any) => {
    return {
      ...el,
      label: noIntl ? (
        el.label
      ) : (
        <ConditionalWrapper
          condition={!R.isNil(el.tooltip)}
          wrapper={(children: any) => (
            <Tooltip
              overlayStyle={{
                minWidth: 350,
              }}
              title={el.tooltip}
            >
              {children}
            </Tooltip>
          )}
        >
          {!R.isNil(el.description) ? (
            <p className='ant-radio-label-with-desc'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {intl.formatMessage({ id: el.label ?? 'empty' })}
              </div>
              <span className='ant-radio-label-description'>
                {intl.formatMessage({ id: el.description ?? 'empty' })}
              </span>
            </p>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {intl.formatMessage({ id: el.label ?? 'empty' })}
            </div>
          )}
        </ConditionalWrapper>
      ),
    }
  })(options)

  return (
    <FormikItem name={name} {...other}>
      <StyledRadioGroup
        options={newOptions}
        size={size}
        disabled={disabled}
        data-cy={`cypress-${name}`}
        optionType={optionType}
        name={name}
        vertical={vertical}
        style={vertical ? { display: 'flex', flexDirection: 'column' } : {}}
        value={_.get(formikContext.values, name, defaultValue)}
        onChange={(e: any) => {
          if (!R.isNil(onChange)) {
            onChange(e, formikContext)
          }
          setTimeout(() => formikContext.validateField(name), 50)
        }}
      />
    </FormikItem>
  )
}

const StyledRadioGroup = styled<any>(Radio.Group)`
  width: 100%;

  .ant-radio-button-wrapper {
    height: auto !important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  label.ant-radio-wrapper {
    margin-bottom: ${(props) => (props.vertical ? '10px' : 0)};
    &:last-child {
      margin-bottom: 0;
    }
  }

  .ant-radio-label-with-desc {
    display: flex;
    flex-direction: column;
    .ant-radio-label-description {
      color: ${colors.primary};
      font-size: 12px;
    }
  }

  label {
    min-width: 115px;
    span {
      div {
        justify-content: center;
      }
    }
  }
`

export default FieldRadio
