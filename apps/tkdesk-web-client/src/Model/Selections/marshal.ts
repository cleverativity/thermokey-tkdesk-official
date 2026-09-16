import _ from 'lodash'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Model/Selections/Marshal')
const CUSTOM_ACCESSORIES_GROUP_ID = 'custom_created_accessories'

const accessoryOrderById = (merged: any) =>
  _.chain(merged)
    .filter((item) => !_.isNil(_.get(item, 'id')))
    .keyBy('id')
    .mapValues('code')
    .value()

const getNextAccessoryGroupOrder = (accessories: any[] = []) => {
  const maxOrder = _.chain(accessories)
    .map((accessory) => Number(_.get(accessory, 'order')))
    .filter((order) => Number.isFinite(order))
    .max()
    .value()

  return Number.isFinite(maxOrder) ? maxOrder + 1 : 1
}

const createCustomCreatedAccessoriesGroup = (
  customCreatedAccessories: any[] = [],
  accessories: any[] = [],
) => {
  if (_.isEmpty(customCreatedAccessories)) {
    return null
  }

  return {
    id: CUSTOM_ACCESSORIES_GROUP_ID,
    order: getNextAccessoryGroupOrder(accessories),
    type: CUSTOM_ACCESSORIES_GROUP_ID,
    isCustomGroup: true,
    items: _.chain(customCreatedAccessories)
      .map((accessory) => {
        const code = _.get(accessory, 'code', '')

        return {
          id: code,
          order: code,
          code,
          isCustomAccessory: true,
          printCode: _.get(accessory, 'print_code', ''),
          description: _.get(accessory, 'description', ''),
          price: _.get(accessory, 'price', 0),
          validations: { isSelected: true },
        }
      })
      .sortBy('order')
      .value(),
  }
}

const appendCustomCreatedAccessoriesGroup = (
  accessories: any[] = [],
  customCreatedAccessories: any[] = [],
) => {
  const baseAccessories = _.reject(
    accessories,
    (accessory) => _.get(accessory, 'id') === CUSTOM_ACCESSORIES_GROUP_ID,
  )

  const customGroup = createCustomCreatedAccessoriesGroup(
    customCreatedAccessories,
    baseAccessories,
  )

  return _.chain(baseAccessories)
    .thru((items) => (customGroup ? _.concat(items, customGroup) : items))
    .sortBy('order')
    .value()
}

const mergePriceField = (currentField: any, value: any) => {
  if (_.isNil(value)) {
    return currentField
  }

  return _.isPlainObject(currentField) ? { ...currentField, value } : { value }
}

// FROM
export const marshalDiametersFrom = (values: any) => {
  log.debug('marshalDiametersFrom.before', values)

  const result = _.map(values, (value) => ({ key: value }))

  log.debug('marshalDiametersFrom.after', result)

  return result
}

export function marshalAccessoriesFrom(values: any) {
  log.debug('marshalAccessoriesFrom.before', values)

  const { accessories, custom_accessories, custom_created_accessories } = values

  const merged = _.map(accessories, (accessory) => {
    const custom = _.find(
      custom_accessories,
      (custom_accessory) =>
        _.get(custom_accessory, 'id', null) === _.get(accessory, 'id', null),
    )

    return custom
      ? {
          ...accessory,
          price: _.get(custom, 'price', accessory.price),
          validations: { ...accessory.validations, isSelected: true },
        }
      : accessory
  })

  const mergedWithFatherOrders = _.map(merged, (accessory) => {
    const fatherAccessoryIds = _.get(
      accessory,
      'validations.fatherAccessoryIds',
      [],
    )

    const fatherAccessoryCodes = _.chain(fatherAccessoryIds)
      .map((fatherAccessoryId) =>
        _.get(accessoryOrderById(merged), fatherAccessoryId),
      )
      .filter((code) => !_.isNil(code))
      .value()

    return {
      ...accessory,
      validations: {
        ..._.get(accessory, 'validations', {}),
        fatherAccessoryCodes,
      },
    }
  })

  const newAccessories = _.chain(mergedWithFatherOrders)
    .groupBy((item) => _.get(item, 'type.id', null))
    .map((group) => {
      const parentType = group[0].type

      const items = _.sortBy(
        _.map(group, (item) => _.omit(item, 'type')),
        'order',
      )

      return {
        ...parentType,
        items,
      }
    })
    .sortBy('order')
    .value()

  const accessoriesWithCustomCreated = appendCustomCreatedAccessoriesGroup(
    newAccessories,
    custom_created_accessories,
  )

  log.debug('marshalAccessoriesFrom.after', accessoriesWithCustomCreated)

  return accessoriesWithCustomCreated
}

export function marshalCustomDataFrom(currentValues: any, responseValues: any) {
  log.debug('marshalCustomDataFrom.before', { currentValues, responseValues })

  const savedAccessories = _.get(responseValues, 'accessories', [])

  const savedAccessoriesById = _.chain(savedAccessories)
    .filter((accessory: any) => !_.isNil(_.get(accessory, 'id')))
    .keyBy((accessory: any) => String(_.get(accessory, 'id')))
    .value()

  const mergedAccessories = _.map(
    _.get(currentValues, 'accessories', []),
    (accessory) => ({
      ...accessory,
      items: _.map(_.get(accessory, 'items', []), (item) => {
        const savedAccessory = _.get(
          savedAccessoriesById,
          String(_.get(item, 'id')),
        )

        return {
          ...item,
          price: _.get(savedAccessory, 'price', item.price),
          validations: {
            ..._.get(item, 'validations', {}),
            isSelected: !_.isNil(savedAccessory),
          },
        }
      }),
    }),
  )

  const nextAccessories = appendCustomCreatedAccessoriesGroup(
    mergedAccessories,
    _.get(responseValues, 'custom_created_accessories', []),
  )

  const detailData = {
    ...currentValues,
    accessories: nextAccessories,
    custom_created_accessories: {},
    price: mergePriceField(
      _.get(currentValues, 'price'),
      _.get(responseValues, 'prices.price'),
    ),
    discount: mergePriceField(
      _.get(currentValues, 'discount'),
      _.get(responseValues, 'prices.discount'),
    ),
    accessory_discount: mergePriceField(
      _.get(currentValues, 'accessory_discount'),
      _.get(responseValues, 'prices.accessory_discount'),
    ),
  }

  log.debug('marshalCustomDataFrom.after', detailData)

  return detailData
}

//  TO
export function marshalSelectionTo(selection) {
  log.debug('marshalSelectionTo.before', selection)

  const liquidMode = _.get(selection, 'liquid.liquid_mode.value', null)
  const airMode = _.get(selection, 'air.air_mode.value', null)

  if (liquidMode === 'outlet_temperature') {
    _.set(selection, 'liquid.flow_rate.value', null)
  } else {
    _.set(selection, 'liquid.outlet_temperature.value', null)
  }

  if (airMode === 'wet_bulb_temperature') {
    _.set(selection, 'air.humidity.value', null)
  } else {
    _.set(selection, 'air.wet_bulb_temperature.value', null)
  }

  log.debug('marshalSelectionTo.after', selection)
  return selection
}

export function marshalCustomDataTo(values: any) {
  log.debug('marshalCustomDataTo.before', values)

  const { accessories, custom_created_accessories } = values

  const standardAccessories = _.reject(accessories, (accessory) =>
    _.get(accessory, 'isCustomGroup', false),
  )

  const persistedCustomAccessories = _.chain(accessories)
    .filter((accessory) => _.get(accessory, 'isCustomGroup', false))
    .flatMap('items')
    .filter((item) => _.get(item, 'validations.isSelected', false))
    .map((item) => ({
      code: _.get(item, 'code', ''),
      print_code: _.get(item, 'printCode', ''),
      description: _.get(item, 'description', ''),
      price: _.get(item, 'price', 0),
    }))
    .value()

  const selected_accessories = _.reduce(
    standardAccessories,
    (acc: any, accessory: any) => {
      const { items } = accessory
      return _.concat(
        acc,
        _.reduce(
          items,
          (acc_item: any, item: any) => {
            const { validations } = item
            const { isSelected } = validations
            if (isSelected) {
              return _.concat(acc_item, item)
            }
            return _.concat(acc_item)
          },
          [],
        ),
      )
    },
    [],
  )

  const price = _.get(values, 'price.value', 0)
  const discount = _.get(values, 'discount.value', 0)
  const accessory_discount = _.get(values, 'accessory_discount.value', 0)

  const newAccessories = _.chain(selected_accessories)
    .map((item) => _.pick(item, ['id', 'price']))
    .value()

  const hasCustomAccessories = _.some(
    custom_created_accessories,
    (value) => !_.isNil(value) && value !== '',
  )

  const nextCustomCreatedAccessories = _.chain(persistedCustomAccessories)
    .thru((items) =>
      hasCustomAccessories
        ? _.concat(items, [custom_created_accessories])
        : items,
    )
    .value()

  const newCustomData = {
    accessories: newAccessories,
    prices: { price, discount, accessory_discount },
    custom_created_accessories: _.isEmpty(nextCustomCreatedAccessories)
      ? null
      : nextCustomCreatedAccessories,
  }

  log.debug('marshalCustomDataTo.after', newCustomData)

  return newCustomData
}

const MACHINE_PATHS = [
  'general_info.length',
  'general_info.width',
  'general_info.height',
  'general_info.weight',
  'general_info.inner_volume',
  'general_info.exchange_area',
  'general_info.inlet_connection_number',
  'general_info.inlet_connection_diameter',
  'general_info.inlet_connection_velocity',
  'general_info.outlet_connection_number',
  'general_info.outlet_connection_diameter',
  'general_info.outlet_connection_velocity',

  'performance.capacity',
  'performance.ratio',

  'liquid.volume_fraction',
  'liquid.inlet_temperature',
  'liquid.outlet_temperature',
  'liquid.flow_rate',
  'liquid.tubes_pressure_drop',
  'liquid.headers_pressure_drop',
  'liquid.pressure_drop',

  'air.outlet_temperature',
  'air.outlet_humidity',
  'air.flow_rate',
  'air.velocity',
  'air.pressure_drop',

  'ventilation.velocity',
  'ventilation.esp',
  'ventilation.single_power',
  'ventilation.nominal_single_power',
  'ventilation.total_power',
  'ventilation.nominal_total_power',
  'ventilation.single_current',
  'ventilation.nominal_single_current',
  'ventilation.total_current',
  'ventilation.nominal_total_current',

  'noise.sound_power',
  'noise.sound_pressure',

  'coil.fin_spacing',
  'coil.fin_pitch',
  'coil.inner_volume',
  'coil.exchange_area',
  'coil.inlet_header',
  'coil.outlet_header',
]

export function marshalValuesTo(values: any) {
  log.debug('marshalValuesTo.before', values)

  const newValues = {}

  for (const path of MACHINE_PATHS) {
    const value = _.get(values, path)
    if (!_.isUndefined(value)) {
      _.set(newValues, path, value)
    }
  }

  log.debug('marshalValuesTo.after', newValues)

  return newValues
}
