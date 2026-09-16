import _ from 'lodash'
import { Row } from 'antd'
import { useFormikContext } from 'formik'

import { Detail, DetailNumber, DetailText } from 'Components/Detail'
import { FieldDecimalNumber } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'

const Liquid = ({ liquid }) => {
  const { values } = useFormikContext()

  const showVolumeFraction =
    _.toLower(_.get(liquid, 'type.value', '')) !== 'water'

  const tubes_pressure_drop = _.get(
    values,
    'detail_data.liquid.tubes_pressure_drop.value',
    0,
  )
  const headers_pressure_drop = _.get(
    values,
    'detail_data.liquid.headers_pressure_drop.value',
    0,
  )
  const pressure_drop = _.get(
    values,
    'detail_data.liquid.pressure_drop.value',
    0,
  )
  const total_pressure_drop = {
    value: tubes_pressure_drop + headers_pressure_drop + pressure_drop,
    unit_of_measurement: 'kPa',
  }

  return (
    <StyledCollapse defaultActiveKey={['3']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='3'
        header='ui.selections.steps.input_parameters.liquid'
      >
        <StyledRow>
          <DetailText
            span={{ sm: 24, lg: 12, xl: 4 }}
            hideLabel={false}
            // prefix='select.coils.microchannel.fluid_type.'
            name='detail_data.liquid.type'
            label='data.calculations.model_detail.fluid_c1.refrigerant'
          />
          {showVolumeFraction && (
            <FieldDecimalNumber
              span={{ sm: 24, lg: 12, xl: 5 }}
              scale={1}
              name='detail_data.liquid.volume_fraction'
              label='data.selections.input_parameters.volume_fraction'
            />
          )}
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={1}
            name='detail_data.liquid.inlet_temperature'
            label='data.selections.input_parameters.inlet_temperature'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={1}
            name='detail_data.liquid.outlet_temperature'
            label='data.selections.input_parameters.outlet_temperature'
          />
          <Detail
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            label='data.selections.input_parameters.velocity'
          >
            <Row style={{ gap: '8px' }}>
              <DetailNumber name='detail_data.liquid.velocity.min' />
              {'~'}
              <DetailNumber name='detail_data.liquid.velocity.max' />
            </Row>
          </Detail>
        </StyledRow>

        <StyledRow>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 4 }}
            scale={1}
            name='detail_data.liquid.flow_rate'
            label='data.selections.model_detail.flow_rate'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={1}
            name='detail_data.liquid.tubes_pressure_drop'
            label='data.selections.model_detail.tubes_pressure_drop'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={1}
            name='detail_data.liquid.headers_pressure_drop'
            label='data.selections.model_detail.headers_pressure_drop'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={1}
            name='detail_data.liquid.pressure_drop'
            label='data.selections.model_detail.pressure_drops'
          />
          <DetailNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={1}
            hideLabel={false}
            label='data.selections.model_detail.total_pressure_drop'
          >
            {total_pressure_drop}
          </DetailNumber>
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Liquid
