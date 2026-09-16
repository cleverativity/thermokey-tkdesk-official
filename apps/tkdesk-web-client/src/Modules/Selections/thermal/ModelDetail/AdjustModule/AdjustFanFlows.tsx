import { Row } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'
import { FieldUnitInput, FieldDecimalNumber } from 'Components/Field'
import { StyledButton, StyledRow } from 'Components/Styled'
import { connect, useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import React, { useEffect } from 'react'

interface AdjustFanFlowsProps {
  affData?: any
  condenser?: any
  onCompute?: () => void
  unitTypes: string
}

const AdjustFanFlows = connect((props: AdjustFanFlowsProps) => {
  const { affData, condenser, onCompute, unitTypes } = props
  const { values, setFieldValue } = useFormikContext()
  const [stateFanFlowAdjustment, setStateFanFlowAdjustment] =
    React.useState<number>(0)
  const log = new ConsoleLogger(
    'Modules/Selections/thermal/ModelDetail/AdjustModule/AdjustFanFlows',
  )

  const minFansFlow = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: 'Adjustment Modules (fan flows)',
      variable: 'min_fan_flow_rate',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'affData.minFansFlow',
    unitField: 'affData.minFansFlowType',
    defaultValue: affData?.minFansFlow,
    defaultUnitIds: { si: 23, ip: 26 },
  })

  const maxFansFlow = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: 'Adjustment Modules (fan flows)',
      variable: 'max_fan_flow_rate',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'affData.maxFansFlow',
    unitField: 'affData.maxFansFlowType',
    defaultValue: affData?.maxFansFlow,
    defaultUnitIds: { si: 23, ip: 26 },
  })

  const adjustMinFansFlow = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: 'Adjustment Modules (fan flows)',
      variable: 'adjusted_min_fans_flow',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'affData.adjustedMinFansFlow',
    unitField: 'affData.adjustedMinFansFlowType',
    defaultValue: affData?.adjustedMinFansFlow,
    defaultUnitIds: { si: 23, ip: 26 },
  })

  const adjustMaxFansFlow = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: 'Adjustment Modules (fan flows)',
      variable: 'adjusted_max_fans_flow',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'affData.adjustedMaxFansFlow',
    unitField: 'affData.adjustedMaxFansFlowType',
    defaultValue: affData?.adjustedMaxFansFlow,
    defaultUnitIds: { si: 23, ip: 26 },
  })

  const calculFansFlow = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: 'Adjustment Modules (fan flows)',
      variable: 'calculated_fans_flow',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'affData.calculFansFlow',
    unitField: 'affData.calculFansFlowType',
    defaultValue: affData?.calculFansFlow,
    defaultUnitIds: { si: 23, ip: 26 },
  })

  const adjustedFansFlow = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: 'Adjustment Modules (fan flows)',
      variable: 'adjusted_fans_flow',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'affData.adjustedFansFlow',
    unitField: 'affData.adjustedFansFlowType',
    defaultValue: affData?.adjustedFansFlow,
    defaultUnitIds: { si: 23, ip: 26 },
  })

  // Sync affData to formik values when it changes
  useEffect(() => {
    if (affData) {
      setFieldValue('affData.minFansFlow', affData.minFansFlow ?? 0)
      setFieldValue('affData.maxFansFlow', affData.maxFansFlow ?? 0)
      setFieldValue(
        'affData.adjustedMinFansFlow',
        affData.adjustedMinFansFlow ?? 0,
      )
      setFieldValue(
        'affData.adjustedMaxFansFlow',
        affData.adjustedMaxFansFlow ?? 0,
      )
      setFieldValue('affData.calculFansFlow', affData.calculFansFlow ?? 0)
      setFieldValue('affData.adjustedFansFlow', affData.adjustedFansFlow ?? 0)
      setFieldValue('affData.fans', affData.fans ?? 0)
      setFieldValue('affData.fanModel', affData.fanModel ?? '')
      log.info('AdjustFanFlows: Synced affData to formik', { affData })
    }
  }, [affData, setFieldValue])

  log.info('AdjustFanFlows rendered', {
    affData,
    condenser,
    values,
    stateFanFlowAdjustment,
  })

  return (
    <>
      <StyledRow style={{ width: '100%' }}>
        <StyledRow
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Row
            gutter={[16, 16]}
            style={{
              width: '100%',
              paddingTop: '20px',
              paddingLeft: '20px',
            }}
          >
            <FieldUnitInput
              required
              disabled
              unitSelectWidth={128}
              span={{ sm: 12, md: 12, lg: 8 }}
              labelId='data.thermal.performance.fan_flows_field.min_fan_flow_rate'
              field={minFansFlow}
              valueName='affData.minFansFlow'
              unitName='affData.minFansFlowType'
            />
            <FieldUnitInput
              required
              disabled
              unitSelectWidth={128}
              span={{ sm: 12, md: 12, lg: 8 }}
              labelId='data.thermal.performance.fan_flows_field.max_fan_flow_rate'
              field={maxFansFlow}
              valueName='affData.maxFansFlow'
              unitName='affData.maxFansFlowType'
            />
            <FieldUnitInput
              required
              disabled
              unitSelectWidth={128}
              span={{ sm: 24, md: 24, lg: 8 }}
              labelId='data.thermal.performance.fan_flows_field.adjusted_min_fans_flow'
              field={adjustMinFansFlow}
              valueName='affData.adjustedMinFansFlow'
              unitName='affData.adjustedMinFansFlowType'
            />
          </Row>
          <Row
            gutter={[16, 16]}
            style={{
              width: '100%',
              paddingLeft: '20px',
            }}
          >
            <FieldUnitInput
              required
              disabled
              unitSelectWidth={128}
              span={{ sm: 12, md: 12, lg: 8 }}
              labelId='data.thermal.performance.fan_flows_field.adjusted_max_fans_flow'
              field={adjustMaxFansFlow}
              valueName='affData.adjustedMaxFansFlow'
              unitName='affData.adjustedMaxFansFlowType'
            />
            <FieldDecimalNumber
              span={{ sm: 12, md: 12, lg: 8 }}
              name='affData.fanFlowAdjustment'
              scale={1}
              label='data.thermal.performance.fan_flows_field.percent_fans_flow_adjustment'
              required
              controls={true}
              defaultValue={0}
              isPointed={true}
            />
            <FieldUnitInput
              required
              disabled
              unitSelectWidth={128}
              span={{ sm: 24, md: 24, lg: 8 }}
              labelId='data.thermal.performance.fan_flows_field.calculated_fans_flow'
              field={calculFansFlow}
              valueName='affData.calculFansFlow'
              unitName='affData.calculFansFlowType'
            />
          </Row>

          <Row
            gutter={[16, 16]}
            style={{
              width: '100%',
              paddingLeft: '20px',
            }}
          >
            <FieldUnitInput
              required
              disabled
              unitSelectWidth={128}
              span={{ sm: 12, md: 12, lg: 8 }}
              labelId='data.thermal.performance.fan_flows_field.adjusted_fans_flow'
              field={adjustedFansFlow}
              valueName='affData.adjustedFansFlow'
              unitName='affData.adjustedFansFlowType'
            />
            <FieldDecimalNumber
              span={{ sm: 12, md: 12, lg: 8 }}
              name='affData.fans'
              scale={1}
              label='data.thermal.performance.fan_flows_field.num_fans'
              required
              controls={true}
              defaultValue={affData?.fans}
              isPointed={true}
              disabled={true}
            />

            <FieldDecimalNumber
              span={{ sm: 24, md: 24, lg: 8 }}
              name='affData.fanModel'
              scale={1}
              label='data.thermal.performance.fan_flows_field.fan_model'
              required
              controls={true}
              defaultValue={affData?.fanModel}
              isPointed={true}
              disabled={true}
            />
          </Row>
          <Row
            gutter={[16, 16]}
            style={{
              width: '100%',
              paddingLeft: '20px',
            }}
          >
            <FieldDecimalNumber
              span={{ sm: 24, md: 24, lg: 24 }}
              name='affData.condenserModel'
              scale={1}
              label='data.thermal.performance.fan_flows_field.condenser_model'
              required
              controls={true}
              defaultValue={condenser?.condenserModel}
              isPointed={true}
              disabled={true}
            />
          </Row>

          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
                margin: '10px',
                width: '100%',
              }}
            >
              <StyledButton
                type='primary'
                id={`button.cancel`}
                label={'ui.generic.calculate'}
                onClick={onCompute}
              />
            </div>
          </>
        </StyledRow>
      </StyledRow>
    </>
  )
})

export default AdjustFanFlows
