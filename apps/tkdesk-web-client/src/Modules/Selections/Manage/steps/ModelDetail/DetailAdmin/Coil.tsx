import { Row } from 'antd'
import { Detail, DetailNumber, DetailText } from 'Components/Detail'
import { FieldDecimalNumber } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'

const Coil = () => {
  return (
    <StyledCollapse defaultActiveKey={['7']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='7'
        header='ui.selections.steps.input_parameters.coil'
      >
        <StyledRow style={{ marginBottom: '24px' }}>
          <DetailText
            span={{ sm: 24, lg: 12, xl: 4 }}
            hideLabel={false}
            name='detail_data.coil.code'
            label='data.selections.model_detail.model_code'
          />
          <DetailText
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            name='detail_data.coil.fin_material'
            label='data.calculations.model_detail.material.cooling_fins'
          />
          <DetailText
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            name='detail_data.coil.fin_type'
            label='data.calculations.model_detail.fin_type'
          />
          <DetailText
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            name='detail_data.coil.tube_material'
            label='data.selections.input_parameters.tube_material'
          />
          <DetailText
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            name='detail_data.coil.tube_type'
            label='data.selections.model_detail.tube_type'
          />
        </StyledRow>

        <StyledRow>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 4 }}
            name='detail_data.coil.fin_spacing'
            label='data.selections.model_detail.fin_spacing'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='detail_data.coil.fin_pitch'
            label='data.selections.model_detail.fin_pitch'
          />
          <Detail
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            label='data.selections.model_detail.steps_rows'
          >
            <Row>
              <DetailNumber scale={0} name='detail_data.coil.n_steps' />
              {'/'}
              <DetailNumber
                scale={0}
                name='detail_data.coil.n_rows'
                style={{ marginLeft: '5px' }}
              />
            </Row>
          </Detail>
          <DetailNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            scale={0}
            name='detail_data.coil.n_coils'
            label='data.selections.model_detail.n_coils'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={1}
            name='detail_data.coil.inner_volume'
            label='data.selections.model_detail.inner_volume'
          />
        </StyledRow>

        <StyledRow>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 4 }}
            scale={1}
            name='detail_data.coil.exchange_area'
            label='data.selections.model_detail.exchange_area'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='detail_data.coil.inlet_header'
            label='data.selections.model_detail.inlet_header'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='detail_data.coil.outlet_header'
            label='data.selections.model_detail.outlet_header'
          />
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Coil
