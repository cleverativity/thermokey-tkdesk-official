import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useFormikContext } from 'formik'

import {
  accessoryEngine,
  getAccessoryItems,
} from 'Modules/Selections/Manage/steps/ModelDetail/functions'

const findValidation = (accessories, validation) => {
  return _.chain(getAccessoryItems(accessories))
    .filter((item) => _.get(item, `validations.${validation}`, false))
    .map('id')
    .value()
}

const applySelectedIdsToAccessories = (accessories = [], selectedIds = []) =>
  _.map(accessories, (accessory) => ({
    ...accessory,
    items: _.map(_.get(accessory, 'items', []), (item) => ({
      ...item,
      validations: {
        ..._.get(item, 'validations', {}),
        isSelected: _.includes(selectedIds, _.get(item, 'id')),
      },
    })),
  }))

const useAccessoryEngine = (accessories) => {
  const { setFieldValue } = useFormikContext()

  const autoSelected = useMemo(
    () => findValidation(accessories, 'isSelected'),
    [accessories],
  )

  const disabled = useMemo(
    () =>
      _.union(
        findValidation(accessories, 'isMandatory'),
        findValidation(accessories, 'isDisabled'),
      ),
    [accessories],
  )

  const [state, setState] = useState({
    selectedIds: autoSelected,
    disabledIds: disabled,
  })
  const { selectedIds, disabledIds } = state

  useEffect(() => {
    const nextState = {
      selectedIds: autoSelected,
      disabledIds: disabled,
    }

    setState((prev) => (_.isEqual(prev, nextState) ? prev : nextState))
  }, [autoSelected, disabled])

  const toggleAccessory = (id) => {
    const nextState = accessoryEngine(accessories, state, id)

    setState(nextState)
    setFieldValue(
      'detail_data.accessories',
      applySelectedIdsToAccessories(accessories, nextState.selectedIds),
      false,
    )
  }

  const selectedItems = _.chain(getAccessoryItems(accessories))
    .filter((item) => _.includes(selectedIds, _.get(item, 'id')))
    .value()

  return {
    selectedItems,
    selectedIds,
    disabledIds,
    toggleAccessory,
  }
}

export default useAccessoryEngine
