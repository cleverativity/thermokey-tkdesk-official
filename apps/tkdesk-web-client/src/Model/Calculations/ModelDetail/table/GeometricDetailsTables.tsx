import _ from 'lodash'
import { FormattedMessage, useIntl } from 'react-intl'
import { Col } from 'antd'

import { Span, SpanNumber } from 'Components/Span'
import { StyledRow, StyledTable } from 'Components/Styled'

const GeometricDetailsTables = (props: any) => {
  const { detailData } = props
  const { geometric_details, useCase } = detailData

  const intl = useIntl()

  const measuresTable = _.map(_.split('ABCDEFGHILMNOP', ''), (el, index) => {
    switch (el) {
      case 'A':
        return {
          letter: el,
          value: _.get(geometric_details, 'battery_active_length', ''),
          key: intl.formatMessage({
            id: 'data.calculations.model_detail.battery_active_length',
          }),
        }
      case 'B':
        return {
          letter: el,
          value: _.get(geometric_details, 'core_height', ''),
          key: intl.formatMessage({
            id: 'data.calculations.model_detail.core_height',
          }),
        }
      case 'C':
        return {
          letter: el,
          value: _.get(geometric_details, 'core_length', ''),
          key: intl.formatMessage({
            id: 'data.calculations.model_detail.core_length',
          }),
        }
      case 'D':
        return {
          letter: el,
          value: _.get(geometric_details, 'total_length', ''),
          key: intl.formatMessage({
            id: 'data.calculations.model_detail.total_length',
          }),
        }
      case 'E':
        return {
          letter: el,
          value: _.get(
            geometric_details,
            'inlet_1_pos',
            _.get(geometric_details, 'inlet_pos', null),
          ),
          key: !_.isNil(_.get(geometric_details, 'inlet_1_pos', null))
            ? intl.formatMessage({
                id: 'data.calculations.model_detail.inlet_1_pos',
              })
            : intl.formatMessage({
                id: 'data.calculations.model_detail.inlet_pos',
              }),
        }
      case 'F':
        return {
          letter: el,
          value: _.get(
            geometric_details,
            'inlet_2_pos',
            _.get(geometric_details, 'outlet_pos', null),
          ),
          key: !_.isNil(_.get(geometric_details, 'inlet_2_pos', null))
            ? intl.formatMessage({
                id: 'data.calculations.model_detail.inlet_2_pos',
              })
            : intl.formatMessage({
                id: 'data.calculations.model_detail.outlet_pos',
              }),
        }
      case 'G':
        return {
          letter: el,
          value: _.get(geometric_details, 'inlet_length', ''),
          key: intl.formatMessage({
            id: 'data.calculations.model_detail.inlet_length',
          }),
        }

      case 'H':
        return {
          letter: el,
          value: _.get(geometric_details, 'outlet_length', ''),
          key: intl.formatMessage({
            id: 'data.calculations.model_detail.outlet_length',
          }),
        }
      case 'I':
        return {
          letter: el,
          value: _.get(geometric_details, 'manifold_length', ''),
          key: intl.formatMessage({
            id: 'data.calculations.model_detail.manifold_length',
          }),
        }
      case 'L':
        return {
          letter: el,
          value: _.get(geometric_details, 'core_thikness', ''),
          key: intl.formatMessage({
            id: 'data.calculations.model_detail.core_thikness',
          }),
        }
      case 'M':
        return {
          letter: el,
          value: _.get(geometric_details, 'outlet_diameter', ''),
          key: intl.formatMessage({
            id: 'data.calculations.model_detail.inlet_diameter',
          }),
        }
      case 'N':
        return {
          letter: el,
          value: _.get(geometric_details, 'outlet_diameter', ''),
          key: intl.formatMessage({
            id: 'data.calculations.model_detail.outlet_diameter',
          }),
        }
      case 'O':
        return !_.isNil(_.get(geometric_details, 'outlet_1_pos', null))
          ? {
              letter: el,
              value: _.get(geometric_details, 'outlet_1_pos', null),
              key: intl.formatMessage({
                id: 'data.calculations.model_detail.outlet_1_pos',
              }),
            }
          : null
      case 'P':
        return !_.isNil(_.get(geometric_details, 'outlet_2_pos', null))
          ? {
              letter: el,
              value: _.get(geometric_details, 'outlet_2_pos', null),
              key: intl.formatMessage({
                id: 'data.calculations.model_detail.outlet_2_pos',
              }),
            }
          : null

      default:
    }
  })

  const commonColumns = [
    {
      title: (
        <FormattedMessage id='ui.coils.microchannel.model_detail.geometric_details.legend' />
      ),
      dataIndex: 'letter',
      align: 'center',
      render: (type: string) => <Span value={type} />,
    },
    {
      title: (
        <FormattedMessage id='ui.coils.microchannel.model_detail.geometric_details.field' />
      ),
      dataIndex: 'key',
      render: (key: string) => <Span value={key} />,
    },
    {
      title: (
        <FormattedMessage id='ui.coils.microchannel.model_detail.geometric_details.value' />
      ),
      dataIndex: 'value',
      render: (value: any, record: any) =>
        _.isString(value) ? (
          <Span value={value} />
        ) : (
          <SpanNumber
            scale={_.includes(['M', 'N'], record.letter) ? 1 : 0}
            value={value}
          />
        ),
    },
  ]

  const measuresColumns = [
    {
      title: (
        <FormattedMessage id='ui.coils.microchannel.model_detail.geometric_details.measures' />
      ),
      children: commonColumns,
    },
  ]

  const otherColumns = [
    {
      title: (
        <FormattedMessage id='ui.coils.microchannel.model_detail.geometric_details.field' />
      ),
      width: 100,
      dataIndex: 'key',
      render: (key: string) => <Span value={key} />,
    },
    {
      title: (
        <FormattedMessage id='ui.coils.microchannel.model_detail.geometric_details.value' />
      ),
      dataIndex: 'value',
      width: 100,
      render: (value: any, record: any) =>
        _.isString(value) ? (
          <Span value={value} />
        ) : (
          <SpanNumber
            scale={
              _.includes(['A', 'S', 'T', 'AB', 'CD', 'EF'], record.letter)
                ? 0
                : 1
            }
            value={value}
          />
        ),
    },
  ]

  const otherParamsColumns = [
    {
      title: (
        <FormattedMessage id='ui.coils.microchannel.model_detail.geometric_details.other_params' />
      ),
      children: otherColumns,
    },
  ]

  const otherParameters = [
    {
      letter: 'R',
      value: intl.formatMessage({
        id: `data.calculations.model_detail.fin_type.${_.get(
          geometric_details,
          'fin_type.value',
          'louvered',
        )}`,
      }),
      key: intl.formatMessage({
        id: 'data.calculations.model_detail.fin_type',
      }),
    },
    {
      letter: 'S',
      value: _.get(geometric_details, 'fpi', null),
      key: intl.formatMessage({
        id: 'data.calculations.model_detail.fpi',
      }),
    },
    {
      letter: 'T',
      value: _.get(geometric_details, 'n_of_tubes', null),
      key: intl.formatMessage({
        id: 'data.calculations.model_detail.n_of_tubes',
      }),
    },
    {
      letter: 'U',
      value: _.get(geometric_details, 'fin_surface', null),
      key: intl.formatMessage({
        id: 'data.calculations.model_detail.fin_surface',
      }),
    },
    {
      letter: 'V',
      value: _.get(geometric_details, 'prime_surface', null),
      key: intl.formatMessage({
        id: 'data.calculations.model_detail.prime_surface',
      }),
    },
    {
      letter: 'W',
      value: _.get(geometric_details, 'total_surface', null),
      key: intl.formatMessage({
        id: 'data.calculations.model_detail.total_surface',
      }),
    },
    {
      letter: 'Z',
      value: _.get(geometric_details, 'coil_volume', null),
      key: intl.formatMessage({
        id: 'data.calculations.model_detail.coil_volume',
      }),
    },
    {
      letter: 'AB',
      value: _.get(geometric_details, 'coil_volume_c2', null),
      key: intl.formatMessage({
        id: 'data.calculations.model_detail.coil_volume_c2',
      }),
    },
    {
      letter: 'CD',
      value: _.get(geometric_details, 'n_of_steps', null),
      key: intl.formatMessage({
        id: 'data.calculations.model_detail.n_of_steps',
      }),
    },
    {
      letter: 'EF',
      value: _.get(geometric_details, 'n_of_inlets', null),
      key: intl.formatMessage({
        id: 'data.calculations.model_detail.n_of_inlets',
      }),
    },
    {
      letter: 'GH',
      value: _.get(geometric_details, 'n_of_outlets', null),
      key: intl.formatMessage({
        id: 'data.calculations.model_detail.n_of_outlets',
      }),
    },
  ]

  return (
    <StyledRow style={{ display: 'flex', flexDirection: 'column' }}>
      <Col span={24} style={{ width: '100%' }}>
        <StyledTable
          loading={false}
          pagination={false}
          rowKey='letter'
          size='small'
          bordered
          dataSource={[
            ..._.reject(measuresTable, _.isNil),
            {
              letter: 'MPE',
              value: _.get(geometric_details, 'tubes_depth', ''),
              key: intl.formatMessage({
                id: 'data.calculations.model_detail.tubes_depth',
              }),
            },
          ]}
          columns={measuresColumns}
        />
      </Col>

      <Col span={24} style={{ width: '100%', marginTop: '20px' }}>
        <StyledTable
          loading={false}
          pagination={false}
          rowKey='letter'
          size='small'
          bordered
          dataSource={
            !_.startsWith(useCase, 'double_flow')
              ? _.filter(otherParameters, (param) => param.letter !== 'AB')
              : otherParameters
          }
          columns={otherParamsColumns}
        />
      </Col>
    </StyledRow>
  )
}

export default GeometricDetailsTables
