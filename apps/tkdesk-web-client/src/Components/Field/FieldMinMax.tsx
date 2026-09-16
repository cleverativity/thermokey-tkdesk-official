import _ from 'lodash'
import { Col, Row } from 'antd'
import { useFormikContext } from 'formik'
import { useIntl } from 'react-intl'

import { StyledRow } from 'Components/Styled'
import FieldDecimalNumber from './FieldDecimalNumber'
import styled from 'styled-components'

interface FieldMinMaxProps {
  name: string
  label?: string | any
  isRange?: boolean
  [key: string]: any
}

const FieldMinMax = (props: FieldMinMaxProps) => {
  const {
    name,
    label = 'no-value',
    span,
    scale = 2,
    isRange = false,
    required = false,
  } = props

  const intl = useIntl()
  const { values } = useFormikContext<any>()

  const minPath = `${name}.${isRange ? 'from' : 'min'}`
  const maxPath = `${name}.${isRange ? 'to' : 'max'}`

  const getNumericValue = (fieldPath: string) => {
    const rawValue = _.get(values, fieldPath, null)
    const value = _.isPlainObject(rawValue)
      ? _.get(rawValue, 'value')
      : rawValue

    if (_.isNil(value) || _.isEmpty(value)) {
      return null
    }

    const n = Number(value)
    return Number.isFinite(n) ? n : null
  }

  const minValue = getNumericValue(minPath)
  const maxValue = getNumericValue(maxPath)

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
          <FieldDecimalNumber
            hideLabel
            required={required}
            name={minPath}
            scale={scale}
            max={maxValue}
          />
        </Col>
        {'~'}
        <Col span={11} style={{ paddingLeft: 0 }}>
          <FieldDecimalNumber
            hideLabel
            required={required}
            name={maxPath}
            scale={scale}
            min={minValue}
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

export default FieldMinMax
