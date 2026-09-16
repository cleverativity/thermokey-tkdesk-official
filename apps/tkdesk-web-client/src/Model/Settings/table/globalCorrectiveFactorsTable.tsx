import _ from 'lodash'
import { FormattedMessage } from 'react-intl'

import { FieldDecimalNumber } from 'Components/Field'
import { SpanIntl, SpanNumber } from 'Components/Span'

const MAX_VALUE_RANGE = 3

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

const getFieldName = (name: string) => _.last(_.split(name, '.')) || ''

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

const staticColumnsDetail = (basePath: string) => [
  {
    title: <FormattedMessage id='data.users.permission.field' />,
    dataIndex: 'key',
    render: (name: string) => {
      const fieldName = getFieldName(name)

      return (
        <SpanIntl
          prefix='ui.settings.corrective_factors.fields.'
          value={fieldName}
        />
      )
    },
  },
  {
    title: <FormattedMessage id='data.users.permission.global' />,
    dataIndex: 'value',
    render: (value: number | string) => (
      <SpanNumber value={Number(value)} scale={getFieldScale(basePath)} />
    ),
  },
]

const staticColumnsEdit = (basePath) => [
  {
    title: <FormattedMessage id='data.users.permission.field' />,
    dataIndex: 'key',
    render: (name: string) => {
      const fieldName = getFieldName(name)
      return (
        <SpanIntl
          prefix='ui.settings.corrective_factors.fields.'
          value={fieldName}
        />
      )
    },
  },
  {
    title: <FormattedMessage id='data.users.permission.global' />,
    dataIndex: 'value',
    render: (value: number | string, record: any, index: number) => {
      const { min, max } = getCorrectiveFactorRange(
        basePath,
        getFieldName(record.key),
      )
      const scale = getFieldScale(basePath)

      return (
        <FieldDecimalNumber
          style={{ width: '50%' }}
          scale={scale}
          name={`${basePath}.values[${index}].value`}
          required
          hideRequired
          hideLabel
          min={min}
          max={max}
        />
      )
    },
  },
]

export { staticColumnsDetail, staticColumnsEdit }
