import {
  FieldDecimalNumber,
  FieldUnitInput,
} from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import React from 'react'

interface AirProps {
  unitTypes: string
}

function Air(props: AirProps) {
  const { unitTypes } = props
  const { values, setFieldValue } = useFormikContext<any>()
  const twoColSpan = { xs: 24, sm: 12 }

  const airInletTemp = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Rating',
      section: 'Air',
      variable: 'airInletTemp',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'rating.dryBulb',
    unitField: 'rating.dryBulbType',
    defaultValue: 35,
    defaultUnitIds: { si: 32, ip: 33 },
  })

  const altitude = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Rating',
      section: 'Air',
      variable: 'altitude',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'rating.altitude',
    unitField: 'rating.altitudeType',
    defaultValue: 0,
    defaultUnitIds: { si: 1, ip: 3 },
  })

  return (
    <StyledCollapse defaultActiveKey={['2']} style={{ marginBottom: '20px' }}>
      <StyledCollapsePanel header='ui.thermal.panelHeader.rating_air' key='2'>
        <StyledRow gutter={[16, 16]} align='top'>
          <FieldUnitInput
            span={twoColSpan}
            labelId='data.thermal.rating.airInletTemp'
            field={airInletTemp}
            valueName='rating.dryBulb'
            unitName='rating.dryBulbType'
            required
          />

          <FieldDecimalNumber
            span={twoColSpan}
            name='rating.relHumidity'
            label='data.thermal.rating.rel_humidity'
            scale={1}
            defaultValue={50}
            required
            hasFeedback={false}
            controls={false}
            isPointed={true}
            addonAfter='%'
          />

          <FieldUnitInput
            span={{ xs: 24 }}
            labelId='data.thermal.rating.altitude'
            field={altitude}
            valueName='rating.altitude'
            unitName='rating.altitudeType'
            required
          />
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Air
