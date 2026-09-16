import { FieldThermalSelect } from 'Components/Field'
import { StyledCollapse, StyledCollapsePanel, StyledRow } from 'Components/Styled'
import rawCoilGeometry from 'Localization/Constants/rating_coil_geometry.json'
import rawFluidPassages from 'Localization/Constants/rating_fluid_passages.json'
import React from 'react'

function CoilFilter() {
  const twoColSpan = { xs: 24, sm: 12 }

  return (
    <>
      <StyledCollapse defaultActiveKey={['2']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.rating_coil_filter'
          key='2'
        >
          <StyledRow gutter={[8, 8]}>
            <FieldThermalSelect
              span={twoColSpan}
              data={rawFluidPassages}
              name='rating.fluid_passages'
              label='data.thermal.rating.fluid_passages'
              field='value'
              defaultValue='All'
              required
            />
            <FieldThermalSelect
              span={twoColSpan}
              data={rawCoilGeometry}
              name='rating.tube_geo'
              label='data.thermal.rating.tube_geo'
              field='value'
              defaultValue='All'
              required
            />
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default CoilFilter
