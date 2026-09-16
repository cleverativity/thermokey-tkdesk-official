import { createAction } from '@reduxjs/toolkit'

const PREFIX = 'APPLICATION'
export const PREFIX_PROFILE = 'PROFILE'

export const actionsProfile: any = {
  // LOAD
  LOAD: `${PREFIX}_${PREFIX_PROFILE}_LOAD`,
  LOAD_SUCCESS: `${PREFIX}_${PREFIX_PROFILE}_LOAD_SUCCESS`,
  LOAD_FAIL: `${PREFIX}_${PREFIX_PROFILE}_LOAD_FAIL`,

  // UPDATE
  UPDATE: `${PREFIX}_${PREFIX_PROFILE}_UPDATE`,
  UPDATE_SUCCESS: `${PREFIX}_${PREFIX_PROFILE}_UPDATE_SUCCES`,
  UPDATE_FAIL: `${PREFIX}_${PREFIX_PROFILE}_UPDATE_FAIL`,

  // ACCEPT_EULA
  ACCEPT_EULA: `${PREFIX}_${PREFIX_PROFILE}_ACCEPT_EULA`,
  ACCEPT_EULA_SUCCESS: `${PREFIX}_${PREFIX_PROFILE}_ACCEPT_EULA_SUCCESS`,
  ACCEPT_EULA_FAIL: `${PREFIX}_${PREFIX_PROFILE}_ACCEPT_EULA_FAIL`,

  // RESET_EULA
  RESET_EULA: `${PREFIX}_${PREFIX_PROFILE}_RESET_EULA`,
  RESET_EULA_SUCCESS: `${PREFIX}_${PREFIX_PROFILE}_RESET_EULA_SUCCESS`,
  RESET_EULA_FAIL: `${PREFIX}_${PREFIX_PROFILE}_RESET_EULA_FAIL`,

  // SET LANGUAGE
  SET_LANGUAGE: `${PREFIX}_SET_LANGUAGE`,
  SET_LANGUAGE_SUCCESS: `${PREFIX}_SET_LANGUAGE_SUCCESS`,
  SET_LANGUAGE_FAIL: `${PREFIX}_SET_LANGUAGE_FAIL`,

  // SET UM SYSTEM
  SET_UM_SYSTEM: `${PREFIX}_SET_UM_SYSTEM`,
  SET_UM_SYSTEM_SUCCESS: `${PREFIX}_SET_UM_SYSTEM_SUCCESS`,
  SET_UM_SYSTEM_FAIL: `${PREFIX}_SET_UM_SYSTEM_FAIL`,
}

export const actionsFunctionsProfile: any = {
  // LOAD
  load: createAction(actionsProfile.LOAD),
  loadSuccess: createAction(actionsProfile.LOAD_SUCCESS),
  loadFail: createAction(actionsProfile.LOAD_FAIL),

  // UPDATE
  update: createAction(actionsProfile.UPDATE),
  updateSuccess: createAction(actionsProfile.UPDATE_SUCCESS),
  updateFail: createAction(actionsProfile.UPDATE_FAIL),

  // ACCEPT_EULA
  acceptEula: createAction(actionsProfile.ACCEPT_EULA),
  acceptEulaSuccess: createAction(actionsProfile.ACCEPT_EULA_SUCCESS),
  acceptEulaFail: createAction(actionsProfile.ACCEPT_EULA_FAIL),

  // RESET_EULA
  resetEula: createAction(actionsProfile.RESET_EULA),
  resetEulaSuccess: createAction(actionsProfile.RESET_EULA_SUCCESS),
  resetEulaFail: createAction(actionsProfile.RESET_EULA_FAIL),

  // SET LANGUAGE
  setLanguage: createAction(actionsProfile.SET_LANGUAGE),
  setLanguageSuccess: createAction(actionsProfile.SET_LANGUAGE_SUCCESS),
  setLanguageFail: createAction(actionsProfile.SET_LANGUAGE_FAIL),

  // SET UM SYSTEM
  setUMSwitch: createAction(actionsProfile.SET_UM_SYSTEM),
  setUMSwitchSuccess: createAction(actionsProfile.SET_UM_SYSTEM_SUCCESS),
  setUMSwitchFail: createAction(actionsProfile.SET_UM_SYSTEM_FAIL),
}
