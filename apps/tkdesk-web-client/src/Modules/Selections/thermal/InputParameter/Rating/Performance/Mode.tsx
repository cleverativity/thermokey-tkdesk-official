import { FieldThermalSelect } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import React from 'react'

function Mode() {
  return (
    <>
      <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.rating_performance_target'
          key='1'
        >
          <StyledRow gutter={[8, 8]}>
            <FieldThermalSelect
              span={{ xs: 24, sm: 12 }}
              data={[{ value: 'Condensing', label: 'Condensing' }]}
              name='rating.mode'
              label='data.thermal.rating.mode'
              field='value'
              defaultValue='Condensing'
              required
            />
            <FieldThermalSelect
              span={{ xs: 24, sm: 12 }}
              data={[{ value: 'Aircooled', label: 'Aircooled' }]}
              name='rating.condition'
              label='data.thermal.rating.condition'
              field='value'
              defaultValue='Aircooled'
              required
            />
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Mode
