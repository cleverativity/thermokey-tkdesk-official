import _ from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Col } from 'antd'
import {
  LoginOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons'

import { Span, SpanIntl } from 'Components/Span'
import SpanNumber from 'Components/Span/SpanNumber'
import { StyledRow } from 'Components/Styled'
import { FormikDependent } from 'Components/Formik'

import RenderedTable from './table/RenderedTable'

const staticColumnsGeomTypeAdmin = [
  {
    title: (
      <FormattedMessage id='data.calculations.input_parameters.geom_type.short' />
    ),
    dataIndex: 'type',
    width: 150,
    render: (type: string) => (
      <SpanIntl prefix='select.coils.microchannel.geom_type.' value={type} />
    ),
  },
  {
    title: (
      <FormattedMessage id='data.calculations.input_parameters.geom_type.tubes_depth' />
    ),
    dataIndex: 'tubes_depth',
    render: (value: number) => <SpanNumber value={value} scale={0} />,
  },
  {
    title: (
      <FormattedMessage id='data.calculations.input_parameters.geom_type.tube_step' />
    ),
    dataIndex: 'tube_step',
    render: (value: number) => <SpanNumber value={value} scale={1} />,
  },
  {
    title: (
      <FormattedMessage id='data.calculations.input_parameters.geom_type.hydraulic_diameter' />
    ),
    dataIndex: 'hydraulic_diameter',
    render: (value: number) => <SpanNumber value={value} />,
  },
  {
    title: (
      <FormattedMessage id='data.calculations.input_parameters.geom_type.tube_pass_section' />
    ),
    dataIndex: 'tube_pass_section',
    render: (value: number) => <SpanNumber value={value} scale={1} />,
  },
  {
    title: (
      <FormattedMessage id='data.calculations.input_parameters.geom_type.aspect_ratio' />
    ),
    dataIndex: 'aspect_ratio',
    render: (value: number) => <SpanNumber value={value} />,
  },
  {
    title: (
      <FormattedMessage id='data.calculations.input_parameters.geom_type.port_number' />
    ),
    dataIndex: 'port_number',
    render: (value: number) => <SpanNumber scale={0} value={value} />,
  },
  {
    title: (
      <FormattedMessage id='data.calculations.input_parameters.geom_type.pressure' />
    ),
    dataIndex: 'pressure',
    render: (value: number) => <SpanNumber value={value} scale={0} />,
  },
  {
    title: (
      <FormattedMessage id='data.calculations.input_parameters.geom_type.fin_type' />
    ),
    dataIndex: 'fin_type', // change this
    render: (value: number) => (
      <SpanIntl value='data.calculations.input_parameters.fin_type.louvered' />
    ),
  },
]

let delayTimer: any
const staticColumnsPassNumber = [
  {
    title: (
      <FormattedMessage id='data.calculations.input_parameters.refrigerant_circuit.pass' />
    ),
    width: 110,
    dataIndex: ['entry', 'pass'],
    render: (value: number) => (
      <SpanNumber fixedDecimalScale={false} value={value} />
    ),
  },
  {
    title: (
      <FormattedMessage id='data.calculations.input_parameters.refrigerant_circuit.port' />
    ),
    width: 220,
    dataIndex: 'entry',
    render: (values: { [key: string]: any }) => {
      return (
        <FormikDependent
          propsFunction={({ formik }) => {
            const { values: formikValues } = formik

            const useCase = _.get(formikValues, 'use_case')
            const status = _.get(formikValues, 'status')

            let override_steps = false

            if (useCase === 'free_cooling_condenser') {
              const prefix = _.chain(values)
                .get('prefix')
                .split('_')
                .last()
                .value()

              override_steps = _.get(
                formikValues,
                `input_data.${prefix}.override_steps.value`,
                false,
              )
            } else {
              override_steps = _.get(
                formikValues,
                'input_data.override_steps.value',
                false,
              )
            }

            return { override_steps, status }
          }}
          render={({ override_steps, status }) => {
            return override_steps && status === 'use_case_selected' ? (
              <RenderedTable values={values} />
            ) : (
              <SpanNumber scale={0} value={values.port} />
            )
          }}
        />
      )
    },
  },
  {
    title: (
      <FormattedMessage id='data.calculations.input_parameters.refrigerant_circuit.input' />
    ),
    width: 220,
    dataIndex: 'entry',
    render: (value: { [key: string]: any }) => (
      <StyledRow align='middle'>
        <Col span={10}>
          {value.input == 1 ? (
            <SpanIntl value='ui.generic.yes' />
          ) : (
            <SpanIntl value='ui.generic.no' />
          )}
        </Col>
        <Col
          span={4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '8px',
          }}
        >
          {value.input == 1 ? (
            <LoginOutlined style={{ fontSize: '25px' }} />
          ) : null}
        </Col>
      </StyledRow>
    ),
  },
  {
    title: (
      <FormattedMessage id='data.calculations.input_parameters.refrigerant_circuit.direction' />
    ),
    width: 220,
    dataIndex: 'entry',
    render: (value: { [key: string]: any }) => (
      <StyledRow align='middle'>
        <Col
          span={10}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '8px',
          }}
        >
          {value.direction == 1 ? (
            <ArrowLeftOutlined style={{ fontSize: '25px' }} />
          ) : (
            <ArrowRightOutlined style={{ fontSize: '25px' }} />
          )}
        </Col>
      </StyledRow>
    ),
  },
]

const fluidChildrens = (use_case: string) => [
  ...(_.startsWith(use_case, 'double_flow')
    ? [
        {
          title: (
            <FormattedMessage id='data.calculations.model_detail.heat_transfer_rate' />
          ),
          width: 110,
          dataIndex: 'global_heat_flux_c1',
          render: (value: number) => <SpanNumber scale={1} value={value} />,
        },
      ]
    : []),
  ...(use_case === 'free_cooling_condenser'
    ? [
        {
          title: (
            <FormattedMessage id='data.calculations.model_detail.liquid' />
          ),
          width: 110,
          render: (value: any) => {
            const glycol_percentage = _.get(value, 'glycol_percentage', null)

            return (
              <>
                <SpanIntl
                  prefix='select.coils.microchannel.fluid_type.'
                  value={_.get(value, 'fluid')}
                />
                {!_.isNil(glycol_percentage) && (
                  <>
                    {' '}
                    {!_.isNil(glycol_percentage) && (
                      <SpanNumber scale={0} value={glycol_percentage} />
                    )}
                  </>
                )}
              </>
            )
          },
        },
      ]
    : []),
  {
    title: (
      <FormattedMessage id='data.calculations.model_detail.pressure_drops' />
    ),
    width: 110,
    dataIndex: 'pressure_drops_c1',
    render: (value: number) => <SpanNumber scale={0} value={value} />,
  },
  {
    title: <FormattedMessage id='data.calculations.model_detail.flow_rate' />,
    width: 110,
    key: 'flow_rate_c1',
    render: (value: number, record: any, index) => {
      let key: string

      switch (use_case) {
        case 'air_cooled_condenser':
          key = 'flow_rate_kgh_c1'
          break
        case 'water_cooler':
        case 'water_heater':
          key = 'flow_rate_m3h_c1'
          break
        case 'free_cooling_condenser':
          key = index === 0 ? 'flow_rate_m3h_c1' : 'flow_rate_kgh_c1'
          break
        default:
          key = 'flow_rate_c1'
      }

      const data: number = _.get(value, key, null)

      return <SpanNumber scale={2} value={data} />
    },
  },
  {
    title: <FormattedMessage id='data.calculations.model_detail.inlet_temp' />,
    width: 110,
    dataIndex: 'inlet_temperature_c1',
    render: (value: number) => <SpanNumber scale={1} value={value} />,
  },
  {
    title: <FormattedMessage id='data.calculations.model_detail.outlet_temp' />,
    width: 110,
    dataIndex: 'outlet_temperature_c1',
    render: (value: number) => <SpanNumber scale={1} value={value} />,
  },
]

const secondaryFluidChildrens = (use_case: string) => [
  ...(_.startsWith(use_case, 'double_flow')
    ? [
        {
          title: (
            <FormattedMessage id='data.calculations.model_detail.heat_transfer_rate' />
          ),
          width: 110,
          dataIndex: 'global_heat_flux_c2',
          render: (value: number) => <SpanNumber scale={1} value={value} />,
        },
      ]
    : []),
  {
    title: (
      <FormattedMessage id='data.calculations.model_detail.pressure_drops' />
    ),
    width: 110,
    dataIndex: 'pressure_drops_c2',
    render: (value: number) => <SpanNumber scale={0} value={value} />,
  },
  {
    title: <FormattedMessage id='data.calculations.model_detail.flow_rate' />,
    width: 110,
    dataIndex: 'flow_rate_c2',
    render: (value: number, record: any) => (
      <SpanNumber scale={2} value={value} />
    ),
  },
  {
    title: <FormattedMessage id='data.calculations.model_detail.inlet_temp' />,
    width: 110,
    dataIndex: 'inlet_temperature_c2',
    render: (value: number) => <SpanNumber scale={1} value={value} />,
  },
  {
    title: <FormattedMessage id='data.calculations.model_detail.outlet_temp' />,
    width: 110,
    dataIndex: 'outlet_temperature_c2',
    render: (value: number) => <SpanNumber scale={1} value={value} />,
  },
]

const createStaticColumnsModelsList = (
  use_case: string,
  fluid_c1: any,
  fluid_c2: any,
  glycol_percentage: any,
) => [
  {
    title: <FormattedMessage id='ui.generic.model_code' />,
    width: 110,
    dataIndex: 'model_code',
    render: (value: number | string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.calculations.model_detail.geom_type' />,
    width: 110,
    dataIndex: 'geom_type',
    render: (value: string) => (
      <SpanIntl prefix='select.coils.microchannel.geom_type.' value={value} />
    ),
  },
  {
    title: (
      <FormattedMessage id='data.calculations.model_detail.heat_transfer_rate' />
    ),
    width: 110,
    dataIndex: 'global_heat_flux_c1',
    render: (value: number) => (
      <SpanNumber scale={1} sign='absolute' value={value} />
    ),
  },
  {
    title: (
      <>
        <FormattedMessage id='data.calculations.model_detail.refrigerant' />
        {_.isNil(_.get(fluid_c1, 'value', null)) ? (
          <></>
        ) : (
          <>
            {': '}
            <SpanIntl
              prefix='select.coils.microchannel.fluid_type.'
              value={_.get(fluid_c1, 'value', null)}
            />
          </>
        )}
      </>
    ),
    children: fluidChildrens(use_case),
    key: 'refrigerant',
  },
  {
    title: (
      <>
        <FormattedMessage id='data.calculations.model_detail.liquid' />
        {_.isNil(_.get(fluid_c1, 'value', null)) ? (
          <></>
        ) : (
          <>
            {': '}
            <SpanIntl
              prefix='select.coils.microchannel.fluid_type.'
              value={_.get(fluid_c1, 'value', null)}
            />
          </>
        )}
        {_.isNil(_.get(glycol_percentage, 'value', null)) ? (
          <></>
        ) : (
          <>
            {' '}
            <SpanNumber scale={0} value={glycol_percentage} />
          </>
        )}
      </>
    ),
    children: fluidChildrens(use_case),
    key: 'liquid',
  },
  {
    title: (
      <>
        <FormattedMessage id='data.calculations.model_detail.liquid' />
        {_.isNil(_.get(fluid_c2, 'value', null)) ? (
          <></>
        ) : (
          <>
            {': '}
            <SpanIntl
              prefix='select.coils.microchannel.fluid_type.'
              value={_.get(fluid_c2, 'value', null)}
            />
          </>
        )}
      </>
    ),
    children: secondaryFluidChildrens(use_case),
    key: 'secondary_coolant',
  },
  {
    title: <FormattedMessage id='data.calculations.model_detail.air' />,
    children: [
      ...(_.startsWith(use_case, 'double_flow')
        ? [
            {
              title: (
                <FormattedMessage id='data.calculations.model_detail.heat_transfer_rate' />
              ),
              width: 110,
              dataIndex: 'global_heat_flux_air',
              render: (value: number) => <SpanNumber scale={1} value={value} />,
            },
          ]
        : []),
      {
        title: (
          <FormattedMessage id='data.calculations.model_detail.pressure_drops' />
        ),
        width: 110,
        dataIndex: 'pressure_drops_air',
        render: (value: number) => <SpanNumber scale={0} value={value} />,
      },
      {
        title: (
          <FormattedMessage id='data.calculations.model_detail.flow_rate' />
        ),
        width: 110,
        dataIndex: 'flow_rate_air',
        onCell: (_, index) => {
          if (use_case === 'free_cooling_condenser') {
            return index === 0 ? { rowSpan: 2 } : { rowSpan: 0 }
          }
        },
        render: (value: number) => <SpanNumber scale={0} value={value} />,
      },
      {
        title: (
          <FormattedMessage id='data.calculations.model_detail.inlet_temp' />
        ),
        width: 110,
        dataIndex: 'inlet_temperature_air',
        render: (value: number) => <SpanNumber scale={1} value={value} />,
      },
      {
        title: (
          <FormattedMessage id='data.calculations.model_detail.outlet_temp' />
        ),
        width: 110,
        dataIndex: 'outlet_temperature_air',
        render: (value: number) => <SpanNumber scale={1} value={value} />,
      },
    ],
  },

  {
    title: (
      <FormattedMessage id='data.calculations.model_detail.engine_performance_string' />
    ),
    width: 110,
    key: 'engine_performance_string',
    dataIndex: 'engine_performance_string',
    render: (value: string) => <Span value={value} />,
  },
]

export {
  staticColumnsGeomTypeAdmin,
  staticColumnsPassNumber,
  createStaticColumnsModelsList,
}
