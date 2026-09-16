import { createAction } from '@reduxjs/toolkit'
import { ConsoleLogger } from 'aws-amplify/utils'
import {
  getAsyncActions,
  getAsyncActionsFunctions,
  getRouteLoadActions,
  getRouteLoadActionsFunctions,
  getRouteLoadQueryActions,
  getRouteLoadQueryActionsFunctions,
} from 'Generic/actions/functions'
import * as R from 'ramda'

const PREFIX = 'SELECTION'
const GENERIC_PREFIX = 'GENERIC'
const SEARCH_PREFIX = 'SEARCH'
const MANAGE_PREFIX = 'MANAGE'

const log = new ConsoleLogger('Modules/Selections/actions')

const actions: any = {
  generic: {
    ROUTE: `${PREFIX}_${GENERIC_PREFIX}_ROUTE`,

    PRELOAD: `${PREFIX}_${GENERIC_PREFIX}_PRELOAD`,
    PRELOAD_SUCCESS: `${PREFIX}_${GENERIC_PREFIX}_PRELOAD_SUCCESS`,
    PRELOAD_FAIL: `${PREFIX}_${GENERIC_PREFIX}_PRELOAD_FAIL`,
  },

  search: {
    ...getRouteLoadQueryActions(`${PREFIX}_${SEARCH_PREFIX}`),
  },

  manage: {
    ...getRouteLoadActions(`${PREFIX}_${MANAGE_PREFIX}`),
    ...getAsyncActions(`${PREFIX}_${MANAGE_PREFIX}`, [
      'RESET_STATUS',
      'SET_USE_CASE',
      'SOLVE',
      'SET_DETAIL',
      'EDIT_CUSTOM_DATA',
      'GENERATE_PDF',
      'DOWNLOAD_PDF',
      'DELETE_STEPS',
      'ACCESSORIES',
      'THERMAL_PDF_DOWNLOAD',
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
  },
  manage: {
    ...getRouteLoadActionsFunctions(actions.manage),
    ...getAsyncActionsFunctions(actions.manage, [
      'RESET_STATUS',
      'SET_USE_CASE',
      'SOLVE',
      'SET_DETAIL',
      'EDIT_CUSTOM_DATA',
      'GENERATE_PDF',
      'DOWNLOAD_PDF',
      'DELETE_STEPS',
      'ACCESSORIES',
      'THERMAL_PDF_DOWNLOAD',
    ]),
  },
}

const aa = R.mergeDeepLeft(actions, actionsFunctions)
log.debug('ASelections', aa)

export default aa
