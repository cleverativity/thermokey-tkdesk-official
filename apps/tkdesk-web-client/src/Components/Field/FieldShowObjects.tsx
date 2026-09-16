import { Input } from 'antd'
import { FormikItem } from 'Components/Formik'
import { useFormikContext } from 'formik'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

const { TextArea } = Input

interface FieldShowObjectsProps {
  name: string
  [key: string]: any
}

const FieldShowObjects = (props: FieldShowObjectsProps) => {
  const { name, ...other } = props

  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext()

  const value = _.get(values, name)

  const [localValue, setLocalValue] = useState(() =>
    JSON.stringify(value, null, 2),
  )
  const [localError, setLocalError] = useState<string | null>(null)

  useEffect(() => {
    const newValue = JSON.stringify(value, null, 2)
    if (newValue !== localValue) {
      setLocalValue(newValue)
      setLocalError(null)
    }
  }, [value])

  const handleChange = (e: any) => {
    const newText = e.target.value
    setLocalValue(newText)

    try {
      const parsed = JSON.parse(newText)
      setLocalError(null)
      setFieldValue(name, parsed)
    } catch {
      setLocalError(intl.formatMessage({ id: 'ui.generic.invalid_json' }))
    }
  }

  return (
    <FormikItem
      name={name}
      help={localError}
      validateStatus={localError ? 'error' : undefined}
      {...other}
    >
      <TextArea
        value={localValue}
        onChange={handleChange}
        autoSize={{ minRows: 4, maxRows: 10 }}
      />
    </FormikItem>
  )
}

export default FieldShowObjects
