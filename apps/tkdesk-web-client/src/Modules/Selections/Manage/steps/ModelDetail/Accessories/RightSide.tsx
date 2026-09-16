import { useEffect, useState } from 'react'
import { useFormikContext } from 'formik'
import _ from 'lodash'
import { List, Row } from 'antd'

import { useAuthorization } from 'Modules/App/Authorization'

import { FieldDecimalNumber, FieldPercentage } from 'Components/Field'
import { StyledRow } from 'Components/Styled'
import { SpanIntl } from 'Components/Span'

import { renderItem } from 'Model/Selections/steps/ModelDetail/accessoriesList'

const RightSide = ({
  selectedItems,
  disabledIds,
  toggleAccessory,
  onDeleteCustomAccessory,
}) => {
  const { values } = useFormikContext()
  const [discountedPrice, setDiscountedPrice] = useState(0)
  const [totalPriceAccessories, setTotalPriceAccessories] = useState(0)
  const [discountedPriceAccessories, setDiscountedPriceAccessories] =
    useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const autho = useAuthorization()

  const formikAccessories = _.get(values, 'detail_data.accessories', [])

  const price = _.get(values, 'detail_data.price.value', 0)
  const discount = _.get(values, 'detail_data.discount.value', 0)
  const accessory_discount = _.get(
    values,
    'detail_data.accessory_discount.value',
    0,
  )

  useEffect(() => {
    const mergedSelectedItems = _.map(selectedItems, (item) => {
      const updated = _.find(_.flatMap(formikAccessories, 'items'), {
        id: item.id,
      })
      return updated ? { ...item, ...updated } : item
    })

    const newDiscountedPrice = price * ((100 - (discount ?? 0)) / 100)

    const newTotalPriceAccessories = _.sumBy(mergedSelectedItems, 'price')
    const newDiscountedPriceAccessories =
      newTotalPriceAccessories * ((100 - (accessory_discount ?? 0)) / 100)

    const newTotalPrice = newDiscountedPrice + newDiscountedPriceAccessories

    setDiscountedPrice(newDiscountedPrice)
    setTotalPriceAccessories(newTotalPriceAccessories)
    setDiscountedPriceAccessories(newDiscountedPriceAccessories)
    setTotalPrice(newTotalPrice)
  }, [price, discount, accessory_discount, selectedItems, formikAccessories])

  return (
    <>
      {!autho.iAmOem && (
        <>
          <StyledRow style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FieldDecimalNumber
              disabled={autho.iAmAdmin ? false : true}
              span={{ sm: 24, lg: 12, xl: 8 }}
              name='detail_data.price'
              label='data.selections.model_detail.unit_price'
              addonAfter='€'
            />
            {autho.iAmAdmin && (
              <>
                <FieldPercentage
                  span={{ sm: 24, lg: 12, xl: 8 }}
                  name='detail_data.discount'
                  label='data.selections.model_detail.discount'
                />
                <FieldDecimalNumber
                  span={{ sm: 24, lg: 12, xl: 8 }}
                  name='detail_data.discounted_price'
                  label='data.selections.model_detail.discounted_price'
                  addonAfter='€'
                  disabled
                  value={discountedPrice}
                />
              </>
            )}
          </StyledRow>

          <StyledRow style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FieldDecimalNumber
              span={{ sm: 24, lg: 12, xl: 8 }}
              label='data.selections.model_detail.total_price_accessories'
              addonAfter='€'
              disabled
              value={totalPriceAccessories}
            />
            {autho.iAmAdmin && (
              <>
                <FieldPercentage
                  span={{ sm: 24, lg: 12, xl: 8 }}
                  name='detail_data.accessory_discount'
                  label='data.selections.model_detail.accessory_discount'
                />
                <FieldDecimalNumber
                  span={{ sm: 24, lg: 12, xl: 8 }}
                  label='data.selections.model_detail.discounted_price_accessories'
                  addonAfter='€'
                  disabled
                  value={discountedPriceAccessories}
                />
              </>
            )}
          </StyledRow>
        </>
      )}

      <Row>
        <SpanIntl
          value='data.selections.model_detail.selected_accessories'
          style={{ fontWeight: 'bold' }}
        />
        <List
          style={{
            width: '100%',
            maxHeight: '200px',
            overflowY: 'scroll',
          }}
          dataSource={selectedItems}
          renderItem={(item: any) => (
            <>
              {renderItem(item, {
                autho,
                disabled: _.includes(disabledIds, item.id),
                onToggle: toggleAccessory,
                onDeleteCustomAccessory,
              })}
            </>
          )}
        />
      </Row>

      {!autho.iAmOem && (
        <StyledRow style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 8 }}
            label='data.selections.model_detail.total_price'
            addonAfter='€'
            disabled
            value={totalPrice}
          />
        </StyledRow>
      )}
    </>
  )
}

export default RightSide
