import _ from 'lodash'
import * as T from 'Model/table'
import { call } from 'redux-saga/effects'
import * as MU from 'Model/Users/marshal'

import * as APIProfile from 'Api/User/api/endpoints'
import * as APISettings from 'Api/Settings/api/endpoints'
import { generate } from 'json-schema-faker'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Api/Coils/api/saga')

export function* whoAmISaga() {
  const response: {
    data: { [key: string]: any }
    headers: { [key: string]: any }
    [key: string]: any
  } = yield call(APIProfile.whoAmI)

  const back_version = _.get(response, 'headers.version', null)
  log.debug('whoAmISaga.response', {
    response,
  })

  const { data } = response
  return { ...data, back_version }
}

export function* acceptEulaSaga() {
  const response: { data: { [key: string]: any } } = yield call(
    APIProfile.acceptEula,
  )

  log.debug('acceptEulaSaga.response', response)
  const { data } = response
  return data
}

export function* resetEulaSaga() {
  const response: { data: { [key: string]: any } } = yield call(
    APIProfile.resetEula,
  )

  log.debug('resetEulaSaga.response', response)
  const { data } = response
  return data
}

export function* requestCredentialsSaga(values: { [key: string]: string }) {
  const response: { data: { [key: string]: any } } = yield call(
    APIProfile.requestCredentials,
    values,
  )

  log.debug('requestCredentialsSaga.response', response)
  const { data } = response
  return data
}

export function* getAllUsersSaga() {
  const response: { data: User[] } = yield call(APIProfile.getAllUsers)

  log.debug('getAllUsersSaga.response', response)
  const { data } = response
  return data
}

export function* getUserSaga(user_id: string) {
  const response: { data: User } = yield call(APIProfile.getUser, user_id)

  log.debug('getUserSaga.response', response)
  const newUser = MU.marshalUserFrom(response.data)

  // const newUser = {
  //   ...response.data,
  //   permissions: newPermissions,
  // }
  log.debug('getUserSaga.newUser', newUser)
  return newUser
}

// SEARCH
export function* searchSaga(params: SearchParameters) {
  log.debug('searchSaga.params', params)

  const paramsTo = T.marshalParamsTo(params)
  const response: { data: User[] } = yield call(
    APIProfile.searchUsers,
    paramsTo,
  )

  log.debug('searchSaga.response', response)

  // here enrichment

  return {
    datas: response.data,
    pagination: T.marshalPaginationFrom(response),
  }
}

export function* exportSaga() {
  const response: { data: User } = yield call(APIProfile.exportUsers)
  log.debug('exportSaga.response', response)
  return response.data
}

export function* createUserSaga(user: User) {
  log.debug('createUserSaga.user', user)
  let creationSchema: any = {}
  const schema: { data: any } = yield call(APISettings.getUserPermissionSchema)
  const generationOptions = {
    useDefaultValue: true,
    optionalsProbability: 0,
    alwaysFakeOptionals: false,
  }

  while (_.isNil(creationSchema) || _.isEmpty(creationSchema)) {
    log.debug('creationSchema - Try to generate schema not null...')
    creationSchema = yield call(generate, schema.data, generationOptions)
  }

  log.debug('creationSchema', { schema, creationSchema })

  const newUser: User = MU.marshalUserTo(user, creationSchema)
  const response: { data: User } = yield call(APIProfile.createUser, newUser)
  log.debug('createUserSaga.response', response)
  const { data } = response
  return data
}

export function* editUserSaga(user: User) {
  log.debug('editUserSaga.user', user)

  const newUser = MU.marshalUserTo(user, {})
  log.debug('editUserSaga.newUser', newUser)

  const response: { data: User } = yield call(APIProfile.editUser, newUser)
  log.debug('editUserSaga.response', response)

  const { data } = response
  return data
}

export function* activateUserSaga(id: string, expiration_date: string) {
  log.debug('activateUserSaga.values', { id, expiration_date })
  const response: { data: User } = yield call(
    APIProfile.activateUser,
    id,
    expiration_date,
  )
  log.debug('activateUserSaga.response', response)
  const { data } = response
  return data
}

export function* deleteUserSaga(id: string) {
  log.debug('deleteUserSaga.values', { id })
  const response: { data: User } = yield call(APIProfile.deleteUser, id)
  log.debug('deleteUserSaga.response', response)
  const { data } = response
  return data
}

export function* setUMSystemSaga(id: string, um_system: 'si' | 'imp') {
  log.debug('setUMSystemSaga.values', { id, um_system })
  const response: { data: any } = yield call(
    APIProfile.setUMSystem,
    id,
    um_system,
  )
  log.debug('setUMSystemSaga.response', response)
  const { data } = response
  return data
}

export function* setLanguageSaga(id: string, language: 'it' | 'en') {
  log.debug('setLanguage.values', { id, language })
  const response: { data: any } = yield call(
    APIProfile.setLanguage,
    id,
    language,
  )
  log.debug('setLanguage.response', response)
  const { data } = response
  return data
}

export function* resendSignUpSaga(username: string) {
  log.debug('resendSignUpSaga.values', { username })
  const response: { data: User } = yield call(APIProfile.resendSignUp, username)
  log.debug('resendSignUpSaga.response', response)
  const { data } = response
  return MU.marshalUserFrom(data)
}
