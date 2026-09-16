import _ from 'lodash'
import { call } from 'redux-saga/effects'
import * as MS from 'Model/Settings/marshal'
import * as APISettings from 'Api/Settings/api/endpoints'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Api/Settings/api/saga')

export function* getCorrectiveFactorsSaga() {
  const response: { data: SettingBack } = yield call(
    APISettings.getCorrectiveFactors,
  )

  let creationSchema: any = {}

  const user_permissions: { data: any } = yield call(
    APISettings.getUserPermissions,
  )

  creationSchema = _.get(user_permissions, 'data.value')

  log.debug('getCorrectiveFactorsSaga.response', { response, creationSchema })
  const { data } = response
  return MS.marshalSettingsFrom(data, creationSchema)
}

export function* editCorrectiveFactorsSaga(values: SettingFront) {
  log.debug('editCorrectiveFactorsSaga.values', values)
  const { newCorrectiveFactors, newUserPermissions } = MS.marshalSettingsTo(
    values,
    false,
    {},
  )

  const response: { data: SettingBack } = yield call(
    APISettings.editCorrectiveFactors,
    { value: newCorrectiveFactors },
  )

  const new_user_permissions: { data: any } = yield call(
    APISettings.editUserPermissions,
    { value: newUserPermissions },
  )

  log.debug('editUserSaga.response', { response, new_user_permissions })
  const { data } = response
  const creationSchema = _.get(new_user_permissions, 'data.value', {})

  return MS.marshalSettingsFrom(data, creationSchema)
}

export function* getRefrigerantsSaga() {
  log.debug('getRefrigerantsSaga')

  const response: { data: any } = yield call(APISettings.getRefrigerants)

  log.debug('getRefrigerantsSaga.response', response)
  const refrigerants = _.get(response, 'data.value.refrigerants')
  return refrigerants
}

export function* editRefrigerantsSaga(values: any) {
  log.debug('editRefrigerantsSaga.values', values)
  const newRefrigerants = MS.marshalRefrigerantsTo(values)

  const response: { data: any } = yield call(
    APISettings.editRefrigerants,
    newRefrigerants,
  )

  log.debug('editRefrigerantsSaga.response', response)
  const { data } = response
  return data
}

export function* getUserPermissionsSaga() {
  log.debug('getUserPermissionsSaga')

  const response: { data: any } = yield call(APISettings.getUserPermissions)

  log.debug('getUserPermissionsSaga.response', response)
  // const refrigerants = _.get(response, 'data.value.refrigerants')
  return response
}

export function* editUserPermissionsSaga(values: any) {
  log.debug('editUserPermissionsSaga.values', values)

  const response: { data: any } = yield call(
    APISettings.editUserPermissions,
    values,
  )

  log.debug('editUserPermissionsSaga.response', response)
  const { data } = response
  return data
}

export function* getAvailableNTubesValuesSaga(values: {
  use_case: string
  geom_types: string[]
}) {
  log.debug('getAvailableNTubesValuesSaga', values)
  const response: { data: { [key: string]: number[] } } = yield call(
    APISettings.getAvailableNTubesValues,
    values,
  )

  log.debug('getAvailableNTubesValuesSaga.response', response)

  const { data } = response

  return data
}

export function* getStepsConfigSaga() {
  log.debug('getStepsConfigSaga')
  const response: { data: { [key: string]: any } } = yield call(
    APISettings.getStepsConfig,
  )

  log.debug('getStepsConfigSaga.response', response)

  const { data } = response

  return data
}

export function* getGeometricConstantsSaga() {
  log.debug('getGeometricConstantsSaga')
  const response: { data: GeometricConstants } = yield call(
    APISettings.getGeometricConstants,
  )

  log.debug('getGeometricConstantsSaga.response', response)

  const { data: geometric_constants } = response

  const marshaledGeometricConstants =
    MS.marshalGeometricConstantFrom(geometric_constants)

  return marshaledGeometricConstants
}

export function* calcCoreHeightSaga(values: {
  geom_types: string[]
  n_of_tubes: number
}) {
  log.debug('calcCoreHeightSaga.values', values)

  const response: { data: { core_height: number } } = yield call(
    APISettings.calcCoreHeight,
    values,
  )

  log.debug('calcCoreHeightSaga.response', response)

  return MS.marshalCalculatedData('core_height', response.data)
}

export function* calcFlowRateAirSaga(values: {
  geom_types: string[]
  n_of_tubes: number[]
  battery_active_length: number
  inlet_velocity_air: number
}) {
  log.debug('calcFlowRateAirSaga.values', values)

  const response: { data: { flow_rate_air: number } } = yield call(
    APISettings.calcFlowRateAir,
    values,
  )

  log.debug('calcFlowRateAirSaga.response', response)

  return MS.marshalCalculatedData('flow_rate_air', response.data)
}

export function* calcVelocityAirSaga(values: {
  geom_types: string[]
  n_of_tubes: number[]
  battery_active_length: number
  flow_rate_air: number
}) {
  log.debug('calcVelocityAirSaga.values', values)

  const response: { data: { inlet_velocity_air: number } } = yield call(
    APISettings.calcVelocityAir,
    values,
  )

  log.debug('calcVelocityAirSaga.response', response)

  return MS.marshalCalculatedData('inlet_velocity_air', response.data)
}
