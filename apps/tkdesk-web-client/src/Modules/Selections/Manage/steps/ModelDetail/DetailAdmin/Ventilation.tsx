import { useIntl } from 'react-intl'
import _ from 'lodash'
import { Col, Row } from 'antd'
import { useFormikContext } from 'formik'

import { useAuthorization } from 'Modules/App/Authorization'

import { Detail, DetailNumber, DetailText } from 'Components/Detail'
import { FieldDecimalNumber } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
  StyledTable,
} from 'Components/Styled'

import { staticColumns } from 'Model/Selections/steps/ModelDetail/fansTable'

const Ventilation = ({ ventilation }: any) => {
  const intl = useIntl()
  const autho = useAuthorization()
  const { values } = useFormikContext()

  const velocity = _.get(values, 'detail_data.ventilation.velocity.value', 0)
  const nominal_rpm = _.get(ventilation, 'nominal_rpm.value', 0)
  const rpm_percentage = {
    value: nominal_rpm > 0 ? (velocity / nominal_rpm) * 100 : 0,
    unit_of_measurement: '%',
  }

  const fan_rows = _.get(ventilation, 'fan_rows.value', 0)
  const fan_per_row = _.get(ventilation, 'fan_per_row.value', 0)

  const buildVentilationDataSource = (ventilation) => {
    const entries = Object.entries(ventilation)

    const grouped = _.groupBy(entries, ([key]) => {
      if (_.includes(key, 'single')) {
        return 'single'
      } else if (_.includes(key, 'total')) {
        return 'total'
      } else {
        return 'other'
      }
    })

    const buildRow = (group, label) => ({
      label,
      ..._.fromPairs(group),
    })

    return [
      buildRow(grouped.single, 'single'),
      buildRow(grouped.total, 'total'),
    ]
  }

  const dataSource = buildVentilationDataSource(ventilation)

  return (
    <StyledCollapse defaultActiveKey={['5']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='5'
        header='ui.selections.steps.input_parameters.fans'
      >
        <StyledRow>
          <DetailText
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            name='detail_data.ventilation.fan_name'
            label='data.selections.model_detail.name'
          />
          <DetailText
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            name='detail_data.ventilation.code'
            label='data.selections.model_detail.code'
          />
          <Col
            sm={24}
            lg={12}
            xl={10}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FieldDecimalNumber
              scale={0}
              name='detail_data.ventilation.velocity'
              label='data.selections.model_detail.velocity'
            />
            /
            <DetailNumber
              scale={0}
              name='detail_data.ventilation.nominal_rpm'
            />
            (<DetailNumber scale={0}>{rpm_percentage}</DetailNumber>)
          </Col>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 4 }}
            scale={0}
            name='input_data.ventilation.esp'
            label='data.selections.input_parameters.esp'
          />
        </StyledRow>

        <StyledRow style={{ marginBottom: '24px' }}>
          <DetailNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            scale={0}
            name='detail_data.ventilation.diameter'
            label='data.selections.model_detail.diameter'
          />
          <DetailNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            scale={0}
            name='detail_data.ventilation.fan_rows'
            label='data.selections.input_parameters.fan_rows'
          />
          <DetailNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            scale={0}
            name='detail_data.ventilation.fan_per_row'
            label='data.selections.model_detail.fan_per_row'
          />
          <Detail
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            label='data.selections.model_detail.total_fans'
          >
            {fan_rows * fan_per_row}
          </Detail>
          <DetailText
            span={{ sm: 24, lg: 12, xl: 4 }}
            hideLabel={false}
            name='detail_data.ventilation.link'
            label='data.selections.model_detail.link'
          />
        </StyledRow>

        <StyledRow style={{ marginBottom: '24px' }}>
          <Detail
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            label='data.selections.model_detail.erp_ul'
          >
            {intl.formatMessage({
              id: _.get(ventilation, 'erp.value', false)
                ? 'ui.generic.true'
                : 'ui.generic.false',
            })}
            {' / '}
            {intl.formatMessage({
              id: _.get(ventilation, 'ul.value', false)
                ? 'ui.generic.true'
                : 'ui.generic.false',
            })}
          </Detail>
          <DetailText
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            name='detail_data.ventilation.power_source'
            label='data.selections.model_detail.power_source'
          />
          <Detail
            span={{ sm: 24, lg: 12, xl: 5 }}
            hideLabel={false}
            label='data.selections.model_detail.operative_temperature'
          >
            <Row>
              <DetailNumber
                name='detail_data.ventilation.operative_temperature.min'
                scale={0}
                style={{ marginRight: '8px' }}
              />
              {'/'}
              <DetailNumber
                name='detail_data.ventilation.operative_temperature.max'
                scale={0}
                style={{ marginLeft: '8px' }}
              />
            </Row>
          </Detail>
        </StyledRow>

        <StyledTable
          rowKey='key'
          loading={false}
          dataSource={dataSource}
          pagination={false}
          columns={staticColumns(autho.iAmAdmin)}
        />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Ventilation
