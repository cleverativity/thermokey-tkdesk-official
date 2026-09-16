import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
  StyledRow,
  StyledSpinner,
  StyledTable,
} from 'Components/Styled'
import React, { useEffect } from 'react'
import _ from 'lodash'
import { ConsoleLogger } from 'aws-amplify/utils'
import { SpanIntl } from 'Components/Span'
import styled from 'styled-components'
import { Col } from 'antd'
import { FieldUnitInput, FieldDecimalNumber, FieldInput } from 'Components/Field'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import {
  staticColumns,
  ExpandedTable,
} from 'Model/Selections/thermal/ModelDetail/accessoriesTable'

const PriceRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: 10px;
`

const PriceLabel = styled.span`
  font-weight: normal;
`

const PriceValue = styled.span`
  font-weight: bold;
`

const DISCOUNT_FIELD_MAP: Record<string, 'accDiscount' | 'unitDiscount'> = {
  'accessories.accessoriesDiscount': 'accDiscount',
  'accessories.accessoriesUnitDiscount': 'unitDiscount',
}

interface AccessoriesProps {
  data?: {
    accessories: any
    accessoriesPrice?: any
    condensers?: any
  }
  loading?: boolean
  setSelectedAccessoryIds?: React.Dispatch<React.SetStateAction<number[]>>
  selectedAccessoryIds?: any
  setDiscount?: any
  discount?: any
  unitTypes: string
}
const CURRENCY_UNITS = { si: 131, ip: 131 }
const ACCESSORIES_SECTION = 'accessories'

function Accessories(props: AccessoriesProps) {
  const formik = useFormikContext<any>()
  const { values, setFieldValue } = formik
  const {
    data,
    loading,
    setSelectedAccessoryIds,
    selectedAccessoryIds,
    setDiscount,
    unitTypes,
  } = props
  const { accessories, accessoriesPrice } = data
  const log = new ConsoleLogger('Modules/Selections/Accessories')

  const accessoriesPriceField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: ACCESSORIES_SECTION,
      variable: 'accessoriesPrice',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'accessoriesPrice.accessoriesPrice',
    unitField: 'accessoriesPrice.accessoriesPriceType',
    defaultValue: accessoriesPrice?.accessoriesPrice ?? 0,
    defaultUnitIds: CURRENCY_UNITS,
  })
  const unitPriceField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: ACCESSORIES_SECTION,
      variable: 'unitPrice',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'accessoriesPrice.unitPrice',
    unitField: 'accessoriesPrice.unitPriceType',
    defaultValue: accessoriesPrice?.unitPrice ?? 0,
    defaultUnitIds: CURRENCY_UNITS,
  })
  const totalNetPriceField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: ACCESSORIES_SECTION,
      variable: 'totalNetPrice',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'accessoriesPrice.totalNetPrice',
    unitField: 'accessoriesPrice.totalNetPriceType',
    defaultValue: accessoriesPrice?.totalNetPrice ?? 0,
    defaultUnitIds: CURRENCY_UNITS,
  })

  log.info('Accessories.props', data, selectedAccessoryIds, accessoriesPrice)

  const onHandleInput = (e: any, name: string) => {
    const value = e.target.value
    log.info('onHandleInput.e:', name)

    const discountKey = DISCOUNT_FIELD_MAP[name]
    if (!discountKey) return

    setDiscount((prev: AccessoriesProps['discount']) => ({
      ...prev,
      [discountKey]: value,
    }))
  }

  useEffect(() => {
    if (!accessoriesPrice || _.isEmpty(accessoriesPrice)) return

    const fieldMap: Record<string, string | number> = {
      'accessoriesPrice.remoteModel': accessoriesPrice.remoteModel ?? '',
      'accessoriesPrice.accessoriesPrice':
        accessoriesPrice.accessoriesPrice ?? 0,
      'accessoriesPrice.unitPrice': accessoriesPrice.unitPrice ?? 0,
      'accessoriesPrice.totalNetPrice': accessoriesPrice.totalNetPrice ?? 0,
      'accessoriesPrice.accessoriesDiscount':
        accessoriesPrice.accessoriesDiscount ?? accessoriesPrice.discount ?? 0,
      'accessoriesPrice.unitDiscount': accessoriesPrice.unitDiscount ?? 0,
    }
    _.forEach(fieldMap, (value, path) => {
      setFieldValue(path, value, false)
    })
  }, [accessoriesPrice, setFieldValue])

  const accItems = _.isEmpty(accessoriesPrice?.accessoriesItems)
    ? []
    : _.map(accessoriesPrice.accessoriesItems, (x, i) => (
        <div
          key={x.item ?? i}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <span>{x.item}</span>
          <span style={{ fontWeight: 'bold' }}>{x.price} €</span>
        </div>
      ))

  const accPrice = (
    <>
      <PriceRowContainer>
        <PriceLabel>Gross Unit Price:</PriceLabel>
        <PriceValue>{_.get(accessoriesPrice, 'unitPrice', 0)} €</PriceValue>
      </PriceRowContainer>
      <PriceRowContainer>
        <PriceLabel>Accessories Price:</PriceLabel>
        <PriceValue>
          {_.get(accessoriesPrice, 'accessoriesPrice', 0)} €
        </PriceValue>
      </PriceRowContainer>
      <PriceRowContainer>
        <PriceLabel>Discount:</PriceLabel>
        <PriceValue>{_.get(accessoriesPrice, 'discount', 0)} €</PriceValue>
      </PriceRowContainer>
      <PriceRowContainer>
        <PriceLabel>Total Net Price:</PriceLabel>
        <PriceValue>{_.get(accessoriesPrice, 'totalNetPrice', 0)} €</PriceValue>
      </PriceRowContainer>
    </>
  )

  const listOfAccessories = [
    {
      label: <SpanIntl value='data.thermal.details.accessories' />,
      children: accItems,
    },
  ]
  //const listOfPrice = [
  //   {
  //     label: <SpanIntl value='data.thermal.details.summary_price' />,
  //     children: accPrice,
  //   },
  // ]

  return (
    <>
      <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '30px' }}>
        <StyledCollapsePanel
          key='1'
          header='ui.thermal.panelHeader.accessories'
        >
          {_.isEmpty(data) || loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px',
              }}
            >
              <StyledSpinner />
            </div>
          ) : (
            <>
              <StyledRow>
                <Col sm={24} lg={12}>
                  <StyledTable
                    rowKey={(record: any) => _.get(record, 'groupId', '')}
                    loading={false}
                    dataSource={accessories}
                    pagination={false}
                    scroll={{ y: 55 * 5 }}
                    tableLayout='auto'
                    columns={staticColumns}
                    expandable={{
                      expandedRowRender: (record: any, index: any) => {
                        return (
                          <>
                            <ExpandedTable
                              record={record}
                              index={index}
                              admin={null}
                              selectedIds={selectedAccessoryIds}
                              disabledIds={_.chain(record.items)
                                .filter('isDisabled')
                                .map('id')
                                .value()}
                              toggleAccessory={(id) => {
                                setSelectedAccessoryIds((prev) =>
                                  _.xor(prev, [id]),
                                )
                              }}
                            />
                          </>
                        )
                      },
                    }}
                  />
                </Col>

                <Col sm={24} lg={12}>
                  <StyledRow
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <FieldInput
                      span={{ sm: 24, md: 12, lg: 8 }}
                      name='accessoriesPrice.remoteModel'
                      scale={1}
                      label='data.thermal.new_condenser_name'
                      required
                      controls={true}
                      disabled
                      isPointed={true}
                    />
                    <FieldUnitInput
                      span={{ sm: 24, md: 12, lg: 8 }}
                      labelId='data.thermal.accessories.accessoriesPrice'
                      field={accessoriesPriceField}
                      valueName='accessoriesPrice.accessoriesPrice'
                      unitName='accessoriesPrice.accessoriesPriceType'
                      disabled
                      unitSelectWidth={128}
                    />
                    <FieldUnitInput
                      span={{ sm: 24, md: 12, lg: 8 }}
                      labelId='data.thermal.accessories.accessoriesUnitPrice'
                      field={unitPriceField}
                      valueName='accessoriesPrice.unitPrice'
                      unitName='accessoriesPrice.unitPriceType'
                      disabled
                      unitSelectWidth={128}
                    />
                  </StyledRow>
                  <StyledRow
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <FieldDecimalNumber
                      span={{ sm: 24, md: 12, lg: 8 }}
                      name='accessoriesPrice.accessoriesDiscount'
                      scale={1}
                      label='data.thermal.accessories.accessoriesDiscount'
                      required
                      controls={true}
                      isPointed={true}
                      onChange={(e) =>
                        onHandleInput(e, 'accessories.accessoriesDiscount')
                      }
                      addonAfter='%'
                    />
                    <FieldDecimalNumber
                      span={{ sm: 24, md: 12, lg: 8 }}
                      name='accessoriesPrice.unitDiscount'
                      scale={1}
                      label='data.thermal.accessories.accessoriesUnitDiscount'
                      required
                      controls={true}
                      isPointed={true}
                      onChange={(e) =>
                        onHandleInput(e, 'accessories.accessoriesUnitDiscount')
                      }
                      addonAfter='%'
                    />
                    <FieldUnitInput
                      span={{ sm: 24, md: 12, lg: 8 }}
                      labelId='data.thermal.accessories.accessoriesTotal'
                      field={totalNetPriceField}
                      valueName='accessoriesPrice.totalNetPrice'
                      unitName='accessoriesPrice.totalNetPriceType'
                      disabled
                      unitSelectWidth={128}
                    />
                  </StyledRow>
                </Col>
              </StyledRow>

              <br />
              <StyledDescriptions column={1} items={listOfAccessories} />
              {/* <br />
              <StyledDescriptions column={1} items={listOfPrice} /> */}
            </>
          )}
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Accessories
