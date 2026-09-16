import * as R from 'ramda'
import _ from 'lodash'

import { useFormikContext } from 'formik'
import { FormItem } from 'formik-antd'

import * as F from 'Utils/functions'
import { requiredValidate } from '../Field/ValidateFunctions'
import { makeSpannable } from 'Components/Layout/SpannableCol'

import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { sanitizeHtml } from 'Utils/sanitizeHtml'

import { InfoCircleOutlined } from '@ant-design/icons'

interface FormikItemProps {
  prefix?: any
  suffix?: any
  hideRequired?: any
  [key: string]: any
}

const FormikItem = (props: FormikItemProps) => {
  const intl = useIntl()
  const {
    name,
    validate = null,
    required,
    children,
    label = 'empty',
    unlocalizedLabel = false,
    hideLabel,
    hideRequired = false,
    hideError,
    inline = false,
    tooltip = null,
    tooltipStyle = {},
    titleLabel = false,
    ...other
  } = props

  const labelMessage = hideLabel
    ? null
    : !R.isNil(label)
      ? unlocalizedLabel
        ? label
        : intl.formatMessage({ id: label })
      : undefined

  const sanitizedLabelMessage = !_.isNil(labelMessage)
    ? sanitizeHtml(labelMessage)
    : undefined

  const {
    errors,
    touched,
    submitCount,
    values,
  }: { errors: any; touched: any; submitCount: any; values: any } =
    useFormikContext()

  let customValidate = (value: any) => {
    const error_id = validate ? validate(value) : undefined
    if (R.isNil(error_id)) {
      return error_id
    }
    return typeof error_id === 'string'
      ? intl.formatMessage({ id: error_id })
      : intl.formatMessage({ id: error_id.error }, error_id.values)
  }

  if (required) {
    customValidate = (value: any) => {
      const error_id: any = F.composeValidate(requiredValidate, validate)(value)
      if (R.isNil(error_id)) {
        return error_id
      }
      return typeof error_id === 'string'
        ? intl.formatMessage({ id: error_id })
        : intl.formatMessage({ id: error_id.error }, error_id.values)
    }
  }

  const namePath: string[] = R.pipe(
    R.replace(/\[/g, '.'),
    R.replace(/\]/g, ''),
    R.split('.'),
  )(name)

  const isTouched = R.pathOr(false, namePath, touched)
  const hasError = _.has(errors, namePath)
  const showError = hasError && (isTouched || submitCount > 0)
  const showFeedback = hasError

  const errorMessage: any = hideError
    ? undefined
    : showError
      ? R.path(namePath, errors)
      : showError
        ? ''
        : undefined

  let myTooltip = null
  if (!_.isNil(tooltip)) {
    myTooltip = {
      title: tooltip,
      icon: <InfoCircleOutlined />,
      overlayStyle: tooltipStyle,
    }
  }

  return (
    <StyledFormItem
      inline={inline}
      labelCol={inline ? { xs: 15, sm: 12, lg: 21 } : null}
      wrapperCol={inline ? { xs: 9, sm: 12, lg: 3 } : null}
      name={name}
      validate={customValidate}
      required={required}
      hideRequired={hideRequired}
      tooltip={myTooltip}
      label={
        !R.isNil(labelMessage) && !R.isEmpty(labelMessage) ? (
          <span
            style={{ fontWeight: titleLabel ? 600 : 'normal' }}
            dangerouslySetInnerHTML={{ __html: sanitizedLabelMessage || '' }}
          ></span>
        ) : (
          labelMessage
        )
      }
      hasFeedback={showFeedback as boolean}
      validateStatus={showError ? 'error' : hasError ? '' : 'success'}
      help={errorMessage}
      {...other}
    >
      {children}
    </StyledFormItem>
  )
}

const StyledFormItem = styled(FormItem)<any>`
  .ant-input-group-addon {
    min-height: 36px;
  }

  label {
    &::before {
      content: ${(props) =>
        props.hideRequired ? 'none !important' : 'inherit'};
    }
  }
  .ant-checkbox-inner {
    width: 16px !important;
  }

  .ant-input-number-group-wrapper {
    width: 100%;
  }
  .ant-form-item-row {
    .ant-form-item-label {
      margin-bottom: 0;
    }
    label {
      span {
        font-family: 'Avenir Medium', sans-serif;
        display: flex;
        align-items: center;
      }
    }
  }
`

export default makeSpannable(FormikItem)
