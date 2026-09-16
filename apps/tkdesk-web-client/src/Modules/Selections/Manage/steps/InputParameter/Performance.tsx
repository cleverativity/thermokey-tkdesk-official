import { useAuthorization } from 'Modules/App/Authorization/Context'

import {
  FieldDecimalNumber,
  FieldMinMax,
  FieldRangeSelect,
  FieldNumberSelect,
} from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'

import rawEnergyClass from 'Localization/Constants/energy_class.json'

const Performance = () => {
  const autho = useAuthorization()

  return (
    <StyledCollapse defaultActiveKey={['1']}>
      <StyledCollapsePanel
        header='ui.selections.steps.input_parameters.performance'
        key='1'
      >
        <StyledRow>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 4 }}
            scale={1}
            name='input_data.performance.capacity'
            label='data.selections.input_parameters.capacity'
          />
          <FieldMinMax
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='input_data.performance.tolerance'
            label='data.selections.input_parameters.tolerance'
          />
          {autho.iAmAdmin && (
            <>
              <FieldRangeSelect
                span={{ sm: 24, lg: 12, xl: 5 }}
                name='input_data.performance.mode'
                label='data.selections.input_parameters.mode'
                noIntl
                optionMessagePath={['label']}
                options={[
                  {
                    key: 0,
                    label: 'FluidCooling',
                  },
                ]}
              />
              <FieldRangeSelect
                span={{ sm: 24, lg: 12, xl: 5 }}
                name='input_data.performance.adiabatic_system'
                label='data.selections.input_parameters.adiabatic_system'
                noIntl
                optionMessagePath={['label']}
                options={[
                  {
                    key: 1,
                    label: 'Dry',
                  },
                ]}
              />
            </>
          )}
          <FieldNumberSelect
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='input_data.performance.min_energy_class'
            label='data.selections.input_parameters.min_energy_class'
            prefix='select.performance.min_energy_class.'
            options={rawEnergyClass}
          />
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Performance
