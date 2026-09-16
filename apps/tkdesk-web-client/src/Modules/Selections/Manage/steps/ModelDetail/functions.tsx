import _ from 'lodash'

import * as APISelections from 'Api/Selections/api/endpoints'

import * as MS from 'Model/Selections/marshal'

export const getAccessoryItems = (accessories = []) =>
  _.chain(accessories).flatMap('items').value()

const findItemById = (accessories, id) =>
  _.chain(getAccessoryItems(accessories)).find({ id }).value()

const getValidationIds = (item, key) => {
  const value = _.get(item, `validations.${key}`, [])

  return _.isArray(value) ? value : []
}

const hasSelectedParentWithValidation = (
  accessories,
  selectedIds,
  validationKey,
  targetId,
) =>
  _.chain(selectedIds)
    .map((selectedId) => findItemById(accessories, selectedId))
    .filter(Boolean)
    .some((selectedItem) =>
      _.includes(getValidationIds(selectedItem, validationKey), targetId),
    )
    .value()

export const accessoryEngine = (accessories, prevState, toggledId) => {
  let selectedIds = [...prevState.selectedIds]
  let disabledIds = [...prevState.disabledIds]

  const item = findItemById(accessories, toggledId)
  if (!item) return prevState

  const {
    notCompatibleAccessoryIds = [],
    mutualExclusionAccessoryIds = [],
    autoSelectedAccessoryIds = [],
    childAccessoryIds = [],
  } = _.get(item, 'validations', {})

  const isSelecting = !_.includes(selectedIds, toggledId)

  if (isSelecting) {
    selectedIds = _.union(selectedIds, [toggledId])

    _.forEach(notCompatibleAccessoryIds, (id) => {
      _.remove(selectedIds, (selectedId) => selectedId === id)

      disabledIds = _.union(disabledIds, [id])
    })

    _.forEach(mutualExclusionAccessoryIds, (id) => {
      _.remove(selectedIds, (selectedId) => selectedId === id)
    })

    _.forEach(autoSelectedAccessoryIds, (id) => {
      selectedIds = _.union(selectedIds, [id])
    })

    _.forEach(childAccessoryIds, (id) => {
      _.remove(disabledIds, (selectedId) => selectedId === id)
    })
  } else {
    _.remove(selectedIds, (selectedId) => selectedId === toggledId)

    _.forEach(childAccessoryIds, (id) => {
      const isChildStillEnabledByAnotherParent =
        hasSelectedParentWithValidation(
          accessories,
          selectedIds,
          'childAccessoryIds',
          id,
        )

      if (!isChildStillEnabledByAnotherParent) {
        _.remove(selectedIds, (selectedId) => selectedId === id)
        disabledIds = _.union(disabledIds, [id])
      }
    })

    _.forEach(notCompatibleAccessoryIds, (id) => {
      const isStillIncompatibleWithAnotherSelected =
        hasSelectedParentWithValidation(
          accessories,
          selectedIds,
          'notCompatibleAccessoryIds',
          id,
        )

      if (!isStillIncompatibleWithAnotherSelected) {
        _.remove(disabledIds, (disabledId) => disabledId === id)
      }
    })

    _.forEach(autoSelectedAccessoryIds, (id) => {
      const isStillAutoSelectedByAnotherParent =
        hasSelectedParentWithValidation(
          accessories,
          selectedIds,
          'autoSelectedAccessoryIds',
          id,
        )

      if (!isStillAutoSelectedByAnotherParent) {
        _.remove(selectedIds, (selectedId) => selectedId === id)
      }
    })
  }

  return { selectedIds, disabledIds }
}

const mergeConnectionAccessories = (
  accessories = [],
  connectionAccessories = [],
) => {
  const marshaledAccessories = MS.marshalAccessoriesFrom({
    accessories: connectionAccessories,
  })

  const connectionItemsById = _.chain(marshaledAccessories)
    .flatMap('items')
    .keyBy('id')
    .value()

  return _.map(accessories, (accessory) => ({
    ...accessory,
    items: _.map(_.get(accessory, 'items', []), (item) => {
      const connectionItem = _.get(connectionItemsById, _.get(item, 'id'))

      return {
        ...item,
        ...connectionItem,
        validations: {
          ..._.get(item, 'validations', {}),
          ..._.get(connectionItem, 'validations', {}),
        },
      }
    }),
  }))
}

export const calculateConnectionSpeed = async (
  { id, general_info, accessories = [] },
  setFieldValue,
) => {
  if (!_.isNil(id) && !_.isEmpty(general_info) && !_.isNil(general_info)) {
    const { data } = await APISelections.updateConnectionSpeed(id, general_info)

    const {
      inlet_connection_velocity,
      outlet_connection_velocity,
      inner_volume,
      connectionAccessories = [],
    } = data

    setFieldValue(
      'detail_data.general_info.inlet_connection_velocity.value',
      inlet_connection_velocity,
    )
    setFieldValue(
      'detail_data.general_info.outlet_connection_velocity.value',
      outlet_connection_velocity,
    )

    setFieldValue('detail_data.general_info.inner_volume.value', inner_volume)

    if (_.has(data, 'connectionAccessories')) {
      setFieldValue(
        'detail_data.accessories',
        mergeConnectionAccessories(accessories, connectionAccessories),
        false,
      )
    }
  }
}
