import { DetailNumber } from 'Components/Detail'
import { FieldDecimalNumber } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'

const Air = () => {
  return (
    <StyledCollapse defaultActiveKey={['2']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='2'
        header='ui.selections.steps.input_parameters.air'
      >
        <StyledRow style={{ marginBottom: '24px' }}>
          <DetailNumber
            span={{ sm: 24, md: 12, lg: 4 }}
            hideLabel={false}
            scale={1}
            name='detail_data.air.inlet_temperature'
            label='data.calculations.model_detail.inlet_temperature_air'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={1}
            name='detail_data.air.outlet_temperature'
            label='data.calculations.model_detail.outlet_temperature_air'
          />
          <DetailNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            scale={0}
            name='detail_data.air.inlet_humidity'
            label='data.selections.model_detail.inlet_air_humidity'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={0}
            name='detail_data.air.outlet_humidity'
            label='data.selections.model_detail.outlet_air_humidity'
          />
          <DetailNumber
            span={{ sm: 24, md: 12, lg: 5 }}
            scale={0}
            hideLabel={false}
            name='detail_data.air.altitude'
            label='data.calculations.model_detail.altitude'
          />
        </StyledRow>

        <StyledRow>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 4 }}
            scale={0}
            name='detail_data.air.flow_rate'
            label='data.selections.model_detail.air_flow_rate'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='detail_data.air.velocity'
            label='data.selections.model_detail.velocity'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={1}
            name='detail_data.air.pressure_drop'
            label='data.calculations.model_detail.ad_pressure_drops_air'
          />
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Air
