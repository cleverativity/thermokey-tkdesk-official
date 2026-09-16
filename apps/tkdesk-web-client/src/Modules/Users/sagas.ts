import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { getUrl } from 'aws-amplify/storage'
import * as Store from 'Api/S3'
import _ from 'lodash'

import actions from 'Modules/Users/actions'
import appActions from 'Modules/App/actions'
import * as R from 'ramda'

import * as Users from 'Api/User'
import * as Settings from 'Api/Settings'
import * as Profile from 'Api/User'

import { getParams } from './selectors'
import { navigate } from 'Generic/navigation'
import { message } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'
import { getLang } from 'Modules/App/selectors'
const actionsProfile = appActions.profile

const log = new ConsoleLogger('Users/Saga')

const sagas: any = []

// ROUTES
sagas.push(takeEvery(actions.search.ROUTE, routeToUserSearch))
function* routeToUserSearch() {
  yield call(navigate, '/users')
}

sagas.push(takeEvery(actions.create.ROUTE, routeToUserCreation))
function* routeToUserCreation() {
  yield call(navigate, '/users/new')
}

sagas.push(takeEvery(actions.edit.ROUTE, routeToUserEdit))
function* routeToUserEdit({ payload }: any) {
  const { id: user_id } = payload
  yield call(navigate, `/users/${user_id}/edit`)
}

sagas.push(takeEvery(actions.detail.ROUTE, routeToUserDetail))
function* routeToUserDetail({ payload }: any) {
  const { id: user_id } = payload
  yield call(navigate, `/users/${user_id}/detail`)
}

sagas.push(takeEvery(actions.search.EXPORT, exportDownload))
function* exportDownload({ payload }: any) {
  const language: string = yield select(getLang)

  if (language === 'it') {
    message.info('Il download inizierà a breve')
  } else {
    message.info('The download will begin shortly')
  }

  try {
    log.debug('createDownloadStorageSaga.payload', { actions, payload })

    const response: { file_path: string } = yield call(Users.exportSaga)

    yield call(Store.download, response.file_path, language)

    yield put(actions.search.exportSuccess({}))
  } catch (error: any) {
    log.error(error)
    if (language === 'it') {
      message.error('Errore nel download del documento')
    } else {
      message.error('Error while downloading the document')
    }
    yield put(actions.search.exportFail({ error }))
  }
}

sagas.push(takeEvery(actions.profile.detail.ROUTE, routeToProfileDetail))
function* routeToProfileDetail() {
  yield call(navigate, '/users/profile/detail')
}

export function* get(storage_url: string) {
  const file: string = yield call(() =>
    getUrl({
      key: storage_url,
      options: {
        accessLevel: 'guest',
        expiresIn: 60,
      },
    }),
  )
  return file
}

// DOWNLOAD_EULA
sagas.push(takeEvery(actions.profile.detail.DOWNLOAD_EULA, downloadEula))
function* downloadEula(body: {
  type: string
  payload: { storage_url: string; language: string }
}) {
  const { storage_url: storageUrl, language } = body.payload // yield call(RBAC.whoIAmSaga)
  const fileUrl: string = yield call(get, storageUrl)
  log.info('fileUrl', fileUrl)

  if (_.isNil(storageUrl)) {
    if (language === 'it') {
      message.error('Errore nel download del documento')
    } else {
      message.error('Error while downloading the document')
    }
  } else {
    try {
      yield call(Store.download, storageUrl, language)
      yield put(actions.profile.detail.downloadEulaSuccess())
    } catch (error: any) {
      log.error({ error })
      yield put(actions.profile.detail.downloadEulaFail({ error }))
    }
  }
}

// UPDAYE QUERY PARAMETERS
sagas.push(
  takeEvery(
    actions.search.UPDATE_QUERY_PARAMETERS,
    searchUpdateQueryParameters,
  ),
)
function* searchUpdateQueryParameters() {
  yield put(actions.search.load())
}

// SEARCH
sagas.push(takeEvery(actions.search.LOAD, searchLoad))
function* searchLoad() {
  const params: SearchParameters = yield select(getParams)

  try {
    const { datas: users, pagination } = yield call(Users.searchSaga, params)
    log.info('searchLoad.search', { users, pagination })

    yield put(actions.search.loadSuccess({ users, pagination }))
  } catch (error: any) {
    log.error(error)
    yield put(actions.search.loadFail({ error }))
  }
}

// CREATE
sagas.push(takeEvery(actions.create.LOAD, createLoad))
function* createLoad() {
  log.info('createLoad')
  try {
    let global_settings: SettingFront[] = yield call(
      Settings.getCorrectiveFactorsSaga,
    )
    log.info('createLoad.globalSettings', { settings: global_settings })
    yield put(actions.create.loadSuccess({ settings: global_settings }))
  } catch (error: any) {
    log.error('createLoad', { error })
    yield put(actions.create.loadFail({ error }))
  }
}

// EDIT
sagas.push(takeEvery(actions.edit.LOAD, editLoad))
function* editLoad({ payload }: any) {
  const { user_id } = payload
  log.info('editLoad')
  try {
    const user: User = yield call(Users.getUserSaga, user_id)

    const global_settings: {} = yield call(Settings.getCorrectiveFactorsSaga)

    const newUser = { ...user, global_settings }
    // yield setTimeout(() => log.info('calcLoad.inside'), 1000)
    log.info('editLoad.newUser', { user: newUser })
    yield put(actions.edit.loadSuccess({ user: newUser }))
  } catch (error: any) {
    log.error('editLoad', { error })
    yield put(actions.edit.loadFail({ error }))
  }
}

// CREATION COMPLETE
sagas.push(takeEvery(actions.create.COMPLETE, creationComplete))
function* creationComplete({ payload }: any) {
  const { user } = payload
  log.info('creationComplete.user', user)
  try {
    const createdUser: User = yield call(Users.createUserSaga, user)
    const userId = R.propOr(null, 'id', createdUser)
    yield put(actions.create.completeSuccess({ user: createdUser }))
    yield put(actions.detail.route({ id: userId }))
  } catch (error: any) {
    yield put(actions.create.completeFail({ error }))
  }
}

// EDIT COMPLETE
sagas.push(takeEvery(actions.edit.COMPLETE, editComplete))
function* editComplete({ payload }: any) {
  const { user } = payload
  log.info('editComplete.user', user)
  try {
    const editedUser: User = yield call(Users.editUserSaga, user)
    const userId = R.propOr(null, 'id', editedUser)

    const profile: User = yield call(Profile.whoAmISaga)

    yield put(actionsProfile.loadSuccess({ profile }))
    yield put(actions.edit.completeSuccess({ user: editedUser }))
    yield put(actions.detail.route({ id: userId }))
  } catch (error: any) {
    yield put(actions.edit.completeFail({ error }))
  }
}

// DETAIL
sagas.push(takeEvery(actions.detail.LOAD, detailLoad))
function* detailLoad({ payload }: any) {
  const { user_id } = payload
  log.info('detailLoad')
  try {
    const user: User = yield call(Users.getUserSaga, user_id)
    const global_settings: {} = yield call(Settings.getCorrectiveFactorsSaga)

    log.info('detailLoad.globalSetting', { user, global_settings })
    const newUser = { ...user, global_settings }
    yield put(actions.detail.loadSuccess({ user: newUser }))
  } catch (error: any) {
    log.error('detailLoad', { error })
    yield put(actions.detail.loadFail({ error }))
  }
}

// EDIT VALIDITY
sagas.push(takeEvery(actions.detail.EDIT_VALIDITY, editValidity))
function* editValidity({ payload }: any) {
  const { user } = payload
  log.info('editValidity.user', user)
  try {
    const editedUser: User = yield call(Users.editUserSaga, user)
    log.info('editValidity.editedUser', editedUser)
    const userId = R.propOr(null, 'id', editedUser)
    log.info('editValidity.userId', userId)
    yield put(actions.detail.editValiditySuccess({ user: editedUser }))
    yield put(actions.detail.load({ user_id: userId }))
  } catch (error: any) {
    yield put(actions.detail.editValidityFail({ error }))
  }
}

// ACTIVATE
sagas.push(takeEvery(actions.detail.ACTIVATE, activateUser))
function* activateUser({ payload }: any) {
  const { id, expiration_date } = payload
  log.info('activateUser.payload', payload)
  try {
    yield call(Users.activateUserSaga, id, expiration_date)
    // log.info('editValidity.editedUser', activatedUser)
    // const userId = R.propOr(null, 'id', activatedUser)
    // log.info('editValidity.userId', userId)
    yield put(actions.detail.activateSuccess())
    yield put(actions.detail.load({ user_id: id }))
  } catch (error: any) {
    yield put(actions.detail.activateFail({ error }))
  }
}

// ACTIVATE
sagas.push(takeEvery(actions.detail.DELETE, deleteUser))
function* deleteUser({ payload }: any) {
  const { id } = payload
  log.info('deleteUser.payload', payload)
  try {
    yield call(Users.deleteUserSaga, id)
    // log.info('editValidity.editedUser', activatedUser)
    // const userId = R.propOr(null, 'id', activatedUser)
    // log.info('editValidity.userId', userId)
    yield put(actions.detail.deleteSuccess())
    yield put(actions.search.route())
  } catch (error: any) {
    yield put(actions.detail.deleteFail({ error }))
  }
}

// ACTIVATE
sagas.push(takeEvery(actions.detail.RESEND_SIGN_UP, resendSignUp))
function* resendSignUp({ payload }: any) {
  const { username, language } = payload
  log.info('resendSignUp.payload', payload)

  try {
    const user: User = yield call(Users.resendSignUpSaga, username)

    if (language === 'it') {
      message.success('Reinvio credenziali avvenuto con successo')
    } else {
      message.success('Resending credentials successful')
    }
    yield put(actions.detail.resendSignUpSuccess({ user }))
  } catch (error: any) {
    yield put(actions.detail.resendSignUpFail({ error }))
    // log.info('error resending code: ', error)
  }
}

export default function* rootSaga() {
  yield all(sagas)
}
