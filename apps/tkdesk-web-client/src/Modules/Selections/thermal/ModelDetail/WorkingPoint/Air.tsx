import { Col } from 'antd'
import {
  FieldDecimalNumber,
  FieldRadio,
  FieldUnitInput,
} from 'Components/Field'
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

interface AirProps {
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

function Air(props: AirProps) {
  const intl = useIntl()
  const { unitTypes } = props
  const { values, setFieldValue } = useFormikContext<any>()

  const isHumidity =
    (_.get(values, 'wp.humidityMode') || 'humidity') === 'humidity'

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

  const airInletTemp = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Working point',
      section: 'Working Point (air)',
      variable: 'airInletTemp',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'wp.airInletTemp',
    unitField: 'wp.airInletTempType',
    defaultUnitIds: { si: 32, ip: 33 },
  })

  const wetBulb = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Working point',
      section: 'Working Point (air)',
      variable: 'wetBulb',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'wp.wetBulb',
    unitField: 'wp.wetBulbType',
    defaultValue: 17.9,
    defaultUnitIds: { si: 32, ip: 33 },
    enabled: !isHumidity,
  })

  const handleHumidityModeChange = (e: any, formik: any) => {
    const mode = e.target.value
    formik.setFieldValue('wp.humidityMode', mode)
    formik.setFieldValue(
      mode === 'humidity' ? 'wp.wetBulb' : 'wp.relHumidity',
      null,
    )
  }

  return (
    <>
      <StyledCollapse defaultActiveKey={['2']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.working_point_air'
          key='2'
        >
          <StyledRow gutter={[16, 16]} align='top'>
            <Col {...oneColSpan} style={fieldColStyle}>
              <FieldLabel>
                <p style={labelStyle}>
                  <span style={{ color: '#ff4d4f' }}>* </span>
                  {intl.formatMessage({
                    id: 'data.thermal.wp.airInletTemp',
                  })}
                </p>
              </FieldLabel>
              <FieldUnitInput
                field={airInletTemp}
                valueName='wp.airInletTemp'
                unitName='wp.airInletTempType'
                required
                unitSelectWidth={128}
              />
            </Col>
            <Col {...twoColSpan} style={fieldColStyle}>
              <FieldLabel>
                <RadioMode
                  name='wp.humidityMode'
                  hideLabel
                  hasFeedback={false}
                  defaultValue='humidity'
                  options={[
                    {
                      label: 'data.thermal.wp.rel_humidity',
                      value: 'humidity',
                    },
                  ]}
                  onChange={handleHumidityModeChange}
                />
              </FieldLabel>
              <FieldDecimalNumber
                style={{ width: '100%' }}
                name='wp.relHumidity'
                scale={1}
                defaultValue={50}
                required={isHumidity}
                disabled={!isHumidity}
                hideLabel
                hasFeedback={false}
                controls={false}
                isPointed={true}
                addonAfter='%'
              />
            </Col>
            <Col {...twoColSpan} style={fieldColStyle}>
              <FieldLabel>
                <RadioMode
                  name='wp.humidityMode'
                  hideLabel
                  hasFeedback={false}
                  defaultValue='humidity'
                  options={[
                    {
                      label: 'data.thermal.wp.wetBulb',
                      value: 'wetBulb',
                    },
                  ]}
                  onChange={handleHumidityModeChange}
                />
              </FieldLabel>
              <FieldUnitInput
                field={wetBulb}
                valueName='wp.wetBulb'
                unitName='wp.wetBulbType'
                required={!isHumidity}
                disabled={isHumidity}
                unitSelectWidth={128}
              />
            </Col>
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Air
