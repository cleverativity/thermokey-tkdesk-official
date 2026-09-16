import { ConsoleLogger } from 'aws-amplify/utils'
import _ from 'lodash'
import * as T from 'Model/table'

const log = new ConsoleLogger('Model/Table')

export const createUpdateQueryParametersCase = (
  initState: any,
  state: any,
  action: any
) => {
  const completeInitState = T.createParams(initState)
  const { params } = action.payload
  const { pagination: newPagination } = params
  const { pagination: oldPagination } = state?.params

  const newState = _.flow(
    // reset pagination if necessary
    (s) => {
      // if the pagination is the same imply that an order
      // or a filter is changed, so that the paginatio has
      // to be reinitialized
      if (
        _.isEqual(
          _.get(newPagination, 'current'),
          _.get(oldPagination, 'current')
        )
      ) {
        return {
          ...s,
          pagination: undefined,
        }
      }
      // changed pagination
      return s
    },

    // force orders when is not decleared
    // using default initState
    (s) => {
      if (_.isNil(_.get(s, 'orders.order'))) {
        return _.set(s, 'orders', _.get(completeInitState, 'orders'))
      }

      return s
    },

    // add every missing parameters
    T.createParams
  )(params)

  return { ...state, params: { ...newState } }
}
