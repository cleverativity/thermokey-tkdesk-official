import { FieldThermalSelect } from 'Components/Field'
import { StyledCollapse, StyledCollapsePanel } from 'Components/Styled'
import Row from 'Components/Styled/Row'
import React from 'react'

interface DimensionsProps {
  data?: {
    condensersType?: any[]
  }
}

function Dimensions(props: DimensionsProps) {
  const { condensersType } = props.data
  return (
    <>
      <StyledCollapse defaultActiveKey={['4']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel header='ui.thermal.panelHeader.dimensions' key='4'>
          <Row gutter={[16, 16]}>
            <FieldThermalSelect
              span={{ sm: 24, md: 12, lg: 6 }}
              data={condensersType}
              name='condenser.condenserType'
              label='data.thermal.field.condenser_type'
              field='condenser_type'
              defaultValue='All'
              required
            />
          </Row>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Dimensions
