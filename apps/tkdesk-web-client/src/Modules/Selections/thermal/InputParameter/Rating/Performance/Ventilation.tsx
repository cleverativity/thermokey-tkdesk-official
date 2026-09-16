import { Col } from 'antd'
import { FieldDecimalNumber, FieldSwitch } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import React from 'react'

interface VentilationProps {
  unitTypes: string
}

function Ventilation(_props: VentilationProps) {
  const { setFieldValue } = useFormikContext<any>()

  const fieldColStyle: React.CSSProperties = {
    minWidth: 0,
    maxWidth: '100%',
  }
  const handleFanSpeedChange = (checked: boolean, { form, field }: any) => {
    setFieldValue(field.name, checked ? 'rpm' : '%', false)
    setFieldValue('rating.fan_speed_value', checked ? 0 : 100, false)
  }

  return (
    <>
      <StyledCollapse defaultActiveKey={['4']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.rating_ventilation'
          key='4'
        >
          <StyledRow gutter={[16, 16]} align='bottom'>
            <Col flex='none'>
              <FieldSwitch
                name='rating.fan_speed'
                label='data.thermal.rating.fan_speed'
                checkedChildren='%'
                unCheckedChildren='RPM'
                transformFrom={(value) => value === 'rpm'}
                overrideOnChange={handleFanSpeedChange}
              />
            </Col>
            <Col flex='auto' style={fieldColStyle}>
              <FieldDecimalNumber
                style={{ width: '100%' }}
                name='rating.fan_speed_value'
                showUnitAddon={false}
                hideLabel
                hasFeedback={false}
                controls={false}
                defaultValue={10}
                isPointed={true}
                addonAfter='%'
                disabled
              />
            </Col>
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Ventilation
