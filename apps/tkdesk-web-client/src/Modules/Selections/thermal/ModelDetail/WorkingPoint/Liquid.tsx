import { Col } from 'antd'
import { FieldRadio, FieldUnitInput } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import _ from 'lodash'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

interface LiquidProps {
  unitTypes: string
}

const RadioMode = styled(FieldRadio)`
  margin-bottom: 0 !important;

  &.ant-form-item,
  .ant-form-item {
    margin-bottom: 0 !important;
  }

  .ant-form-item-explain,
  .ant-form-item-extra,
  .ant-form-item-additional {
    display: none;
  }

  .ant-form-item-row,
  .ant-form-item-control,
  .ant-form-item-control-input {
    min-height: 0 !important;
  }

  .ant-form-item-control-input-content {
    line-height: 22px;
  }

  .ant-radio-group {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .ant-radio-wrapper {
    margin-inline-end: 0 !important;
    align-items: center;
    font-family: 'Avenir Medium', sans-serif;
    font-size: 15px;
    line-height: 22px;
  }

  label {
    min-width: 0 !important;
    height: auto !important;
    padding: 0 !important;
  }
`

const FieldLabel = styled.div`
  display: flex;
  align-items: center;
  min-height: 26px;
  margin-bottom: 4px;
`

function Liquid(props: LiquidProps) {
  const intl = useIntl()
  const { unitTypes } = props
  const { values, setFieldValue } = useFormikContext<any>()

  const liquidMode =
    _.get(values, 'wp.liquidOutletTempMode') || 'liquid_outlet_temp'
  const isLiquidOutlet = liquidMode === 'liquid_outlet_temp'

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Avenir Medium, sans serif',
    paddingBottom: 0,
    marginBottom: 0,
    lineHeight: '22px',
  }
  const fieldColStyle: React.CSSProperties = {
    minWidth: 0,
    maxWidth: '100%',
  }
  const oneColSpan = { xs: 24 }
  const twoColSpan = { xs: 12 }

  const liquidInletTemp = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Working point',
      section: 'Working Point (liquid)',
      variable: 'liquidInletTemp',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'wp.liquidInletTemp',
    unitField: 'wp.liquidInletTempType',
    defaultUnitIds: { si: 32, ip: 33 },
  })
  const liquidOutletTemp = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Working point',
      section: 'Working Point (liquid)',
      variable: 'liquidOutletTemp',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'wp.liquidOutletTemp',
    unitField: 'wp.liquidOutletTempType',
    defaultUnitIds: { si: 32, ip: 33 },
    enabled: isLiquidOutlet,
  })

  const liquidFlowRateField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Working point',
      section: 'Working Point (liquid)',
      variable: 'liquidFlowRate',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'wp.liquidFlowRate',
    unitField: 'wp.liquidFlowRateType',
    defaultValue: 1,
    defaultUnitIds: { si: 152, ip: 156 },
    baseField: 'wp.liquidFlowRateBaseM3h',
    enabled: !isLiquidOutlet,
  })

  const handleLiquidModeChange = (e: any, formik: any) => {
    const mode = e.target.value
    formik.setFieldValue('wp.liquidOutletTempMode', mode)
    formik.setFieldValue(
      mode === 'liquid_outlet_temp'
        ? 'wp.liquidFlowRate'
        : 'wp.liquidOutletTemp',
      null,
    )
  }

  return (
    <>
      <StyledCollapse defaultActiveKey={['2']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.working_point_liquid'
          key='2'
        >
          <StyledRow gutter={[16, 16]} align='top'>
            <Col {...oneColSpan} style={fieldColStyle}>
              <FieldLabel>
                <p style={labelStyle}>
                  <span style={{ color: '#ff4d4f' }}>* </span>
                  {intl.formatMessage({
                    id: 'data.thermal.wp.liquidInletTemp',
                  })}
                </p>
              </FieldLabel>
              <FieldUnitInput
                field={liquidInletTemp}
                valueName='wp.liquidInletTemp'
                unitName='wp.liquidInletTempType'
                required
                unitSelectWidth={128}
              />
            </Col>
            <Col {...twoColSpan} style={fieldColStyle}>
              <FieldLabel>
                <RadioMode
                  name='wp.liquidOutletTempMode'
                  hideLabel
                  hasFeedback={false}
                  defaultValue='liquid_outlet_temp'
                  options={[
                    {
                      label: 'data.thermal.wp.liquidOutletTemp',
                      value: 'liquid_outlet_temp',
                    },
                  ]}
                  onChange={handleLiquidModeChange}
                />
              </FieldLabel>
              <FieldUnitInput
                field={liquidOutletTemp}
                valueName='wp.liquidOutletTemp'
                unitName='wp.liquidOutletTempType'
                required={isLiquidOutlet}
                disabled={!isLiquidOutlet}
                unitSelectWidth={128}
              />
            </Col>
            <Col {...twoColSpan} style={fieldColStyle}>
              <FieldLabel>
                <RadioMode
                  name='wp.liquidOutletTempMode'
                  hideLabel
                  hasFeedback={false}
                  defaultValue='liquid_outlet_temp'
                  options={[
                    {
                      label: 'data.thermal.wp.liquidFlowRate',
                      value: 'liquid_flow_rate',
                    },
                  ]}
                  onChange={handleLiquidModeChange}
                />
              </FieldLabel>
              <FieldUnitInput
                field={liquidFlowRateField}
                valueName='wp.liquidFlowRate'
                unitName='wp.liquidFlowRateType'
                required={!isLiquidOutlet}
                disabled={isLiquidOutlet}
                unitSelectWidth={128}
              />
            </Col>
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Liquid
