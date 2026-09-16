import _ from 'lodash'
import { put, call, takeEvery } from 'redux-saga/effects'
import * as Profile from 'Api/User'
import * as APIProfile from 'Api/Profile/endpoints'
import appActions from 'Modules/App/actions'
import { message } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'
const actions = appActions.profile

const log = new ConsoleLogger('App/sagas/user')

const sagas: any = []

sagas.push(takeEvery(actions.LOAD, load))
function* load(body: { type: string; payload: any }) {
  const { cookieLang } = body.payload
  try {
    const profile: User = yield call(Profile.whoAmISaga)
    const profile_id: number | null = _.get(profile, 'id', null)

    if (!_.isNil(cookieLang)) {
      yield put(
        actions.setLanguage({
          isLogin: false,
          id: profile_id,
          language: cookieLang,
        }),
      )
    }

    const notificationsBadge: {
      data: { getMenuNotification: { count: number } }
    } = yield call(APIProfile.getMenuNotifications)

    yield put(
      actions.loadSuccess({
        profile,
        notifications: {
          count: notificationsBadge.data?.getMenuNotification?.count,
        },
      }),
    )
  } catch (error: any) {
    log.error({ error })
    yield put(actions.loadFail({ error }))
  }
}

// ACCEPT_EULA
sagas.push(takeEvery(actions.ACCEPT_EULA, acceptEula))
function* acceptEula() {
  try {
    const profile: User = yield call(Profile.acceptEulaSaga)
    log.info('acceptEula.profile', { profile })
    yield put(actions.acceptEulaSuccess({ profile }))
  } catch (error: any) {
    log.error({ error })
    yield put(actions.acceptEulaFail({ error }))
  }
}

// RESET_EULA
sagas.push(takeEvery(actions.RESET_EULA, resetEula))
function* resetEula() {
  try {
    const profile: User = yield call(Profile.resetEulaSaga)

    yield put(actions.resetEulaSuccess({ profile }))
  } catch (error: any) {
    log.error({ error })
    yield put(actions.resetEulaFail({ error }))
  }
}

// LANGSWITCH
sagas.push(takeEvery(actions.SET_LANGUAGE, setLanguage))
function* setLanguage(body: { type: string; payload: any }) {
  const { id, language, isLogin = false } = body.payload
  try {
    if (!isLogin) {
      const response: { [key: string]: any } = yield call(
        Profile.setLanguageSaga,
        id,
        language,
      )
    }

    // yield delay(1000)
    yield put(
      actions.setLanguageSuccess({
        language,
      }),
    )
  } catch (error: any) {
    log.error({ error })
    // if (language === 'it') {
    //   message.error('Errore durante il cambio lingua')
    // } else {
    //   message.error('Error switching language')
    // }
    yield put(actions.setLanguageFail({ error }))
  }
}

// SET UM SYSTEM
sagas.push(takeEvery(actions.SET_UM_SYSTEM, setUMSystem))
function* setUMSystem(body: { type: string; payload: any }) {
  const { id, um_system, language } = body.payload
  try {
    const response: { [key: string]: any } = yield call(
      Profile.setUMSystemSaga,
      id,
      um_system,
    )

    // yield delay(1000)
    yield put(
      actions.setUMSwitchSuccess({
        um_system,
      }),
    )
  } catch (error: any) {
    log.error({ error })
    if (language === 'it') {
      message.error('Errore durante il cambio unità di misura')
    } else {
      message.error('Error switching unit of measure')
    }
    yield put(actions.setUMSwitchFail({ error }))
  }
}

export default sagas
