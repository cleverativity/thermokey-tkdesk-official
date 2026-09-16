import _ from 'lodash'
import { useIntl } from 'react-intl'
import { useFormikContext } from 'formik'

import { useAuthorization } from 'Modules/App/Authorization'

import { FieldDecimalNumber, FieldRangeSelect } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { Col, Space } from 'antd'

const Liquid = () => {
  const intl = useIntl()
  const autho = useAuthorization()
  const formik = useFormikContext()
  const { values } = formik

  const liquid = _.get(formik.values, 'input_data.liquid.type.value', null)

  const options = [
    {
      value: 1,
      label: 'water',
    },
    {
      value: 2,
      label: 'ethylene',
    },
    {
      value: 3,
      label: 'propylene',
    },
  ]

  const filteredOptions = autho.iAmAdmin
    ? options
    : _.filter(options, (option) => option.value !== 1)

  const is_outlet_mode: boolean = _.isEqual(
    _.get(values, 'input_data.liquid.liquid_mode.value', 'outlet_temperature'),
    'outlet_temperature',
  )

  return (
    <StyledCollapse defaultActiveKey={['2']} style={{ marginTop: '30px' }}>
      <StyledCollapsePanel
        header='ui.selections.steps.input_parameters.liquid'
        key='2'
      >
        <StyledRow>
          <FieldRangeSelect
            span={{ sm: 24, lg: 12, xl: 4 }}
            name='input_data.liquid.type'
            label='data.calculations.input_parameters.entry_conditions.fluid_type_refrigerant'
            prefix='select.coils.microchannel.fluid_type.'
            optionMessagePath={['label']}
            options={filteredOptions}
            overrideOnChange={(value: any) => {
              formik.setFieldValue('input_data.liquid.type.value', value)

              if (value === 1) {
                formik.setFieldValue(
                  'input_data.liquid.volume_fraction.value',
                  0,
                )
              }
            }}
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={autho.iAmAdmin ? 1 : 0}
            name='input_data.liquid.volume_fraction'
            label='data.selections.input_parameters.volume_fraction'
            disabled={liquid === 1}
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={1}
            name='input_data.liquid.inlet_temperature'
            label='data.selections.input_parameters.inlet_temperature'
          />
          <Col sm={24} lg={12} xl={7}>
            <p
              style={{
                fontFamily: 'Avenir Medium, sans serif',
                paddingBottom: '8px',
              }}
            >
              <span style={{ color: '#ff4d4f' }}>* </span>
              {intl.formatMessage({
                id: is_outlet_mode
                  ? 'data.selections.input_parameters.outlet_temperature'
                  : 'data.selections.model_detail.flow_rate',
              })}
            </p>
            <Space.Compact>
              <FieldRangeSelect
                hideLabel
                style={{
                  flex: '0 0 auto',
                  minWidth: 150,
                }}
                allowClear={false}
                name='input_data.liquid.liquid_mode'
                optionKeyPath={['key']}
                optionMessagePath={['label']}
                options={[
                  {
                    label:
                      'data.selections.input_parameters.outlet_temperature',
                    value: 'outlet_temperature',
                  },
                  {
                    label: 'data.selections.model_detail.flow_rate',
                    value: 'flow_rate',
                  },
                ]}
              />
              {is_outlet_mode ? (
                <FieldDecimalNumber
                  style={{ flex: 1 }}
                  scale={1}
                  name='input_data.liquid.outlet_temperature'
                  hideLabel
                />
              ) : (
                <FieldDecimalNumber
                  style={{ flex: 1 }}
                  scale={0}
                  name='input_data.liquid.flow_rate'
                  hideLabel
                />
              )}
            </Space.Compact>
          </Col>
        </StyledRow>

        <StyledRow>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 4 }}
            scale={autho.iAmAdmin ? 1 : 0}
            name='input_data.liquid.max_pressure_drop'
            label='data.selections.input_parameters.max_pressure_drop'
          />
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Liquid
