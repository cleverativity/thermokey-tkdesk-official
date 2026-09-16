import { Form as AntdForm } from 'antd'
import { Field, useFormikContext } from 'formik'

import _ from 'lodash'
import styled from 'styled-components'

import { useIntl } from 'react-intl'

import { makeSpannable } from 'Components/Layout/SpannableCol'
import { composeValidate, requiredValidate } from '../Field/ValidateFunctions'
import { InfoCircleOutlined } from '@ant-design/icons'

const AntdFormItem = AntdForm.Item

const FormikField = (props: any) => {
  const intl = useIntl()
  const {
    name,
    validate = null,
    required = false,
    component: Component,
    label = 'empty',
    unlocalizedLabel = false,
    hideLabel,
    tooltip = null,
    transformTo = null,
    disableCustomOnChange = false,
    overrideOnChange = null,
    localizationErrorValues = null,
    hasFeedback = true,
    ...other
  } = props

  const labelMessage = hideLabel
    ? null
    : !_.isNil(label)
      ? unlocalizedLabel
        ? label
        : intl.formatMessage({ id: label })
      : undefined

  const formikContext = useFormikContext()
  const { values, errors, touched, submitCount, setFieldValue } = formikContext

  let customValidate = validate

  if (required) {
    customValidate = composeValidate(requiredValidate, validate)
  }

  const myTransformTo = _.partial((el) => {
    const temp = _.defaultTo(el, null)
    return _.isNil(transformTo) ? _.identity(temp) : transformTo(temp)
  })
  const objOrValue = _.get(values, name, null)

  const onChange = (event: any) => {
    setFieldValue(
      !_.isPlainObject(objOrValue) ? name : `${name}.value`,
      myTransformTo(event.target.value),
      false,
    )
  }

  let customOnChange = (v: string | number) => {
    setFieldValue(
      !_.isPlainObject(objOrValue) ? name : `${name}.value`,
      myTransformTo(v),
      false,
    )
  }

  if (disableCustomOnChange) {
    customOnChange = onChange
  }

  if (!_.isNil(overrideOnChange)) {
    customOnChange = (v: any) => {
      overrideOnChange(
        disableCustomOnChange
          ? myTransformTo(v.target.value)
          : myTransformTo(v),
        { field: { name, value: objOrValue }, form: formikContext },
      )
    }
  }

  const value = !_.isPlainObject(objOrValue)
    ? objOrValue
    : _.get(objOrValue, 'value')

  const isTouched = _.get(touched, name, false)
  const hasError = _.has(errors, name)
  const showError = hasError && (isTouched || submitCount > 0)
  const showFeedback = hasError && hasFeedback

  const errorMessage = showError
    ? intl.formatMessage(
        { id: _.get(errors, name) },
        _.isNil(localizationErrorValues)
          ? undefined
          : localizationErrorValues(value),
      )
    : hasFeedback
      ? ''
      : undefined

  let myTooltip = null
  if (!_.isNil(tooltip)) {
    myTooltip = {
      title: tooltip,
      icon: <InfoCircleOutlined />,
    }
  }

  return (
    <Field
      {...other}
      name={name}
      nameToValidate={name}
      required={required}
      compToRender={Component}
      validate={customValidate}
      component={RenderForm}
      overrideOnChange={customOnChange}
      showFeedback={showFeedback}
      errorMessage={errorMessage}
      myTooltip={myTooltip}
      intl={intl}
      labelMessage={labelMessage}
      showError={showError}
      hasError={hasError}
    />
  )
}

const RenderForm = ({ field, form, ...props }: any) => {
  const {
    allowClear,
    children = null,
    nameToValidate: name,
    intl,
    className = undefined,
    disableCustomOnChange = false,
    overrideOnChange = null,
    compToRender: Component,
    transformTo = null,
    transformFrom = _.identity,
    required = false,
    validate = null,
    showError,
    hasError,
    label = 'empty',
    hideLabel,
    labelMessage,
    myTooltip,
    hideRequired = false,
    useFastField = false,
    componentClass = '',
    placeholder = null,
    showFeedback,
    errorMessage,
    overrideOnBlur = null,
    ...other
  } = props

  const { value: objOrValue } = field
  const { touched } = form

  const value = !_.isPlainObject(objOrValue)
    ? objOrValue
    : _.get(objOrValue, 'value')

  return (
    <FieldDiv id={name} className={className} hideLabel={hideLabel}>
      <AntdFormItem
        required={required && !hideRequired}
        colon={false}
        hasFeedback={showFeedback}
        validateStatus={showError ? 'error' : hasError ? '' : 'success'}
        help={errorMessage}
        label={labelMessage}
        tooltip={myTooltip}
        {...other}

        // TODO: look for showSearch prop
      >
        <Component
          data-cy={`cy.${name}`}
          // name={name}
          status={showError ? 'error' : hasError ? '' : 'success'}
          value={transformFrom(value)}
          allowClear={allowClear}
          {...other}
          key={name}
          onBlur={() => {
            form.setTouched({ ...touched, [name]: true })
          }}
          placeholder={
            !_.isNil(placeholder)
              ? intl.formatMessage({ id: placeholder })
              : null
          }
          onChange={overrideOnChange}
          className={componentClass}
        >
          {children}
        </Component>
      </AntdFormItem>
    </FieldDiv>
  )
}

export const FieldDiv = styled.div<{ hideLabel: boolean }>`
  .ant-space-compact {
    width: 100%;
  }

  .ant-form-item-required,
  .ant-form-item-label {
    display: ${(props) => (props.hideLabel ? 'none' : 'block')};
    label {
      font-family: 'Avenir Medium', sans-serif;
    }
  }
`

export default makeSpannable(FormikField)
