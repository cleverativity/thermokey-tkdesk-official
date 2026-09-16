import _ from 'lodash'
import { createAction } from '@reduxjs/toolkit'
import {
  getAsyncActionsFunctions,
  getAsyncActions,
  getRouteLoadActions,
  getRouteLoadQueryActions,
  getRouteLoadQueryActionsFunctions,
  getRouteLoadActionsFunctions,
} from 'Generic/actions/functions'

const PREFIX = 'CALCULATION'
const SEARCH_PREFIX = 'SEARCH'
const DETAIL_PREFIX = 'DETAIL'
const MANAGE_PREFIX = 'MANAGE'

const actions: any = {
  generic: {
    ROUTE: `${PREFIX}_GENERICROUTE`,

    PRELOAD: `${PREFIX}_GENERICPRELOAD`,
    PRELOAD_SUCCESS: `${PREFIX}_GENERICPRELOAD_SUCCESS`,
    PRELOAD_FAIL: `${PREFIX}_GENERICPRELOAD_FAIL`,
  },

  search: {
    ...getRouteLoadQueryActions(`${PREFIX}_${SEARCH_PREFIX}`),
    ...getAsyncActions(`${PREFIX}_${SEARCH_PREFIX}`, [
      'EXPORT',
      'EXPORT_SOLVE_REPORT',
    ]),
  },

  detail: {
    ...getRouteLoadActions(`${PREFIX}_${DETAIL_PREFIX}`),
  },

  manage: {
    ...getRouteLoadActions(`${PREFIX}_${MANAGE_PREFIX}`),
    ...getAsyncActions(`${PREFIX}_${MANAGE_PREFIX}`, [
      'SET_USE_CASE',
      'SOLVE',
      'SET_DETAIL',
      'COMPLETE',
      'RESET_STATUS',
      'CREATE_ORDER',
      'CALC_CORE_HEIGHT',
      'CALC_FLOW_RATE_AIR',
      'CALC_VELOCITY_AIR',
      'DOWNLOAD',
      'REGENERATE',
      'RECEIVED_UPDATE',
      'UPDATE_QUERY_PARAMETERS',
    ]),
  },
}

const actionsFunctions: any = {
  generic: {
    route: createAction(actions.generic.ROUTE),

    preload: createAction(actions.generic.PRELOAD),
    preloadSuccess: createAction(actions.generic.PRELOAD_SUCCESS),
    preloadFail: createAction(actions.generic.PRELOAD_FAIL),
  },

  search: {
    ...getRouteLoadQueryActionsFunctions(actions.search),
    ...getAsyncActionsFunctions(actions.search, [
      'EXPORT',
      'EXPORT_SOLVE_REPORT',
    ]),
  },

  detail: {
    ...getRouteLoadActionsFunctions(actions.detail),
  },

  manage: {
    ...getRouteLoadActionsFunctions(actions.manage),
    ...getAsyncActionsFunctions(actions.manage, [
      'SET_USE_CASE',
      'SOLVE',
      'SET_DETAIL',
      'COMPLETE',
      'RESET_STATUS',
      'CREATE_ORDER',
      'CALC_CORE_HEIGHT',
      'CALC_FLOW_RATE_AIR',
      'CALC_VELOCITY_AIR',
      'DOWNLOAD',
      'REGENERATE',
      'RECEIVED_UPDATE',
      'UPDATE_QUERY_PARAMETERS',
    ]),
  },
}

const aa = _.merge(actions, actionsFunctions)
console.debug('ACalculation', aa)

export default aa
