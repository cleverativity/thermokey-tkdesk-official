import { Col } from 'antd'
import { FieldUnitInput, FieldDecimalNumber } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useUnitMeasureField } from '../../../units/shared/variableUnitField'

const CAPACITY_UNITS_QUERY = {
  product: 'condenser' as const,
  step: 'Input parameters',
  section: 'Performance',
  variable: 'capacity',
}

const ToleranceLabel = styled.p`
  font-family: 'Avenir Medium', sans-serif;
  font-size: 15px;
  line-height: 22px;
  margin-bottom: 8px;
`

const ToleranceRange = styled(StyledRow)`
  flex-wrap: nowrap;
  align-items: center;

  .ant-form-item {
    margin-bottom: 0;
  }

  .ant-form-item-explain,
  .ant-form-item-extra,
  .ant-form-item-additional {
    display: none;
  }
`

const ToleranceSeparator = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  line-height: 32px;
  padding: 0 4px;
  flex: none;
`

interface PerformanceProps {
  data?: any
  unitTypes?: string
}

function Performance(props: PerformanceProps) {
  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext<any>()

  const capacityField = useUnitMeasureField({
    query: CAPACITY_UNITS_QUERY,
    values,
    setFieldValue,
    unitTypes: props.unitTypes,
    valueField: 'condenser.thermalCapacity',
    unitField: 'condenser.thermalCapacityType',
    extraUnitFields: ['condenser.capacity_unit'],
    defaultValue: 50,
    defaultUnitIds: { si: 6, ip: 8 },
    baseField: 'condenser.thermalCapacityBaseW',
  })

  return (
    <>
      <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.performance'
          key='1'
        >
          <StyledRow gutter={[16, 16]}>
            <FieldUnitInput
              span={{ sm: 24, lg: 12, xl: 7 }}
              labelId='data.thermal.field.thermalCapacity'
              field={capacityField}
              valueName='condenser.thermalCapacity'
              unitName='condenser.thermalCapacityType'
              required
              unitSelectWidth={128}
            />
            <Col xs={24} sm={24} md={24} lg={6}>
              <ToleranceLabel>
                <span style={{ color: '#ff4d4f' }}>* </span>
                {intl.formatMessage({ id: 'data.thermal.field.tolerance' })}
              </ToleranceLabel>
              <ToleranceRange gutter={8}>
                <Col flex='auto' style={{ minWidth: 0 }}>
                  <FieldDecimalNumber
                    style={{ width: '100%' }}
                    name='condenser.toleranceMin'
                    hideLabel
                    required
                    hasFeedback={false}
                    controls={false}
                    defaultValue={-10}
                    scale={2}
                    min={-100}
                    max={0}
                    isPointed={true}
                    addonAfter='%'
                  />
                </Col>
                <ToleranceSeparator>~</ToleranceSeparator>
                <Col flex='auto' style={{ minWidth: 0 }}>
                  <FieldDecimalNumber
                    style={{ width: '100%' }}
                    name='condenser.toleranceMax'
                    hideLabel
                    required
                    hasFeedback={false}
                    controls={false}
                    defaultValue={10}
                    scale={2}
                    min={0}
                    max={100}
                    isPointed={true}
                    addonAfter='%'
                  />
                </Col>
              </ToleranceRange>
            </Col>
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Performance
