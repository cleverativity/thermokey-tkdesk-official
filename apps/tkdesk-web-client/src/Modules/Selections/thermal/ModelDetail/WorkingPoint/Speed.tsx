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
import styled from 'styled-components'

interface SpeedProps {
  unitTypes: string
}

const RADIO_COL_WIDTH = 160

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

  .ant-radio-wrapper {
    margin-inline-end: 0 !important;
    white-space: nowrap;
    width: 100%;
  }

  label {
    min-width: 0 !important;
    height: auto !important;
    padding: 0 !important;
  }
`

function Speed(props: SpeedProps) {
  const { unitTypes } = props
  const { values, setFieldValue } = useFormikContext<any>()
  const isFixedCapacity = _.get(values, 'wp.speedMode') === 'fixed_capacity'

  const fixedCapacity = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Working point',
      section: 'Working Point (speed)',
      variable: 'capacity',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'wp.fixedCapacity',
    unitField: 'wp.fixedCapacityType',
    extraUnitFields: ['wp.fixedCapacity_unit'],
    defaultValue: 50,
    defaultUnitIds: { si: 6, ip: 8 },
    enabled: isFixedCapacity,
  })

  const handleSpeedModeChange = (e: any, formik: any) => {
    formik.setFieldValue('wp.speedMode', e.target.value)
  }

  return (
    <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '20px' }}>
      <StyledCollapsePanel
        header='ui.thermal.panelHeader.working_point_speed'
        key='1'
      >
        <StyledRow gutter={[8, 12]} align='middle'>
          <Col
            flex={`0 0 ${RADIO_COL_WIDTH}px`}
            style={{ width: RADIO_COL_WIDTH }}
          >
            <RadioMode
              name='wp.speedMode'
              hideLabel
              hasFeedback={false}
              defaultValue='fixed_speed'
              options={[
                {
                  label: 'data.thermal.wp.fixedCapacity',
                  value: 'fixed_capacity',
                },
              ]}
              onChange={handleSpeedModeChange}
            />
          </Col>
          <Col flex='auto' style={{ minWidth: 0 }}>
            <FieldUnitInput
              field={fixedCapacity}
              valueName='wp.fixedCapacity'
              unitName='wp.fixedCapacityType'
              required={isFixedCapacity}
              disabled={!isFixedCapacity}
              unitSelectWidth={72}
            />
          </Col>
        </StyledRow>
        <StyledRow gutter={[8, 12]} align='middle' style={{ marginTop: 12 }}>
          <Col
            flex={`0 0 ${RADIO_COL_WIDTH}px`}
            style={{ width: RADIO_COL_WIDTH }}
          >
            <RadioMode
              name='wp.speedMode'
              hideLabel
              hasFeedback={false}
              defaultValue='fixed_speed'
              options={[
                {
                  label: 'data.thermal.wp.fixedSpeed',
                  value: 'fixed_speed',
                },
              ]}
              onChange={handleSpeedModeChange}
            />
          </Col>
          <Col flex='auto' style={{ minWidth: 0 }}>
            <FieldDecimalNumber
              style={{ width: '100%' }}
              name='wp.fixedSpeed'
              showUnitAddon={false}
              required={!isFixedCapacity}
              disabled={isFixedCapacity}
              hideLabel
              hasFeedback={false}
              controls={false}
              defaultValue={100}
              isPointed={true}
              addonAfter='%'
            />
          </Col>
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Speed
