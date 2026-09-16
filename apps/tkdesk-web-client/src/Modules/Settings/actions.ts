import * as R from 'ramda'
import {
  getAsyncActions,
  getAsyncActionsFunctions,
  getRouteLoadActions,
  getRouteLoadActionsFunctions,
} from 'Generic/actions/functions'

const PREFIX = 'SETTINGS'
const CORRECTIVE_FACTORS_PREFIX = 'CORRECTIVE_FACTORS'
const REFRIGERANTS_PREFIX = 'REFRIGERANTS'
const DETAIL_PREFIX = 'DETAIL'
const EDIT_PREFIX = 'EDIT'

const actions: any = {
  //CORRECTIVE FACTORS
  corrective_factors: {
    detail: {
      ...getRouteLoadActions(
        `${PREFIX}_${CORRECTIVE_FACTORS_PREFIX}_${DETAIL_PREFIX}`,
      ),
    },

    edit: {
      ...getRouteLoadActions(
        `${PREFIX}_${CORRECTIVE_FACTORS_PREFIX}_${EDIT_PREFIX}`,
      ),
      ...getAsyncActions(
        `${PREFIX}_${CORRECTIVE_FACTORS_PREFIX}_${EDIT_PREFIX}`,
        ['COMPLETE'],
      ),
    },
  },

  //REFRIGERANTS
  refrigerants: {
    detail: {
      ...getRouteLoadActions(
        `${PREFIX}_${REFRIGERANTS_PREFIX}_${DETAIL_PREFIX}`,
      ),
    },

    edit: {
      ...getRouteLoadActions(`${PREFIX}_${REFRIGERANTS_PREFIX}_${EDIT_PREFIX}`),
      ...getAsyncActions(`${PREFIX}_${REFRIGERANTS_PREFIX}_${EDIT_PREFIX}`, [
        'COMPLETE',
      ]),
    },
  },
}

const actionsFunctions: any = {
  //CORRECTIVE FACTORS
  corrective_factors: {
    detail: {
      ...getRouteLoadActionsFunctions(actions.corrective_factors.detail),
    },

    edit: {
      ...getRouteLoadActionsFunctions(actions.corrective_factors.edit),
      ...getAsyncActionsFunctions(actions.corrective_factors.edit, [
        'COMPLETE',
      ]),
    },
  },

  //REFRIGERANTS
  refrigerants: {
    detail: {
      ...getRouteLoadActionsFunctions(actions.refrigerants.detail),
    },

    edit: {
      ...getRouteLoadActionsFunctions(actions.refrigerants.edit),
      ...getAsyncActionsFunctions(actions.refrigerants.edit, ['COMPLETE']),
    },
  },
}

const aa = R.mergeDeepLeft(actions, actionsFunctions)
console.debug('ASettings', aa)

export default aa
