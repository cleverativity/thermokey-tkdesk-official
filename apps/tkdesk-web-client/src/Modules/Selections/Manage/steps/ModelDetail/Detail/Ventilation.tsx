import _ from 'lodash'
import { useIntl } from 'react-intl'
import { Row } from 'antd'

import { Detail, DetailNumber, DetailText } from 'Components/Detail'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
  StyledTable,
} from 'Components/Styled'
import { SpanIntl } from 'Components/Span'

import { staticColumns } from 'Model/Selections/steps/ModelDetail/fansTable'
import { useAuthorization } from 'Modules/App/Authorization'

const Ventilation = ({ ventilation }: any) => {
  const fan_rows = _.get(ventilation, 'fan_rows.value', 0)
  const fan_per_row = _.get(ventilation, 'fan_per_row.value', 0)

  const autho = useAuthorization()
  const intl = useIntl()

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

  const items = [
    {
      label: <SpanIntl value='data.selections.model_detail.code' />,
      children: <DetailText name='detail_data.ventilation.code' />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.rpm_percentage' />,
      children: (
        <DetailNumber name='detail_data.ventilation.rpm_percentage' scale={0} />
      ),
    },
    {
      label: <SpanIntl value='data.selections.model_detail.velocity' />,
      children: (
        <Row>
          <DetailNumber
            name='detail_data.ventilation.velocity'
            scale={0}
            style={{ marginRight: '4px' }}
          />
          /
          <DetailNumber
            name='detail_data.ventilation.nominal_rpm'
            scale={0}
            style={{ marginLeft: '4px' }}
          />
        </Row>
      ),
    },
    {
      label: <SpanIntl value='data.selections.input_parameters.esp' />,
      children: <DetailNumber name='input_data.ventilation.esp' scale={0} />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.diameter' />,
      children: (
        <DetailNumber name='detail_data.ventilation.diameter' scale={0} />
      ),
    },
    {
      label: <SpanIntl value='data.selections.input_parameters.fan_rows' />,
      children: (
        <DetailNumber name='detail_data.ventilation.fan_rows' scale={0} />
      ),
    },
    {
      label: <SpanIntl value='data.selections.model_detail.fan_per_row' />,
      children: (
        <DetailNumber name='detail_data.ventilation.fan_per_row' scale={0} />
      ),
    },
    {
      label: <SpanIntl value='data.selections.model_detail.total_fans' />,
      children: <Detail>{fan_rows * fan_per_row}</Detail>,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.link' />,
      children: <DetailText name='detail_data.ventilation.link' />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.erp_ul' />,
      children: (
        <Detail>
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
      ),
    },
    {
      label: <SpanIntl value='data.selections.model_detail.power_source' />,
      children: <DetailText name='detail_data.ventilation.power_source' />,
    },
    {
      label: (
        <SpanIntl value='data.selections.model_detail.operative_temperature' />
      ),
      children: (
        <Row>
          <DetailNumber
            name='detail_data.ventilation.operative_temperature.min'
            scale={0}
            style={{ marginRight: '8px' }}
          />
          /
          <DetailNumber
            name='detail_data.ventilation.operative_temperature.max'
            scale={0}
            style={{ marginLeft: '8px' }}
          />
        </Row>
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['5']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='5'
        header='ui.selections.steps.input_parameters.fans'
      >
        <StyledDescriptions items={items} style={{ paddingBottom: '20px' }} />

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
