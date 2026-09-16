import _ from 'lodash'
import {
  getAsyncActions,
  getAsyncActionsFunctions,
  getRouteLoadActions,
  getRouteLoadActionsFunctions,
  getRouteLoadQueryActions,
  getRouteLoadQueryActionsFunctions,
} from 'Generic/actions/functions'

const PREFIX = 'ORDERS'
const SEARCH_PREFIX = 'SEARCH'
const EDIT_PREFIX = 'EDIT'
const DETAIL_PREFIX = 'DETAIL'

const actions = {
  search: {
    ...getRouteLoadQueryActions(`${PREFIX}_${SEARCH_PREFIX}`),
    ...getAsyncActions(`${PREFIX}_${EDIT_PREFIX}`, ['CHANGE_STATUS']),
  },

  detail: {
    ...getRouteLoadActions(`${PREFIX}_${DETAIL_PREFIX}`),
  },

  edit: {},
}

const actionsFunctions = {
  search: {
    ...getRouteLoadQueryActionsFunctions(actions.search),
    ...getAsyncActionsFunctions(actions.search, ['CHANGE_STATUS']),
  },

  detail: {
    ...getRouteLoadActionsFunctions(actions.detail),
  },
}

const aa = _.merge(actions, actionsFunctions)
console.debug('AOrders', aa)

export default aa
