import { FieldRangeSelect } from './index'
import _ from 'lodash'
import { useIntl } from 'react-intl'
import flowDirectionData from 'Localization/Constants/flow_direction.json'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { ConsoleLogger } from 'aws-amplify/utils'

const FieldThermalSelect = (props: {
  name: string
  mode?: string
  label: string
  required?: boolean
  disabled?: boolean
  overrideOnChange?: any
  span?:
    | number
    | {
        xs?: number
        sm?: number
        md?: number
        lg?: number
        xl?: number
        xxl?: number
      }

  data?: any
  field?: string
  useFlowDirection?: boolean
  defaultValue?: any
}) => {
  const {
    name,
    mode,
    label,
    required,
    disabled,
    span,
    data,
    overrideOnChange,
    field,
    useFlowDirection = false,
    defaultValue,
  } = props

  const formik = useFormikContext()

  const intl = useIntl()

  const log = new ConsoleLogger('src/Components/Field/FieldThermalSelect')
  // Get current locale and map it to ITA or ENG
  const locale = intl.locale || 'en'
  const currentLocale = locale.startsWith('it') ? 'ITA' : 'ENG'

  // Transform flow direction data to have the right structure
  const transformedFlowData = useFlowDirection
    ? flowDirectionData.map((item) => ({
        key: item.key,
        value: item.key,
        label: item[currentLocale as keyof typeof item],
      }))
    : null

  // Use transformed data if enabled, otherwise use provided data
  const optionsData = useFlowDirection ? transformedFlowData : data

  useEffect(() => {
    if (defaultValue) {
      formik.setFieldValue(name, defaultValue)
    }
  }, [defaultValue])

  return (
    <FieldRangeSelect
      optionKeyPath={useFlowDirection ? ['key'] : [field || 'key']}
      optionMessagePath={useFlowDirection ? ['label'] : [field || 'key']}
      mode={mode}
      required={required}
      disabled={disabled}
      label={label}
      span={span}
      name={name}
      options={optionsData}
      defaultValue={defaultValue}
      // overrideOnChange={!_.isNil(overrideOnChange) ? overrideOnChange : null}
      overrideOnChange={(value: any, { field, form }: any) => {
        const { setFieldValue } = form
        const { name } = field

        log.info('FieldThermalSelect overrideOnChange', {
          value,
          name,
        })
        setFieldValue(`${name}`, value)

        // Call the external overrideOnChange if provided
        if (!_.isNil(overrideOnChange)) {
          overrideOnChange(value, { field, form })
        }
      }}
      {..._.omit(props, ['overrideOnChange'])}
      unlocalizeMessage={true}
    />
  )
}

export default FieldThermalSelect
