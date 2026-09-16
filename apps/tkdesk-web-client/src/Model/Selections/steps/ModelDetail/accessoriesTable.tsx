import { useMemo } from 'react'
import _ from 'lodash'
import { FormattedMessage, useIntl } from 'react-intl'
import { Tooltip } from 'antd'
import { CloseOutlined, WarningOutlined } from '@ant-design/icons'

import { Span, SpanNumber } from 'Components/Span'
import { StyledButton, StyledTable } from 'Components/Styled'
import { FieldDecimalNumber } from 'Components/Field'

import { removeColumns } from 'Model/table'

const staticColumns = [
  {
    title: <FormattedMessage id='data.selections.model_detail.code' />,
    dataIndex: 'order',
    width: 120,
    render: () => null,
  },
  {
    title: <FormattedMessage id='data.selections.model_detail.description' />,
    dataIndex: 'type',
    render: (value: string, record: any) =>
      record?.isCustomGroup ? (
        <FormattedMessage id='data.selections.model_detail.custom_accessories' />
      ) : (
        <Span value={value} />
      ),
  },
  {
    key: 'print_code',
    title: <FormattedMessage id='data.selections.model_detail.print_code' />,
    width: 100,
  },
  {
    key: 'price',
    title: <FormattedMessage id='data.selections.model_detail.price' />,
    width: 150,
  },
]

const ExpandedTable = ({
  record,
  index,
  admin,
  oem,
  minAmbOpTemp,
  selectedIds,
  disabledIds,
  toggleAccessory,
  onDeleteCustomAccessory,
}: any) => {
  const { items = [], isCustomGroup = false } = record

  const intl = useIntl()

  const columns = useMemo(() => {
    const baseColumns = [
      {
        dataIndex: 'code',
        width: 100,
        render: (code: string, item: any) => {
          const maxOpTemp = _.get(item, 'maxOpTemp')
          const showWarning =
            maxOpTemp <= minAmbOpTemp &&
            !_.isNil(maxOpTemp) &&
            !_.isNil(minAmbOpTemp)

          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {showWarning && (
                <Tooltip
                  title={intl.formatMessage({
                    id: 'data.selections.model_detail.warning',
                  })}
                >
                  <WarningOutlined style={{ color: '#faad14' }} />
                </Tooltip>
              )}

              <Span value={code} />
            </div>
          )
        },
      },
      {
        dataIndex: 'description',
        render: (value: string) => <Span value={value} whiteSpace='normal' />,
      },
      {
        dataIndex: 'printCode',
        width: 100,
        render: (value: string) => (admin ? <Span value={value} /> : null),
      },
      {
        dataIndex: 'price',
        width: 150,
        render: (value: any, item: any, itemIndex: number) => {
          const id = _.get(item, 'id', null)
          const isDisabled = _.includes(disabledIds, id)

          if (admin && !isCustomGroup) {
            return (
              <FieldDecimalNumber
                hideLabel
                disabled={isDisabled}
                name={`detail_data.accessories[${index}].items[${itemIndex}].price`}
                addonAfter='€'
              />
            )
          }

          return <SpanNumber value={{ value, unit_of_measurement: '€' }} />
        },
      },
    ]

    if (!isCustomGroup || !admin) {
      return baseColumns
    }

    return [
      {
        key: 'customAccessoryAction',
        width: 48,
        render: (_value: any, item: any) => {
          const itemId = _.get(item, 'id', null)
          const buttonId = _.kebabCase(String(itemId || 'custom-accessory'))

          return (
            <StyledButton
              id={`button.custom_created_accessories.delete.${buttonId}`}
              type='link'
              icon={<CloseOutlined />}
              onClick={() => onDeleteCustomAccessory?.(itemId)}
              style={{ padding: 0, minWidth: 'auto' }}
            />
          )
        },
      },
      ...baseColumns,
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    admin,
    disabledIds,
    index,
    isCustomGroup,
    minAmbOpTemp,
    onDeleteCustomAccessory,
  ])

  const authorizedColumns = useMemo(
    () => (oem ? removeColumns(['printCode', 'price'], columns) : columns),
    [columns, oem],
  )

  const components = useMemo(
    () => ({
      body: {
        row: (props) => {
          const rowKey = _.get(props, 'data-row-key', null)
          const isDisabled = _.includes(disabledIds, rowKey)
          const item = _.find(items, (e) => _.get(e, 'id') === rowKey)

          const isMandatory = _.get(item, 'validations.isMandatory', false)
          const fatherAccessoryCodes = _.get(
            item,
            'validations.fatherAccessoryCodes',
            [],
          )

          const fatherAccessoryCodesFormatted = intl.formatList(
            fatherAccessoryCodes,
            { type: 'disjunction' },
          )

          return isDisabled ? (
            <Tooltip
              placement='topLeft'
              title={intl.formatMessage(
                {
                  id: isMandatory
                    ? 'data.selections.model_detail.is_mandatory'
                    : 'data.selections.model_detail.disabled',
                },
                { number: fatherAccessoryCodesFormatted },
              )}
            >
              <tr {...props} />
            </Tooltip>
          ) : (
            <tr {...props} />
          )
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabledIds, items],
  )

  const rowSelection = useMemo(() => {
    if (isCustomGroup) {
      return undefined
    }

    return {
      hideSelectAll: true,
      selectedRowKeys: selectedIds,
      onSelect: (item: any) => {
        toggleAccessory(_.get(item, 'id', null))
      },
      getCheckboxProps: (item: any) => ({
        disabled: _.includes(disabledIds, _.get(item, 'id', '')),
      }),
    }
  }, [disabledIds, isCustomGroup, selectedIds, toggleAccessory])

  return (
    <StyledTable
      showHeader={false}
      loading={false}
      rowKey={(record: any) => _.get(record, 'id', '')}
      columns={authorizedColumns}
      dataSource={items}
      pagination={false}
      rowSelection={rowSelection}
      rowClassName={(item) =>
        _.includes(disabledIds, _.get(item, 'id', '')) ? 'disabled-row' : ''
      }
      components={components}
    />
  )
}

export { staticColumns, ExpandedTable }
