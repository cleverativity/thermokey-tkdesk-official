import { Col } from 'antd'
import { FieldDecimalNumber, FieldSwitch } from 'Components/Field'
import { StyledCollapse, StyledCollapsePanel, StyledRow } from 'Components/Styled'
import { useFormikContext } from 'formik'
import React from 'react'

function Speed() {
  const { setFieldValue } = useFormikContext<any>()

  const handleSpeedlimitChange = (checked: boolean, { form, field }: any) => {
    setFieldValue(field.name, checked ? 'no' : 'yes', false)
  }

  return (
    <>
      <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.working_point_speed'
          key='1'
        >
          <StyledRow gutter={[8, 8]} align='bottom' style={{ paddingBottom: 0 }}>
            <Col flex='auto' style={{ minWidth: 0 }}>
              <FieldDecimalNumber
                style={{ width: '100%' }}
                name='wp.fixedSpeed'
                label='data.thermal.wp.fixedSpeed'
                showUnitAddon={false}
                required
                controls={false}
                defaultValue={10}
                isPointed={true}
                addonAfter='%'
                hasFeedback={false}
              />
            </Col>
            <Col flex='none'>
              <FieldSwitch
                name='wp.adiabatic'
                label='data.thermal.wp.adiabatic'
                checkedChildren='YES'
                unCheckedChildren='NO'
                transformFrom={(value) => value === 'no'}
                overrideOnChange={handleSpeedlimitChange}
                hasFeedback={false}
              />
            </Col>
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Speed
