import _ from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Popover } from 'antd'
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'

import { FieldDecimalNumber } from 'Components/Field'
import { SpanIntl, SpanNumber } from 'Components/Span'
import { FormikDependent } from 'Components/Formik'

const MAX_VALUE_RANGE = 3
const DISABLED_TEXT_STYLE = { color: '#767676' }

const SELECTOR_FIELD_RANGES = {
  air_inlet_temperature_decrease: {
    min: 0,
    max: 2,
  },
  capacity_increase_perc: {
    min: -50,
    max: 50,
  },
  connection_limit_speed: {},
  sound_power_correction: {
    min: -10,
    max: 10,
  },
}

type CorrectiveFactorsColumnsConfig = {
  basePath: string
  enabledPath?: string
}

const popOver = (global: number, value: number | any) => (
  <>
    <p>
      <FormattedMessage id='data.users.permission.global' />:{' '}
      <SpanNumber value={global} />
    </p>
    <p>
      <FormattedMessage id='data.users.permission.override' />:{' '}
      <SpanNumber value={value} />
    </p>
  </>
)

const getFieldName = (name: string) => _.last(_.split(name, '.')) || ''

const getValuePath = (basePath: string, index: number) =>
  `${basePath}.values[${index}].value`

const getCorrectiveFactorRange = (basePath: string, fieldName: string) => {
  const pathSegments = _.split(basePath, '.')
  const correctiveFactorType =
    pathSegments[0] === 'user_permissions' ? pathSegments[1] : pathSegments[0]

  if (correctiveFactorType === 'microchannel') {
    return {
      min: 0,
      max: MAX_VALUE_RANGE,
    }
  }

  if (correctiveFactorType === 'selector') {
    return SELECTOR_FIELD_RANGES[fieldName] || {}
  }

  return {}
}

const getFieldScale = (basePath: string) => {
  const pathSegments = _.split(basePath, '.')
  const correctiveFactorType =
    pathSegments[0] === 'user_permissions' ? pathSegments[1] : pathSegments[0]

  return correctiveFactorType === 'selector' ? 1 : 2
}

const getTextStyle = (enabledPath?: string, enabled?: boolean) =>
  enabledPath && !enabled ? DISABLED_TEXT_STYLE : {}

const renderWithEnabled = (
  enabledPath: string | undefined,
  render: (enabled?: boolean) => any,
) => {
  if (_.isNil(enabledPath)) {
    return render()
  }

  return (
    <FormikDependent
      propsFunction={({ formik }) => ({
        enabled: _.get(formik.values, enabledPath, false),
      })}
      render={({ enabled }) => render(enabled)}
    />
  )
}

const renderWithValue = (
  valuePath: string,
  defaultValue: any,
  render: (value: any) => any,
) => (
  <FormikDependent
    propsFunction={({ formik }) => ({
      value: _.get(formik.values, valuePath, defaultValue),
    })}
    render={({ value }) => render(value)}
  />
)

const staticColumnsDetail = ({
  basePath,
  enabledPath,
}: CorrectiveFactorsColumnsConfig) => [
  {
    title: <FormattedMessage id='data.users.permission.field' />,
    dataIndex: 'key',
    render: (name: string) =>
      renderWithEnabled(enabledPath, (enabled) => (
        <SpanIntl
          prefix='ui.settings.corrective_factors.fields.'
          value={getFieldName(name)}
          style={getTextStyle(enabledPath, enabled)}
        />
      )),
  },
  {
    title: <FormattedMessage id='data.users.permission.global' />,
    dataIndex: 'global_value',
    render: (value: string) =>
      renderWithEnabled(enabledPath, (enabled) => (
        <SpanNumber
          scale={getFieldScale(basePath)}
          style={getTextStyle(enabledPath, enabled)}
          value={Number(value)}
        />
      )),
  },
  {
    title: <FormattedMessage id='data.users.permission.override' />,
    dataIndex: 'value',
    render: (value: string) =>
      renderWithEnabled(enabledPath, (enabled) => (
        <SpanNumber
          scale={getFieldScale(basePath)}
          style={getTextStyle(enabledPath, enabled)}
          value={_.isNil(value) ? value : Number(value)}
        />
      )),
  },

  {
    title: (
      <FormattedMessage id='data.users.permission.corrective_factors_status' />
    ),
    dataIndex: 'value',
    render: (_value: number | string, record: any, index: number) =>
      renderWithValue(getValuePath(basePath, index), 0, (value) =>
        _.isNil(value) ? (
          <Popover
            trigger='hover'
            content={popOver(record.global_value, value)}
          >
            <CheckCircleOutlined style={{ color: '#35c2a0' }} />
          </Popover>
        ) : (
          <Popover
            trigger='hover'
            content={popOver(record.global_value, value)}
          >
            {' '}
            <WarningOutlined style={{ color: '#F3BB5D' }} />
          </Popover>
        ),
      ),
  },
]

const staticColumnsEdit = ({
  basePath,
  enabledPath,
}: CorrectiveFactorsColumnsConfig) => [
  {
    title: <FormattedMessage id='data.users.permission.field' />,
    dataIndex: 'key',
    render: (name: string) =>
      renderWithEnabled(enabledPath, (enabled) => (
        <SpanIntl
          prefix='ui.settings.corrective_factors.fields.'
          value={getFieldName(name)}
          style={getTextStyle(enabledPath, enabled)}
        />
      )),
  },
  {
    title: <FormattedMessage id='data.users.permission.global' />,
    dataIndex: 'global_value',
    render: (value: number | string) =>
      renderWithEnabled(enabledPath, (enabled) => (
        <SpanNumber
          scale={getFieldScale(basePath)}
          value={Number(value)}
          style={getTextStyle(enabledPath, enabled)}
        />
      )),
  },
  {
    title: <FormattedMessage id='data.users.permission.override' />,
    dataIndex: 'value',
    render: (_value: number | string, record: any, index: number) => {
      const { min, max } = getCorrectiveFactorRange(
        basePath,
        getFieldName(record.key),
      )
      const scale = getFieldScale(basePath)

      return renderWithEnabled(enabledPath, (enabled) => (
        <FieldDecimalNumber
          scale={scale}
          name={getValuePath(basePath, index)}
          hideLabel
          disabled={Boolean(enabledPath) && !enabled}
          min={min}
          max={max}
        />
      ))
    },
  },

  {
    title: (
      <FormattedMessage id='data.users.permission.corrective_factors_status' />
    ),
    dataIndex: 'value',
    render: (_value: number | string, record: any, index: number) =>
      renderWithValue(getValuePath(basePath, index), null, (value) =>
        _.isNil(value) ? (
          <Popover
            trigger='hover'
            content={popOver(record.global_value, value)}
          >
            <CheckCircleOutlined style={{ color: '#35c2a0' }} />
          </Popover>
        ) : (
          <Popover
            trigger='hover'
            content={popOver(record.global_value, value)}
          >
            {' '}
            <WarningOutlined style={{ color: '#F3BB5D' }} />
          </Popover>
        ),
      ),
  },
]

export { staticColumnsDetail, staticColumnsEdit }
