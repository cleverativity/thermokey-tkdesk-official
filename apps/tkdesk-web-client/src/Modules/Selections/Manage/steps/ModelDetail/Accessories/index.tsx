import { Col } from 'antd'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import { useFormikContext } from 'formik'

import { useAccessoryEngine } from 'Generic/hooks'
import { useAuthorization } from 'Modules/App/Authorization'

import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
  StyledTable,
  StyledInputSearch,
  StyledButton,
} from 'Components/Styled'
import { FieldDecimalNumber, FieldInput } from 'Components/Field'

import {
  staticColumns,
  ExpandedTable,
} from 'Model/Selections/steps/ModelDetail/accessoriesTable'
import { removeColumns } from 'Model/table'

import RightSide from './RightSide'

const removeCustomAccessoryById = (
  accessories: any[] = [],
  accessoryId: string,
) =>
  _.chain(accessories)
    .map((accessory) => {
      if (!_.get(accessory, 'isCustomGroup', false)) {
        return accessory
      }

      return {
        ...accessory,
        items: _.filter(
          _.get(accessory, 'items', []),
          (item) => _.get(item, 'id') !== accessoryId,
        ),
      }
    })
    .filter(
      (accessory) =>
        !_.get(accessory, 'isCustomGroup', false) ||
        !_.isEmpty(_.get(accessory, 'items', [])),
    )
    .value()

const Accessories = ({ onEditCustomData }: any) => {
  const { values }: any = useFormikContext()

  const id = _.get(values, 'id')
  const detail_data = _.get(values, 'detail_data', {})
  const min_ambient_operative_temperature = _.get(
    values,
    'input_data.air.min_operative_temperature.value',
    null,
  )
  const accessories = _.get(detail_data, 'accessories', [])

  const [query, setQuery] = useState('')
  const autho = useAuthorization()
  const { selectedItems, selectedIds, disabledIds, toggleAccessory } =
    useAccessoryEngine(accessories)

  const authorizedStaticColumns: any = autho.iAmOem
    ? removeColumns(['print_code', 'price'], staticColumns)
    : staticColumns

  const filteredAccessories = useMemo(() => {
    if (!query) return accessories

    const normalizedQuery = _.toLower(query).trim()

    return _.reduce(
      accessories,
      (result: any[], accessory: any, sourceIndex: number) => {
        const items = _.get(accessory, 'items', [])

        const filteredItems = _.filter(items, (item: any) =>
          _.includes(
            _.toLower(_.get(item, 'description', '')),
            normalizedQuery,
          ),
        )

        if (_.isEmpty(filteredItems)) return result

        return [
          ...result,
          {
            ...accessory,
            sourceIndex,
            items: filteredItems,
          },
        ]
      },
      [],
    )
  }, [accessories, query])

  const handleDeleteCustomAccessory = (accessoryId: string) => {
    if (_.isNil(onEditCustomData) || _.isNil(id) || _.isNil(accessoryId)) {
      return
    }

    const nextAccessories = removeCustomAccessoryById(accessories, accessoryId)

    onEditCustomData({
      id,
      values: {
        ...detail_data,
        accessories: nextAccessories,
        custom_created_accessories: {},
      },
    })
  }

  return (
    <StyledCollapse defaultActiveKey={['7']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='7'
        header='ui.selections.steps.model_detail.accessories'
      >
        <StyledRow>
          <Col sm={24} lg={12}>
            <StyledInputSearch
              name='accessories'
              placeholder='data.users.input'
              query={query}
              onChangeQuery={setQuery}
              style={{ marginBottom: '24px' }}
            />

            <StyledTable
              rowKey={(record: any) => _.get(record, 'id', '')}
              loading={false}
              dataSource={filteredAccessories}
              pagination={false}
              scroll={{ y: 70 * 5 }}
              tableLayout='auto'
              columns={authorizedStaticColumns}
              expandable={{
                expandedRowRender: (record: any, index: any) => (
                  <ExpandedTable
                    record={record}
                    index={index}
                    admin={autho.iAmAdmin}
                    oem={autho.iAmOem}
                    minAmbOpTemp={min_ambient_operative_temperature}
                    selectedIds={selectedIds}
                    disabledIds={disabledIds}
                    toggleAccessory={toggleAccessory}
                    onDeleteCustomAccessory={handleDeleteCustomAccessory}
                  />
                ),
              }}
            />
          </Col>
          <Col sm={24} lg={12}>
            <RightSide
              selectedItems={selectedItems}
              disabledIds={disabledIds}
              toggleAccessory={toggleAccessory}
              onDeleteCustomAccessory={handleDeleteCustomAccessory}
            />
          </Col>
        </StyledRow>

        {autho.iAmAdmin && (
          <StyledRow style={{ marginTop: '24px', alignItems: 'center' }}>
            <FieldInput
              span={{ sm: 24, lg: 12, xl: 4 }}
              style={{ marginBottom: 0 }}
              label='data.selections.model_detail.code'
              name='detail_data.custom_created_accessories.code'
            />
            <FieldInput
              span={{ sm: 24, lg: 12, xl: 4 }}
              label='data.selections.model_detail.description'
              name='detail_data.custom_created_accessories.description'
            />
            <FieldInput
              span={{ sm: 24, lg: 12, xl: 4 }}
              label='data.selections.model_detail.print_code'
              name='detail_data.custom_created_accessories.print_code'
            />
            <FieldDecimalNumber
              span={{ sm: 24, lg: 12, xl: 4 }}
              label='data.selections.model_detail.price'
              name='detail_data.custom_created_accessories.price'
              addonAfter='€'
            />
            <StyledButton
              id='button.custom_created_accessories.save'
              type='primary'
              label='data.selections.model_detail.add_accessory'
              onClick={() => onEditCustomData({ id, values: detail_data })}
            />
          </StyledRow>
        )}
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Accessories
