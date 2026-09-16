import * as R from 'ramda'
import {
  getAsyncActions,
  getAsyncActionsFunctions,
  getRouteLoadActions,
  getRouteLoadActionsFunctions,
  getRouteLoadQueryActions,
  getRouteLoadQueryActionsFunctions,
} from 'Generic/actions/functions'

const PREFIX = 'FAN_MODELS'
const POLYNOMIAL_PREFIX = 'POLYNOMIALS'
const SEARCH_PREFIX = 'SEARCH'
const CREATE_PREFIX = 'CREATE'
const EDIT_PREFIX = 'EDIT'
const DETAIL_PREFIX = 'DETAIL'

const actions: any = {
  // SEARCH
  search: {
    ...getRouteLoadQueryActions(`${PREFIX}_${SEARCH_PREFIX}`),
  },

  // CREATE
  create: {
    ...getRouteLoadActions(`${PREFIX}_${CREATE_PREFIX}`),
    ...getAsyncActions(`${PREFIX}_${CREATE_PREFIX}`, [
      'COMPLETE',
      'IMPORT_FANS',
    ]),
  },

  // EDIT
  edit: {
    ...getRouteLoadActions(`${PREFIX}_${EDIT_PREFIX}`),
    ...getAsyncActions(`${PREFIX}_${EDIT_PREFIX}`, ['COMPLETE']),
  },

  // DETAIL
  detail: {
    ...getRouteLoadActions(`${PREFIX}_${DETAIL_PREFIX}`),
    ...getAsyncActions(`${PREFIX}_${DETAIL_PREFIX}`, ['DELETE']),
  },

  // POLYNOMIAL
  polynomials: {
    // SEARCH
    search: {
      ...getRouteLoadActions(`${POLYNOMIAL_PREFIX}_${SEARCH_PREFIX}`),
      ...getAsyncActions(`${POLYNOMIAL_PREFIX}_${SEARCH_PREFIX}`, ['DELETE']),
    },

    // CREATE
    create: {
      ...getAsyncActions(`${POLYNOMIAL_PREFIX}_${CREATE_PREFIX}`, ['COMPLETE']),
    },

    // EDIT
    edit: {
      ...getAsyncActions(`${POLYNOMIAL_PREFIX}_${EDIT_PREFIX}`, ['COMPLETE']),
    },
  },
}

const actionsFunctions: any = {
  // SEARCH
  search: {
    ...getRouteLoadQueryActionsFunctions(actions.search),
  },

  // CREATE
  create: {
    ...getRouteLoadActionsFunctions(actions.create),
    ...getAsyncActionsFunctions(actions.create, ['COMPLETE', 'IMPORT_FANS']),
  },

  // EDIT
  edit: {
    ...getRouteLoadActionsFunctions(actions.edit),
    ...getAsyncActionsFunctions(actions.edit, ['COMPLETE']),
  },

  // DETAIL
  detail: {
    ...getRouteLoadActionsFunctions(actions.detail),
    ...getAsyncActionsFunctions(actions.detail, ['DELETE']),
  },

  // POLYNOMIAL
  polynomials: {
    // SEARCH
    search: {
      ...getRouteLoadQueryActionsFunctions(actions.polynomials.search),
      ...getAsyncActionsFunctions(actions.polynomials.search, ['DELETE']),
    },

    // CREATE
    create: {
      ...getAsyncActionsFunctions(actions.polynomials.create, ['COMPLETE']),
    },

    // EDIT
    edit: {
      ...getAsyncActionsFunctions(actions.polynomials.edit, ['COMPLETE']),
    },
  },
}

const aa = R.mergeDeepLeft(actions, actionsFunctions)
console.debug('AFanModels', aa)

export default aa
