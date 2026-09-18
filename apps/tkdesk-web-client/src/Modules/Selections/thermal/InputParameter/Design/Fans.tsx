import { Col } from 'antd'
import {
  FieldCheckbox,
  FieldSwitch,
  FieldThermalSelect,
  FieldUnitInput,
} from 'Components/Field'
import { SpanIntl } from 'Components/Span'
import { StyledCollapse, StyledCollapsePanel } from 'Components/Styled'
import Row from 'Components/Styled/Row'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import React from 'react'
import { useIntl } from 'react-intl'
import rawVenFilter from 'Localization/Constants/ventilation_filter.json'

interface FansProps {
  data?: {
    fanConnection?: any[]
  }
  unitTypes: string
}

function Fans(props: FansProps) {
  const intl = useIntl()
  const { fanConnection } = props.data ?? {}
  const { values, setFieldValue } = useFormikContext<any>()
  const compactFieldStyle = { marginBottom: 0 }

  const espField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Fans',
      variable: 'esp',
    },
    values,
    setFieldValue,
    unitTypes: props.unitTypes,
    valueField: 'condenser.esp',
    unitField: 'condenser.espType',
    defaultValue: 0,
    defaultUnitIds: { si: 41, ip: 51 },
  })

  const handleErpFilter = (checked: boolean, { form, field }: any) => {
    form.setFieldValue(field.name, checked ? 'ul' : 'erp', false)
  }

  return (
    <>
      <StyledCollapse defaultActiveKey={['5']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel header='ui.thermal.panelHeader.fans' key='5'>
          <Row gutter={[24, 16]}>
            <FieldThermalSelect
              span={{ sm: 24, md: 12, lg: 6 }}
              data={fanConnection}
              name='condenser.fansConnection'
              label='data.thermal.field.fans_connection'
              defaultValue='All~50Hz'
              field='fan_connection'
              required
            />
            <FieldUnitInput
              span={{ sm: 24, md: 12, lg: 6 }}
              labelId='data.thermal.rating.esp'
              field={espField}
              valueName='condenser.esp'
              unitName='condenser.espType'
              tooltip={
                <SpanIntl value='data.selections.input_parameters.esp.tooltip' />
              }
              tooltipTrigger='click'
              unitSelectWidth={112}
            />
            <Col xs={24} flex='none'>
              <FieldCheckbox
                name='condenser.vent_filters'
                label='data.thermal.field.filters'
                options={rawVenFilter}
                unlocalizedOptionLabel
              />
            </Col>
            <Col xs={24} flex='none'>
              <p
                style={{
                  fontFamily: 'Avenir Medium, sans-serif',
                  paddingBottom: 8,
                  margin: 0,
                }}
              >
                {intl.formatMessage({
                  id: 'data.thermal.rating.erp_ul_filter',
                })}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <FieldCheckbox
                  hideLabel
                  hasFeedback={false}
                  style={compactFieldStyle}
                  name='condenser.erp_enable'
                  options={[
                    {
                      value: true,
                      label: 'data.thermal.rating.erp_enable',
                    },
                  ]}
                />
                <FieldSwitch
                  hideLabel
                  hasFeedback={false}
                  style={compactFieldStyle}
                  name='condenser.erp_filter'
                  checkedChildren='ERP'
                  unCheckedChildren='UL'
                  transformFrom={(value) => value === 'ul'}
                  overrideOnChange={handleErpFilter}
                />
              </div>
            </Col>
          </Row>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Fans
