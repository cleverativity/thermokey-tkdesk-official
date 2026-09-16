import { Col } from 'antd'
import {
  FieldCheckbox,
  FieldSwitch,
  FieldThermalSelect,
} from 'Components/Field'
import { StyledCollapse, StyledCollapsePanel } from 'Components/Styled'
import Row from 'Components/Styled/Row'
import React from 'react'
import { useIntl } from 'react-intl'
import rawVenFilter from 'Localization/Constants/ventilation_filter.json'

interface FansProps {
  data?: {
    fanConnection?: any[]
  }
}

function Fans(props: FansProps) {
  const intl = useIntl()
  const { fanConnection } = props.data
  const compactFieldStyle = { marginBottom: 0 }

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
