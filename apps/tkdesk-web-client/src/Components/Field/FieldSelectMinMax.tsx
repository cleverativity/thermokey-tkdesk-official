import _ from 'lodash'
import { Col, Row } from 'antd'
import { useFormikContext } from 'formik'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { StyledRow } from 'Components/Styled'
import FieldRangeSelect from './FieldRangeSelect'

interface FieldSelectMinMaxProps {
  name: string
  label?: string | any
  options: any[]
  optionKeyPath?: string[]
  optionMessagePath?: string[]
  [key: string]: any
}

const FieldSelectMinMax = (props: FieldSelectMinMaxProps) => {
  const {
    name,
    label = 'no-value',
    span,
    options,
    required = false,
    optionKeyPath = ['key'],
    optionMessagePath = ['key'],
    ...other
  } = props

  const intl = useIntl()
  const { values } = useFormikContext<any>()

  const minPath = `${name}.min`
  const maxPath = `${name}.max`

  const getFieldValue = (fieldPath: string) => {
    const rawValue = _.get(values, fieldPath, null)
    return _.isPlainObject(rawValue) ? _.get(rawValue, 'value', null) : rawValue
  }

  const minValue = getFieldValue(minPath)
  const maxValue = getFieldValue(maxPath)

  const getOptionIndex = (value: any) =>
    _.findIndex(options, (opt) => _.get(opt, optionKeyPath) === value)

  const minIndex = _.isNil(minValue) ? -1 : getOptionIndex(minValue)
  const maxIndex = _.isNil(maxValue) ? -1 : getOptionIndex(maxValue)

  const validateMinRange = (objOrValue: any) => {
    // Only validate min field when both values are set
    if (minIndex >= 0 && maxIndex >= 0 && minIndex > maxIndex) {
      return 'data.generic.form.message.validation.number.lesserThan'
    }
    return undefined
  }

  const localLabel = intl.formatMessage({ id: label })

  return (
    <Col {...span}>
      <Row>
        {required && (
          <span style={{ color: '#ff4d4f', marginRight: '4px' }}>*</span>
        )}
        <StyledSpan>{localLabel}</StyledSpan>
      </Row>

      <StyledRow style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Col span={11} style={{ paddingRight: 0 }}>
          <FieldRangeSelect
            hideLabel
            required={required}
            name={minPath}
            options={options}
            optionKeyPath={optionKeyPath}
            optionMessagePath={optionMessagePath}
            validate={validateMinRange}
            localizationErrorValues={() => ({
              max: maxValue,
            })}
            {...other}
          />
        </Col>
        {'~'}
        <Col span={11} style={{ paddingLeft: 0 }}>
          <FieldRangeSelect
            hideLabel
            required={required}
            name={maxPath}
            options={options}
            optionKeyPath={optionKeyPath}
            optionMessagePath={optionMessagePath}
            {...other}
          />
        </Col>
      </StyledRow>
    </Col>
  )
}

const StyledSpan = styled.span`
  font-family: 'Avenir Medium', sans-serif;
  display: flex;
  align-items: center;
  font-size: 15px;
  padding-bottom: 8px;
  overflow: hidden;
`

export default FieldSelectMinMax
