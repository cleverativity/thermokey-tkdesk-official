import { ConsoleLogger } from 'aws-amplify/utils'
import _ from 'lodash'

import * as T from 'Model/table'

const log = new ConsoleLogger('Model/Calculations/Marshal')

export { marshalCalculationFrom } from './marshalFrom'
export { marshalCalculationTo } from './marshalTo'

export function marshalParamsFrom(params: any) {
  log.debug('marshalParamsFrom.before', { params })

  const pickedParams = _.pick(params, ['filters', 'ranges'])
  const filters = _.get(pickedParams, 'filters', {})
  const ranges = _.get(pickedParams, 'ranges', {})

  return {
    filters: _.mapValues(filters, (val: any[]) =>
      _.isUndefined(val) ? val : val[0],
    ),
    ranges,
  }
}

export function marshalFileters(filters: any) {
  log.debug('marshalFileters.before', { filters })

  filters = _.omit(filters, 'status')

  let newFilters: any = T.marshalFilterTo(filters)

  newFilters = [
    ...newFilters,
    {
      field: 'status',
      values: ['completed'],
    },
  ]

  log.info('marshalFileters.after', { newFilters })

  return newFilters
}

export function marshalFanModelsFrom(fan_models: any) {
  return _.map(fan_models, (fan_model: any) => ({
    value: _.get(fan_model, 'internal_code', ''),
    label: _.get(fan_model, 'model_code', ''),
  }))
}
