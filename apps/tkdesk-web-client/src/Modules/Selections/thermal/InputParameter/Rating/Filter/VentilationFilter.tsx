import { Col } from 'antd'
import { FieldSwitch, FieldThermalSelect } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import rawDiameter from 'Localization/Constants/rating_diameter.json'
import rawFanBrand from 'Localization/Constants/rating_fan_brand.json'
import rawNoiseClass from 'Localization/Constants/rating_noise_class.json'
import React from 'react'

function VentilationFilter() {
  const twoColSpan = { xs: 24, sm: 12 }
  const handleFanTypeChange = (checked: boolean, { form, field }: any) => {
    form.setFieldValue(field.name, checked ? 'ec' : 'ac', false)
  }

  return (
    <>
      <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.rating_ventilation_filter'
          key='1'
        >
          <StyledRow gutter={[8, 8]}>
            <FieldThermalSelect
              span={twoColSpan}
              data={rawDiameter}
              name='rating.diameter'
              label='data.thermal.rating.diameter'
              field='value'
              defaultValue='All'
              required
            />
            <FieldThermalSelect
              span={twoColSpan}
              data={rawFanBrand.condenser}
              name='rating.brand'
              label='data.thermal.rating.brand'
              field='value'
              defaultValue='All'
              required
            />
            <FieldThermalSelect
              span={twoColSpan}
              data={rawNoiseClass}
              name='rating.noise_class'
              label='data.thermal.rating.noise_class'
              field='value'
              defaultValue='All'
              required
            />
            <Col {...twoColSpan}>
              <FieldSwitch
                hasFeedback={false}
                name='rating.fan_type'
                label='data.thermal.rating.fan_type'
                checkedChildren='AC'
                unCheckedChildren='EC'
                transformFrom={(value) => value === 'ec'}
                overrideOnChange={handleFanTypeChange}
              />
            </Col>
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default VentilationFilter
