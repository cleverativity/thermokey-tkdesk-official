import { Row } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'
import { FieldUnitInput, FieldDecimalNumber, FieldInput } from 'Components/Field'
import { StyledButton, StyledRow } from 'Components/Styled'
import { connect, useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import React, { useEffect } from 'react'

interface AdjustCapacityProps {
  acData?: any
  condenser?: any
  onCompute?: () => void
  unitTypes: string
}

const AdjustCapacity = connect((props: AdjustCapacityProps) => {
  const { acData, condenser, onCompute, unitTypes } = props
  const formik = useFormikContext()
  const { values, setFieldValue } = formik
  const log = new ConsoleLogger(
    'Modules/Selections/thermal/ModelDetail/AdjustModule/AdjustCapacity',
  )

  const calcCapacity = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: 'Adjustment Modules (capacity)',
      variable: 'calculated_capacity',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'acData.calculatedCapacity',
    unitField: 'acData.calculatedCapacityType',
    defaultValue: 5,
    defaultUnitIds: { si: 6, ip: 8 },
  })

  const adjustCapacity = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: 'Adjustment Modules (capacity)',
      variable: 'adjusted_capacity',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'condenser.adjustedCapacity',
    unitField: 'condenser.adjustedCapacityType',
    defaultValue: 5,
    defaultUnitIds: { si: 6, ip: 8 },
  })

  // Sync acData to formik values when it changes
  useEffect(() => {
    if (acData) {
      // setFieldValue(
      //   'acData.perCapacityAdjustment',
      //   acData.perCapacityAdjustment ?? 0,
      // )
      setFieldValue('acData.fanModel', acData.fanModel ?? '')
      setFieldValue(
        'acData.calculated_capacity',
        acData.calculatedCapacity ?? 0,
      )
      setFieldValue('acData.adjusted_capacity', acData.adjustedCapacity ?? 0)
      log.info('AdjustCapacity: Synced acData to formik', { acData })
    }
  }, [acData, setFieldValue])

  // Sync condenser model when it changes
  useEffect(() => {
    if (condenser) {
      setFieldValue('acData.condenserModel', condenser.condenserModel ?? '')
    }
  }, [condenser, setFieldValue])

  log.info('AdjustCapacity.Index', acData, values)
  return (
    <>
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
          <FieldInput
            span={{ sm: 24, md: 12, lg: 12 }}
            name='acData.fanModel'
            scale={1}
            label='data.thermal.performance.capacity_field.fan_model'
            controls={true}
            disabled={true}
            style={{ height: '30px', textAlign: 'right' }}
          />

          <FieldInput
            span={{ sm: 24, md: 24, lg: 12 }}
            name='acData.condenserModel'
            scale={1}
            label='data.thermal.performance.capacity_field.condenser_model'
            controls={true}
            disabled={true}
            style={{ height: '30px', textAlign: 'right' }}
          />

          <FieldUnitInput
            span={{ sm: 24, md: 12, lg: 8 }}
            labelId='data.thermal.performance.capacity_field.calculated_capacity'
            field={calcCapacity}
            valueName='acData.calculatedCapacity'
            unitName='acData.calculatedCapacityType'
            disabled
            unitSelectWidth={128}
          />
          <FieldUnitInput
            span={{ sm: 24, md: 12, lg: 8 }}
            labelId='data.thermal.performance.capacity_field.adjusted_capacity'
            field={adjustCapacity}
            valueName='condenser.adjustedCapacity'
            unitName='condenser.adjustedCapacityType'
            disabled
            unitSelectWidth={128}
          />

          <FieldDecimalNumber
            span={{ sm: 24, md: 12, lg: 8 }}
            name='acData.perCapacityAdjustment'
            scale={1}
            label='data.thermal.performance.capacity_field.percent_capacity_adjustment'
            required
            controls={true}
            defaultValue={0}
            isPointed={true}
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
    </>
  )
})

export default AdjustCapacity
