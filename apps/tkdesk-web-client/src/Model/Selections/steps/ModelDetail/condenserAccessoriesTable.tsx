import { useMemo } from 'react'
import _ from 'lodash'

import { Tooltip } from 'antd'
import { FieldDecimalNumber } from 'Components/Field'
import { Span, SpanNumber } from 'Components/Span'
import { StyledTable } from 'Components/Styled'
import { useFormikContext } from 'formik'

import { FormattedMessage, useIntl } from 'react-intl'

const staticColumns = [
  {
    title: <FormattedMessage id='data.selections.model_detail.code' />,
    dataIndex: 'groupId',
    render: (code: string) => <Span value={code} />,
  },
  {
    title: <FormattedMessage id='data.selections.model_detail.description' />,
    dataIndex: 'items',
    render: (value: string) => <Span value={value} />,
  },
  {
    title: <FormattedMessage id='data.selections.model_detail.print_code' />,
    width: 100,
  },
  {
    title: <FormattedMessage id='data.selections.model_detail.price' />,
    width: 150,
  },
]

const ExpandedTable = ({
  record,
  index,
  admin,
  selectedIds,
  disabledIds,
  toggleAccessory,
}: any) => {
  const intl = useIntl()
  const formikContext = useFormikContext()

  const data = _.get(record, 'items', [])

  const columns = useMemo(
    () => [
      {
        dataIndex: 'id',
        render: (id: string) => <Span value={id} />,
      },
      {
        dataIndex: 'code',
        render: (code: string) => <Span value={code} />,
      },
      {
        dataIndex: 'description',
        render: (value: string) => <Span value={value} whiteSpace='normal' />,
      },
      {
        dataIndex: 'printCode',
        width: 100,
        render: (value: string) => <Span value={value} />,
      },
      {
        dataIndex: 'price',
        width: 150,
        render: (value: any, item: any, itemIndex: number) => {
          const isDisabled = _.includes(disabledIds, _.get(item, 'id', null))

          return admin ? (
            <FieldDecimalNumber
              hideLabel
              disabled={isDisabled}
              name={`detail_data.accessories[${index}].items[${itemIndex}].price`}
              addonAfter='€'
            />
          ) : (
            <SpanNumber value={{ value, unit_of_measurement: '€' }} />
          )
        },
      },
    ],
    [admin, disabledIds, index],
  )

  const components = useMemo(
    () => ({
      body: {
        row: (props) => {
          const rowKey = _.get(props, 'data-row-key', null)
          const isDisabled = _.includes(disabledIds, rowKey)
          const item = _.find(data, (e) => _.get(e, 'id') === rowKey)

          const isMandatory = _.get(item, 'validations.isMandatory', false)
          const fatherAccessoryIds = _.get(
            item,
            'validations.fatherAccessoryIds',
            [],
          )

          const fatherAccessoryIdsFormatted = intl.formatList(
            fatherAccessoryIds,
            { type: 'conjunction' },
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
                { number: fatherAccessoryIdsFormatted },
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
    [disabledIds, data, intl],
  )

  return (
    <StyledTable
      showHeader={false}
      loading={false}
      rowKey={(record: any) => _.get(record, 'id', '')}
      columns={columns}
      dataSource={data}
      pagination={false}
      rowSelection={{
        hideSelectAll: true,
        selectedRowKeys: selectedIds,
        onSelect: (item, selected) => {
          toggleAccessory(item.id)

          const itemIndex = _.findIndex(
            _.get(
              formikContext.values,
              ['detail_data', 'accessories', index, 'items'],
              [],
            ),
            { id: item.id },
          )

          formikContext.setFieldValue(
            `detail_data.accessories[${index}].items[${itemIndex}].validations.isSelected`,
            selected,
          )
        },
        getCheckboxProps: (item) => ({
          disabled: _.includes(disabledIds, _.get(item, 'id', '')),
        }),
      }}
      rowClassName={(item) =>
        _.includes(disabledIds, _.get(item, 'id', '')) ? 'disabled-row' : ''
      }
      components={components}
    />
  )
}

export { staticColumns, ExpandedTable }
