import _ from 'lodash'
import { SpanNumber } from 'Components/Span'
import Detail from './Detail'
import { useIntl } from 'react-intl'
import { Popover } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
import { sanitizeHtml } from 'Utils/sanitizeHtml'

import colors from 'styles/colors.module.scss'

interface DetailNumberProps {
  prefix?: string
  children?: string | any
  intl?: any
  fetch?: any
  label: string
  unlocalizeLabel?: boolean
  size?: 'small' | 'medium' | 'large'
  transform?: any
  style?: { [key: string]: any }
  onClick?: any
  scale?: number
  name: string
  sign?: string
  limitTo?: any
  [key: string]: any
}

const DetailNumber = (props: DetailNumberProps) => {
  const {
    children,
    scale = 2,
    sign = 'no_sign',
    limitTo = null,
    ...other
  } = props

  const data = children

  const intl = useIntl()

  let localData = null

  if (!_.isNil(data) && !_.isEmpty(data)) {
    const limitToValue = !_.isNil(limitTo)
      ? data.unit_of_measurement === 'in'
        ? limitTo.in
        : limitTo.mm
      : null

    const limitToValueString = !_.isNil(limitToValue)
      ? _.replace(String(limitToValue.toFixed(2)), '.', ',')
      : null

    const popoverMessage = intl.formatMessage(
      {
        id: 'data.calculations.input_parameters.refrigerant_circuit.limit_overflow',
      },
      {
        value: limitToValueString,
        unit: data.unit_of_measurement,
      },
    ) as string

    localData = (
      <li
        style={
          !_.isNil(limitToValue) && data.value >= limitToValue
            ? { color: colors.warning }
            : {}
        }
      >
        <SpanNumber
          style={
            !_.isNil(limitToValue) && data.value >= limitToValue
              ? { color: colors.warning }
              : {}
          }
          scale={scale}
          value={data}
          sign={sign}
        />
        {!_.isNil(limitToValue) && data.value >= limitToValue ? (
          <Popover
            trigger='hover'
            content={
              <span
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(popoverMessage),
                }}
              ></span>
            }
          >
            <WarningOutlined
              style={{
                marginLeft: '8px',
                color: colors.warning,
              }}
            />
          </Popover>
        ) : null}
      </li>
    )
  }

  return <Detail {...other}>{localData}</Detail>
}

export default DetailNumber
