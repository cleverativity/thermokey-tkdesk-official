import { useAuthorization } from 'Modules/App/Authorization/Context'

import {
  FieldCheckbox,
  FieldDecimalNumber,
  FieldMinMax,
  FieldRangeSelect,
  FieldSelectFrequency,
  FieldSelectMinMax,
} from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { SpanIntl } from 'Components/Span'

import rawSupply from 'Localization/Constants/supply.json'
import rawBrands from 'Localization/Constants/brands.json'

const Ventilation = () => {
  const autho = useAuthorization()

  const certificationOptions = [
    {
      value: 'erp',
      label: 'data.fan_models.erp',
    },
    {
      value: 'ul',
      label: 'data.fan_models.ul',
    },
  ]

  const filterOptions = [
    {
      value: 'special_fans',
      label: 'data.fan_models.special',
    },
    {
      value: 'silenced_fans',
      label: 'data.fan_models.silenced',
    },
    {
      value: 'exclude_long_lead_time_fans',
      label: 'data.fan_models.exclude_long_lead_time',
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['4']} style={{ marginTop: '30px' }}>
      <StyledCollapsePanel
        header='ui.selections.steps.input_parameters.fans'
        key='4'
      >
        <StyledRow>
          <FieldRangeSelect
            span={{ sm: 24, lg: 12, xl: 4 }}
            label='data.fan_models.fan_type'
            name='input_data.ventilation.type.value'
            noIntl
            optionMessagePath={['label']}
            tooltip={
              <p>
                AC: Alternated Current
                <br />
                EC: Electronically Commutated
              </p>
            }
            options={[
              {
                key: 'ac',
                label: 'AC',
              },
              {
                key: 'ec',
                label: 'EC',
              },
            ]}
          />
          <FieldSelectFrequency
            allowClear
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='input_data.ventilation.frequency'
          />
          <FieldRangeSelect
            span={{ sm: 24, lg: 12, xl: 5 }}
            allowClear
            name='input_data.ventilation.supply'
            label='data.selections.input_parameters.supply'
            placeholder='ui.generic.placeholder'
            prefix='select.ventilation.supply.'
            options={rawSupply}
          />
          {autho.iAmAdmin && (
            <FieldCheckbox
              span={{ sm: 24, lg: 12, xl: 10 }}
              name='input_data.ventilation.brands'
              label='data.selections.input_parameters.brands'
              options={rawBrands}
            />
          )}
        </StyledRow>

        <StyledRow>
          <FieldCheckbox
            name='input_data.ventilation.certifications'
            label='data.selections.input_parameters.certifications'
            span={{ sm: 24, lg: 12, xl: 4 }}
            options={certificationOptions}
          />
          <FieldCheckbox
            name='input_data.ventilation.filters'
            label='data.selections.input_parameters.filters'
            span={{ sm: 24, lg: 12, xl: 5 }}
            options={filterOptions}
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='input_data.ventilation.max_power_consumption'
            label='data.selections.input_parameters.max_power_consumption'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='input_data.ventilation.max_current_consumption'
            label='data.selections.input_parameters.max_current_consumption'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={0}
            name='input_data.ventilation.esp'
            label='data.selections.input_parameters.esp'
            tooltip={
              <SpanIntl value='data.selections.input_parameters.esp.tooltip' />
            }
          />
        </StyledRow>

        <StyledRow>
          <FieldMinMax
            span={{ sm: 24, lg: 12, xl: 4 }}
            name='input_data.ventilation.velocity'
            label='data.selections.input_parameters.velocity'
          />
          <FieldSelectMinMax
            span={{ sm: 24, lg: 12, xl: 5 }}
            allowClear
            name='input_data.ventilation.diameter'
            label='data.selections.input_parameters.diameter'
            options={[
              // { key: 300 },
              // { key: 350 },
              // { key: 400 },
              // { key: 450 },
              { key: 500 },
              { key: 560 },
              { key: 630 },
              { key: 800 },
              { key: 870 },
              { key: 900 },
              { key: 910 },
              { key: 960 },
              { key: 1000 },
              // { key: 1250 },
            ]}
          />
          <FieldSelectMinMax
            span={{ sm: 24, lg: 12, xl: 5 }}
            allowClear
            name='input_data.ventilation.fan_numbers'
            label='data.selections.input_parameters.fan_numbers'
            options={[
              { key: 1 },
              { key: 2 },
              { key: 3 },
              { key: 4 },
              { key: 5 },
              { key: 6 },
              { key: 7 },
              { key: 8 },
              { key: 9 },
              { key: 10 },
              { key: 11 },
              { key: 12 },
            ]}
          />
          <FieldRangeSelect
            span={{ sm: 24, lg: 12, xl: 5 }}
            allowClear
            name='input_data.ventilation.fan_rows'
            label='data.selections.input_parameters.fan_rows'
            options={[{ key: 1 }, { key: 2 }]}
          />
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Ventilation
