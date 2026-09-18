import { FieldThermalSelect } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import rawDiameter from 'Localization/Constants/rating_diameter.json'
import rawFanBrand from 'Localization/Constants/rating_fan_brand.json'
import rawNoiseClass from 'Localization/Constants/rating_noise_class.json'
import React from 'react'

const ALL_OPTION = { value: 'All', label: 'All' }
const withAllOption = (
  options: Array<{ value: string; label: string }> = [],
) => [ALL_OPTION, ...options.filter((option) => option.value !== 'All')]

interface VentilationFilterProps {
  data?: {
    fanConnection?: any[]
  }
}

function VentilationFilter({ data }: VentilationFilterProps) {
  const twoColSpan = { xs: 24, sm: 12 }
  const { fanConnection } = data ?? {}

  return (
    <>
      <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.rating_ventilation_filter'
          key='1'
        >
          <StyledRow gutter={[8, 8]}>
            <FieldThermalSelect
              span={twoColSpan}
              data={withAllOption(rawDiameter)}
              name='rating.diameter'
              label='data.thermal.rating.diameter'
              field='value'
              defaultValue='All'
              required
            />
            <FieldThermalSelect
              span={twoColSpan}
              data={withAllOption(rawFanBrand.condenser)}
              name='rating.fanBrand'
              label='data.thermal.rating.brand'
              field='value'
              defaultValue='All'
              required
            />
            <FieldThermalSelect
              span={twoColSpan}
              data={withAllOption(rawNoiseClass)}
              name='rating.noiseClass'
              label='data.thermal.rating.noise_class'
              field='value'
              defaultValue='All'
              required
            />
            <FieldThermalSelect
              span={twoColSpan}
              data={fanConnection}
              name='rating.fansConnection'
              label='data.thermal.field.fans_connection'
              defaultValue='All~50Hz'
              field='fan_connection'
              required
            />
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default VentilationFilter
