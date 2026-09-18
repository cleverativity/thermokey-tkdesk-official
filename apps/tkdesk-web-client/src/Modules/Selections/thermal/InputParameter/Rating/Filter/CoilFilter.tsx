import { FieldThermalSelect } from 'Components/Field'
import { StyledCollapse, StyledCollapsePanel, StyledRow } from 'Components/Styled'
import rawCoilGeometry from 'Localization/Constants/rating_coil_geometry.json'
import rawFluidPassages from 'Localization/Constants/rating_fluid_passages.json'
import React from 'react'

const ALL_OPTION = { value: 'All', label: 'All' }
const withAllOption = (
  options: Array<{ value: string; label: string }> = [],
) => [ALL_OPTION, ...options.filter((option) => option.value !== 'All')]

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
              data={withAllOption(rawFluidPassages)}
              name='rating.fluidPassages'
              label='data.thermal.rating.fluid_passages'
              field='value'
              defaultValue='All'
              required
            />
            <FieldThermalSelect
              span={twoColSpan}
              data={withAllOption(rawCoilGeometry)}
              name='rating.coilGeometry'
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
