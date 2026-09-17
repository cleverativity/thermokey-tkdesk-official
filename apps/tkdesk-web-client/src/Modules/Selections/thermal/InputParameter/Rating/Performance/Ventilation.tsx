import { Col } from 'antd'
import { FieldDecimalNumber, FieldSwitch } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import React, { useEffect } from 'react'

interface VentilationProps {
  unitTypes: string
}

function Ventilation(_props: VentilationProps) {
  const { values, setFieldValue } = useFormikContext<any>()

  useEffect(() => {
    if (!values?.rating?.fanSpeed?.unit) {
      setFieldValue('rating.fanSpeed.unit', '%', false)
    }
  }, [])

  const fieldColStyle: React.CSSProperties = {
    minWidth: 0,
    maxWidth: '100%',
  }
  const handleFanSpeedChange = (checked: boolean, { form, field }: any) => {
    setFieldValue(field.name, checked ? '%' : 'rpm', false)
    setFieldValue('rating.fanSpeed.value', checked ? 100 : 0, false)
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
                name='rating.fanSpeed.unit'
                label='data.thermal.rating.fan_speed'
                checkedChildren='%'
                unCheckedChildren='RPM'
                transformFrom={(value) => value === '%'}
                overrideOnChange={handleFanSpeedChange}
              />
            </Col>
            <Col flex='auto' style={fieldColStyle}>
              <FieldDecimalNumber
                style={{ width: '100%' }}
                name='rating.fanSpeed.value'
                showUnitAddon={false}
                hideLabel
                hasFeedback={false}
                controls={false}
                defaultValue={100}
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
