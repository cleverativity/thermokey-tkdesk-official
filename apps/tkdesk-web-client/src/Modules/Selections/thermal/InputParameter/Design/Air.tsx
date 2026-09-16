import {
  FieldUnitInput,
  FieldDecimalNumber,
  FieldThermalSelect,
} from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'

interface AirProps {
  OnChangeRelHumidity: (value: number) => void
  OnChangeAltitude: (value: number) => void
  unitTypes: string
}

function Air({ OnChangeRelHumidity, OnChangeAltitude, unitTypes }: AirProps) {
  const { values, setFieldValue } = useFormikContext<any>()

  const dryBulbField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Air',
      variable: 'drybulb',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'condenser.dryBulb',
    unitField: 'condenser.dryBulbType',
    extraUnitFields: ['condenser.dryBulb_unit'],
    defaultValue: 25,
    defaultUnitIds: { si: 32, ip: 33 },
  })

  const atmosphericField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Air',
      variable: 'atmospheric_pressure',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'condenser.atmosphericPress',
    unitField: 'condenser.atmosphericPressType',
    extraUnitFields: ['condenser.atmosphericPress_unit'],
    defaultValue: 101.35,
    defaultUnitIds: null,
  })

  const altitudeField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Air',
      variable: 'altitude',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'condenser.altitude',
    unitField: 'condenser.altitudeType',
    extraUnitFields: ['condenser.altitude_unit'],
    defaultValue: 0,
    defaultUnitIds: { si: 1, ip: 3 },
  })

  return (
    <>
      <StyledCollapse defaultActiveKey={['2']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel header='ui.thermal.panelHeader.air' key='2'>
          <StyledRow gutter={[16, 16]}>
            <FieldUnitInput
              span={{ sm: 24, md: 12, lg: 5 }}
              labelId='data.thermal.field.dry_bulb'
              field={dryBulbField}
              valueName='condenser.dryBulb'
              unitName='condenser.dryBulbType'
              required
            />

            <FieldDecimalNumber
              span={{ sm: 24, md: 12, lg: 5 }}
              name='condenser.relHumidity'
              scale={1}
              label='data.thermal.field.rel_humidity'
              required
              isPointed={true}
              overrideOnChange={OnChangeRelHumidity}
              defaultValue={50}
              hasFeedback={false}
              controls={false}
            />

            <FieldUnitInput
              span={{ sm: 24, md: 12, lg: 5 }}
              labelId='data.thermal.field.atmospheric'
              field={atmosphericField}
              valueName='condenser.atmosphericPress'
              unitName='condenser.atmosphericPressType'
              required
            />

            <FieldThermalSelect
              span={{ sm: 24, md: 12, lg: 5 }}
              name='condenser.airFlowDirection'
              label='data.thermal.field.air_flow_direction'
              defaultValue='Vertical'
              useFlowDirection={true}
              field='key'
              required
            />

            <FieldUnitInput
              span={{ sm: 24, md: 12, lg: 4 }}
              labelId='data.thermal.field.altitude'
              field={altitudeField}
              valueName='condenser.altitude'
              unitName='condenser.altitudeType'
              required
            />
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Air
