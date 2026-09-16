import * as R from 'ramda'
import {
  getAsyncActions,
  getAsyncActionsFunctions,
  getRouteLoadActions,
  getRouteLoadActionsFunctions,
  getRouteLoadQueryActions,
  getRouteLoadQueryActionsFunctions,
} from 'Generic/actions/functions'

const PREFIX = 'USERS'
const PROFILE_PREFIX = 'PROFILE'
const SEARCH_PREFIX = 'SEARCH'
const CREATE_PREFIX = 'CREATE'
const EDIT_PREFIX = 'EDIT'
const DETAIL_PREFIX = 'DETAIL'

const actions = {
  // SEARCH
  search: {
    ...getRouteLoadQueryActions(`${PREFIX}_${SEARCH_PREFIX}`),
    ...getAsyncActions(`${PREFIX}_${SEARCH_PREFIX}`, ['EXPORT']),
  },

  // CREATE
  create: {
    ...getRouteLoadActions(`${PREFIX}_${CREATE_PREFIX}`),
    ...getAsyncActions(`${PREFIX}_${CREATE_PREFIX}`, ['COMPLETE']),
  },

  edit: {
    ...getRouteLoadActions(`${PREFIX}_${EDIT_PREFIX}`),
    ...getAsyncActions(`${PREFIX}_${EDIT_PREFIX}`, ['COMPLETE']),
  },

  detail: {
    ...getRouteLoadActions(`${PREFIX}_${DETAIL_PREFIX}`),
    ...getAsyncActions(`${PREFIX}_${DETAIL_PREFIX}`, [
      'EDIT_VALIDITY',
      'ACTIVATE',
      'DELETE',
      'RESEND_SIGN_UP',
    ]),
  },

  // PROFILE
  profile: {
    detail: {
      ...getRouteLoadActions(`${PREFIX}_${PROFILE_PREFIX}`),

      // DOWNLOAD_EULA
      ...getAsyncActions(`${PREFIX}`, ['DOWNLOAD_EULA']),
    },
    edit: {},
  },
}

const actionsFunctions = {
  // SEARCH
  search: {
    ...getRouteLoadQueryActionsFunctions(actions.search),
    ...getAsyncActionsFunctions(actions.search, ['EXPORT']),
  },

  // CREATE
  create: {
    ...getRouteLoadActionsFunctions(actions.create),
    ...getAsyncActionsFunctions(actions.create, ['COMPLETE']),
  },

  // EDIT
  edit: {
    ...getRouteLoadActionsFunctions(actions.edit),
    ...getAsyncActionsFunctions(actions.edit, ['COMPLETE']),
  },

  // DETAIL
  detail: {
    ...getRouteLoadActionsFunctions(actions.detail),
    ...getAsyncActionsFunctions(actions.detail, [
      'EDIT_VALIDITY',
      'ACTIVATE',
      'DELETE',
      'RESEND_SIGN_UP',
    ]),
  },

  //PROFILE
  profile: {
    detail: {
      ...getRouteLoadActionsFunctions(actions.profile.detail),

      // DOWNLOAD_EULA
      ...getAsyncActionsFunctions(actions.profile.detail, ['DOWNLOAD_EULA']),
    },
    edit: {},
  },
}

const aa = R.mergeDeepLeft(actions, actionsFunctions)
console.debug('AUsers', aa)

export default aa
