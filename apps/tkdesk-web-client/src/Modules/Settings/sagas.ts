import { all, call, put, takeEvery } from 'redux-saga/effects'
import actions from 'Modules/Settings/actions'
import * as Settings from 'Api/Settings'
import { navigate } from 'Generic/navigation'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Coils/Saga')

const sagas: any = []

// ROUTES
sagas.push(
  takeEvery(
    actions.corrective_factors.detail.ROUTE,
    routeToCorrectiveFactorsDetail,
  ),
)
function* routeToCorrectiveFactorsDetail() {
  yield call(navigate, '/settings/corrective-factors')
}

sagas.push(
  takeEvery(
    actions.corrective_factors.edit.ROUTE,
    routeToCorrectiveFactorsEdit,
  ),
)
function* routeToCorrectiveFactorsEdit() {
  yield call(navigate, '/settings/corrective-factors/edit')
}

sagas.push(
  takeEvery(actions.refrigerants.detail.ROUTE, routeToRefrigerantsDetail),
)
function* routeToRefrigerantsDetail() {
  yield call(navigate, '/settings/refrigerants')
}

sagas.push(takeEvery(actions.refrigerants.edit.ROUTE, routeToRefrigerantsEdit))
function* routeToRefrigerantsEdit() {
  yield call(navigate, '/settings/refrigerants/edit')
}

// CORRECTIVE FACTORS
// DETAIL
sagas.push(
  takeEvery(
    actions.corrective_factors.detail.LOAD,
    correctiveFactorsDetailLoad,
  ),
)
function* correctiveFactorsDetailLoad() {
  log.info('correctiveFactorsDetailLoad')
  try {
    let settings: SettingFront[] = yield call(Settings.getCorrectiveFactorsSaga)
    yield put(actions.corrective_factors.detail.loadSuccess({ settings }))
  } catch (error: any) {
    log.error('correctiveFactorsDetailLoad', { error })
    yield put(actions.corrective_factors.detail.loadFail({ error }))
  }
}

// EDIT
sagas.push(
  takeEvery(actions.corrective_factors.edit.LOAD, correctiveFactorsEditLoad),
)
function* correctiveFactorsEditLoad() {
  log.info('correctiveFactorsEditLoad')
  try {
    let settings: SettingFront[] = yield call(Settings.getCorrectiveFactorsSaga)
    yield put(actions.corrective_factors.edit.loadSuccess({ settings }))
  } catch (error: any) {
    log.error('correctiveFactorsEditLoad', { error })
    yield put(actions.corrective_factors.edit.loadFail({ error }))
  }
}

// EDIT COMPLETE
sagas.push(
  takeEvery(
    actions.corrective_factors.edit.COMPLETE,
    correctiveFactorsEditComplete,
  ),
)
function* correctiveFactorsEditComplete({ payload }: any) {
  log.info('correctiveFactorsEditComplete.payload', payload)

  const { corrective_factors } = payload
  try {
    let settings: SettingFront = yield call(
      Settings.editCorrectiveFactorsSaga,
      corrective_factors,
    )
    yield put(actions.corrective_factors.edit.loadSuccess({ settings }))
    yield put(actions.corrective_factors.detail.route())
  } catch (error: any) {
    log.error('correctiveFactorsEditComplete', { error })
    yield put(actions.corrective_factors.edit.loadFail({ error }))
  }
}

// REFRIGERANTS
// DETAIL
sagas.push(takeEvery(actions.refrigerants.detail.LOAD, refrigerantsDetailLoad))
function* refrigerantsDetailLoad() {
  log.info('refrigerantsDetailLoad')
  try {
    let settings: SettingFront[] = yield call(Settings.getRefrigerantsSaga)
    yield put(actions.refrigerants.detail.loadSuccess({ settings }))
  } catch (error: any) {
    log.error('refrigerantsDetailLoad', { error })
    yield put(actions.refrigerants.detail.loadFail({ error }))
  }
}

// EDIT
sagas.push(takeEvery(actions.refrigerants.edit.LOAD, refrigerantsEditLoad))
function* refrigerantsEditLoad() {
  log.info('refrigerantsEditLoad')
  try {
    let settings: SettingFront[] = yield call(Settings.getRefrigerantsSaga)
    yield put(actions.refrigerants.edit.loadSuccess({ settings }))
  } catch (error: any) {
    log.error('refrigerantsEditLoad', { error })
    yield put(actions.refrigerants.edit.loadFail({ error }))
  }
}

// EDIT COMPLETE
sagas.push(
  takeEvery(actions.refrigerants.edit.COMPLETE, refrigerantsEditComplete),
)
function* refrigerantsEditComplete({ payload }: any) {
  log.info('refrigerantsEditComplete.payload', payload)

  try {
    let settings: SettingFront = yield call(
      Settings.editRefrigerantsSaga,
      payload,
    )
    yield put(actions.refrigerants.edit.loadSuccess({ settings }))
    yield put(actions.refrigerants.detail.route())
  } catch (error: any) {
    log.error('refrigerantsEditComplete', { error })
    yield put(actions.refrigerants.edit.loadFail({ error }))
  }
}

export default function* rootSaga() {
  yield all(sagas)
}
