import _ from 'lodash'

import { useAuthorization } from 'Modules/App/Authorization/Context'

import { FieldCheckbox, FieldNumberSelect } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'

import rawFpi from 'Localization/Constants/fpi.json'
import rawGeometryTypes from 'Localization/Constants/geometry_types.json'
import { DetailIntl } from 'Components/Detail'

const Coil = () => {
  const autho = useAuthorization()

  const options = [
    {
      value: 'single',
      label: 'Single step',
    },
    {
      value: 'double',
      label: 'Double step',
    },
    { value: 'quad', label: 'Quad step' },
  ]

  const geometryTypes = _.reject(rawGeometryTypes, ({ key }) =>
    _.startsWith(key, 'df'),
  )

  return (
    <StyledCollapse defaultActiveKey={['6']} style={{ marginTop: '30px' }}>
      <StyledCollapsePanel
        header='ui.selections.steps.input_parameters.coil'
        key='6'
      >
        <StyledRow>
          {autho.iAmAdmin && (
            <>
              <FieldCheckbox
                span={{ sm: 24, lg: 12, xl: 4 }}
                vertical
                name='input_data.coil.fluid_steps'
                label='data.selections.input_parameters.fluid_steps'
                options={options}
              />
              <FieldCheckbox
                span={{ sm: 24, lg: 12, xl: 5 }}
                name='input_data.coil.n_rows'
                label='data.selections.input_parameters.n_rows'
                unlocalizedOptionLabel
                options={[
                  { label: '1', value: 1 },
                  { label: '2', value: 2 },
                ]}
              />
            </>
          )}
          <DetailIntl
            span={{ sm: 24, lg: 12, xl: autho.iAmAdmin ? 5 : 4 }}
            hideLabel={false}
            label='data.selections.input_parameters.tube_material'
            prefix='data.calculations.model_detail.material.'
          >
            aluminium
          </DetailIntl>
          <FieldNumberSelect
            span={{ sm: 24, lg: 12, xl: 5 }}
            mode='tags'
            name='input_data.coil.geometries_ids'
            label='data.selections.input_parameters.geometries_ids'
            unlocalizeMessage
            options={geometryTypes}
          />

          <DetailIntl
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            label='data.selections.input_parameters.fin_material'
            prefix='data.calculations.model_detail.material.'
          >
            aluminium
          </DetailIntl>
          <FieldNumberSelect
            span={{ sm: 24, lg: 12, xl: autho.iAmAdmin ? 4 : 5 }}
            mode='tags'
            name='input_data.coil.fpi'
            label='data.calculations.input_parameters.fpi'
            unlocalizeMessage
            options={rawFpi}
          />
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Coil
