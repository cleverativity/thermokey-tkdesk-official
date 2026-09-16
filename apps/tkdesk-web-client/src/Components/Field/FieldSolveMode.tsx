import _ from 'lodash'

import { Radio, Tooltip } from 'antd'
import { FormikField } from 'Components/Formik'
import { StyledRadioGroup } from 'Components/Styled'
import { useIntl } from 'react-intl'
import { useFormikContext } from 'formik'

// TODO rimuovere questo componente ed utilizarre fieldRadio
interface FieldSolveModeProps {
  name: string
  options: {
    label: string
    value: string | boolean | number
  }[]
  tooltip?: string
  required?: boolean
  disabled?: boolean
  onChange?: () => void
  defaultValue?: string | boolean | number
}

const FieldSolveMode = (props: FieldSolveModeProps) => {
  const {
    name,
    options,
    tooltip,
    required = true,
    disabled = false,
    onChange,
    defaultValue,
  } = props

  const formikContext = useFormikContext()
  const intl = useIntl()

  const formikFieldComponent = (
    <FormikField
      disableCustomOnChange
      required={required}
      hideRequired
      disabled={disabled}
      name={name}
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 0,
      }}
      component={StyledRadioGroup}
      hasFeedback={false}
      hideLabel
      options={options}
      onChange={onChange}
      defaultValue={defaultValue}
      selectedValue={_.get(formikContext.values, name, null)}
    >
      <Radio
        onChange={onChange}
        value={_.get(formikContext.values, name, null)}
      />
    </FormikField>
  )

  return (
    <>
      {tooltip ? (
        <Tooltip
          title={_.map(options, (e: string) => {
            const label = _.get(e, 'label', '')
            const value = _.get(e, 'value', '')

            return (
              <p>
                {label}
                <ul>
                  <li key={`${value}_input`} style={{ color: '#ffffff' }}>
                    {intl.formatMessage({
                      id: `${tooltip}.${value}_in`,
                    })}
                  </li>
                  <li key={`${value}_output`} style={{ color: '#ffffff' }}>
                    {intl.formatMessage({
                      id: `${tooltip}.${value}_out`,
                    })}
                  </li>
                </ul>
              </p>
            )
          })}
        >
          {formikFieldComponent}
        </Tooltip>
      ) : (
        formikFieldComponent
      )}
    </>
  )
}

export default FieldSolveMode
