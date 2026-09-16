import _ from 'lodash'

export const getUseCaseFromModelList: string | any = (state: AppState) => {
  return state?.calculation?.modelsList?.data?.use_case
}

export const getParams = (state: AppState) => state?.calculation?.search?.params

export const getParamsManage = (state: AppState) => {
  const paramsWithoutOptions = _.omit(state?.calculation?.manage?.params, [
    'isFirstTimeLanguageRendered',
    'isLanguageChanged',
    'isRegenerating',
  ])
  return paramsWithoutOptions
}
