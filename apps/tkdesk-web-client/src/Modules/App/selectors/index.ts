export const getLang = (state: AppState) =>
  state?.general?.profile?.data?.preferences.language

export const getUseCase = (state: AppState) =>
  state?.calculation?.inputParameter?.data?.use_case
export const getModel = (state: AppState) =>
  state?.calculation?.modelDetail?.data
