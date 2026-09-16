import _ from 'lodash'
import { Col, Space } from 'antd'
import { useIntl } from 'react-intl'
import { useFormikContext } from 'formik'

import { useAuthorization } from 'Modules/App/Authorization'

import { FieldDecimalNumber, FieldRangeSelect } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'

const Air = () => {
  const intl = useIntl()
  const autho = useAuthorization()
  const formik = useFormikContext()
  const { values } = formik

  const is_humidity: boolean = _.isEqual(
    _.get(values, 'input_data.air.air_mode.value', 'humidity'),
    'humidity',
  )

  return (
    <StyledCollapse defaultActiveKey={['2']} style={{ marginTop: '30px' }}>
      <StyledCollapsePanel
        header='ui.selections.steps.input_parameters.air'
        key='2'
      >
        <StyledRow>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 4 }}
            scale={1}
            name='input_data.air.inlet_temperature'
            label='data.selections.input_parameters.air_inlet_temperature'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={0}
            name='input_data.air.min_operative_temperature'
            label='data.selections.input_parameters.min_operative_temperature'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={0}
            name='input_data.air.altitude'
            label='data.selections.input_parameters.altitude'
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
                id: is_humidity
                  ? 'data.selections.input_parameters.humidity'
                  : 'data.selections.input_parameters.wet_bulb_temperature',
              })}
            </p>
            <Space.Compact>
              <FieldRangeSelect
                hideLabel
                style={{ flex: '0 0 auto', minWidth: 170 }}
                allowClear={false}
                name='input_data.air.air_mode'
                optionKeyPath={['key']}
                optionMessagePath={['label']}
                options={[
                  {
                    label:
                      'data.selections.input_parameters.wet_bulb_temperature',
                    value: 'wet_bulb_temperature',
                  },
                  {
                    label: 'data.selections.input_parameters.humidity',
                    value: 'humidity',
                  },
                ]}
              />
              {is_humidity ? (
                <FieldDecimalNumber
                  scale={autho.iAmAdmin ? 1 : 0}
                  name='input_data.air.humidity'
                  hideLabel
                />
              ) : (
                <FieldDecimalNumber
                  scale={1}
                  name='input_data.air.wet_bulb_temperature'
                  hideLabel
                />
              )}
            </Space.Compact>
          </Col>
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Air
