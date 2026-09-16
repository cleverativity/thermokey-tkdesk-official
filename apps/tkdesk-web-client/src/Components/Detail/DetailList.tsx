import _ from 'lodash'
import * as R from 'ramda'
import Detail from './Detail'
import { useIntl } from 'react-intl'
import { StyledSpinner } from 'Components/Styled'
import { SpanNumber } from 'Components/Span'
import { WarningOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import styled from 'styled-components'

interface DetailListProps {
  children?: any
  empty?: any
  transform?: any
  update_field?: boolean
  scale?: number
  limitTo?: any
  meta?: any
  [key: string]: any
}

const DetailList = (props: DetailListProps) => {
  const {
    children,
    inline = false,
    separator = ', ',
    empty = '•',
    transform = R.identity,
    update_field = false,
    scale = 2,
    limitTo = null,
    meta,
    error = null,
    ...other
  } = props
  const intl = useIntl()
  const data = children
  const errorMessage = error || _.get(meta, 'error')

  let localData = null

  const groupedKeys = ['2M', '3M', '3P', '3Q']
  const intersectedValues = _.intersection(groupedKeys, _.keys(data))

  const groupedOptions = _.pick(data, groupedKeys)
  const otherOptions = _.omit(data, groupedKeys)

  const limitToValueGrouped = !_.isNil(limitTo)
    ? groupedOptions[_.keys(groupedOptions)[0]].unit_of_measurement === 'in'
      ? limitTo.in
      : limitTo.mm
    : null

  const limitToValueGroupedString = !_.isNil(limitToValueGrouped)
    ? _.replace(String(limitToValueGrouped.toFixed(2)), '.', ',')
    : null

  if (!_.isNil(data) && !_.isEmpty(data)) {
    if (update_field) {
      localData = <StyledSpinner />
    } else {
      localData = (
        <ul
          style={{
            listStyleType: 'none' /* Remove bullets */,
            padding: 0 /* Remove padding */,
            margin: 0 /* Remove margins */,
          }}
        >
          {!_.isEmpty(groupedOptions) && (
            <li
              style={
                !_.isNil(limitToValueGrouped) &&
                _.some(
                  groupedOptions,
                  (opt) => opt.value >= limitToValueGrouped,
                )
                  ? { color: '#faad14' }
                  : {}
              }
            >
              {_.map(intersectedValues, (k, i) => {
                return (
                  <>
                    {intl.formatMessage({
                      id: `select.coils.microchannel.geom_type.${k}`,
                    })}
                    {i < intersectedValues.length - 1 ? ', ' : ':'}
                  </>
                )
              })}{' '}
              <SpanNumber
                style={
                  !_.isNil(limitToValueGrouped) &&
                  _.some(
                    groupedOptions,
                    (opt) => opt.value >= limitToValueGrouped,
                  )
                    ? { color: '#faad14' }
                    : {}
                }
                scale={scale}
                value={_.values(groupedOptions)[0]}
              />
              {!_.isNil(limitToValueGrouped) &&
              _.some(
                groupedOptions,
                (opt) => opt.value >= limitToValueGrouped,
              ) ? (
                <Popover
                  trigger='hover'
                  content={
                    <span
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage(
                          {
                            id: 'data.calculations.input_parameters.refrigerant_circuit.limit_overflow',
                          },
                          {
                            value: limitToValueGroupedString,
                            unit: Object.values(groupedOptions)[0]
                              .unit_of_measurement,
                          },
                        ) as string,
                      }}
                    ></span>
                  }
                >
                  <WarningOutlined
                    style={{
                      marginLeft: '8px',
                      color: '#faad14',
                    }}
                  />
                </Popover>
              ) : null}
            </li>
          )}
          {_.map(otherOptions, (option, key) => {
            const limitToValue = !_.isNil(limitTo)
              ? option.unit_of_measurement === 'in'
                ? limitTo.in
                : limitTo.mm
              : null

            const limitToValueString = !_.isNil(limitToValue)
              ? _.replace(String(limitToValue.toFixed(2)), '.', ',')
              : null

            return (
              <li
                style={
                  !_.isNil(limitToValue) && option.value >= limitToValue
                    ? { color: '#faad14' }
                    : {}
                }
                key={key}
              >
                {`${intl.formatMessage({
                  id: `select.coils.microchannel.geom_type.${key}`,
                })}:`}{' '}
                <SpanNumber
                  style={
                    !_.isNil(limitToValue) && option.value >= limitToValue
                      ? { color: '#faad14' }
                      : {}
                  }
                  scale={scale}
                  value={option}
                />
                {!_.isNil(limitToValue) && option.value >= limitToValue ? (
                  <Popover
                    trigger='hover'
                    content={
                      <span
                        dangerouslySetInnerHTML={{
                          __html: intl.formatMessage(
                            {
                              id: 'data.calculations.input_parameters.refrigerant_circuit.limit_overflow',
                            },
                            {
                              value: limitToValueString,
                              unit: option.unit_of_measurement,
                            },
                          ) as string,
                        }}
                      ></span>
                    }
                  >
                    <WarningOutlined
                      style={{
                        marginLeft: '8px',
                        color: '#faad14',
                      }}
                    />
                  </Popover>
                ) : null}
              </li>
            )
          })}
        </ul>
      )
    }
  }

  return (
    <Detail {...other}>
      {localData}
      {errorMessage && <StyledDetailError>{errorMessage}</StyledDetailError>}
    </Detail>
  )
}

const StyledDetailError = styled.div`
  color: #ff4d4f;
  margin-top: 4px;
`

export default DetailList
