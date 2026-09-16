import { connect } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import actions from './actions'

import makeResourceLoading from 'Components/Layout/ResourceLoading'
import CorrectiveFactorsDetail from './CorrectiveFactors/Detail'
import CorrectiveFactorsEdit from './CorrectiveFactors/Edit'
import RefrigerantsDetail from './Refrigerants/Detail'
import RefrigerantsEdit from './Refrigerants/Edit'

const ConnectedCorrectiveFactorsDetail = connect(
  (state: CommonState) => ({ ...state.settings.corrective_factors.detail }),
  (dispatch) => ({
    onLoad: () => dispatch(actions.corrective_factors.detail.load()),
    onEdit: () => dispatch(actions.corrective_factors.edit.route()),
  }),
)(makeResourceLoading(CorrectiveFactorsDetail))

const ConnectedCorrectiveFactorsEdit = connect(
  (state: CommonState) => ({
    ...state.settings.corrective_factors.edit,
    profile: state.general.profile,
  }),
  (dispatch) => ({
    onLoad: () => dispatch(actions.corrective_factors.edit.load()),
    onBack: () => dispatch(actions.corrective_factors.detail.route()),
    onComplete: (data: SettingFront) =>
      dispatch(
        actions.corrective_factors.edit.complete({ corrective_factors: data }),
      ),
  }),
)(makeResourceLoading(CorrectiveFactorsEdit))

const ConnectedRefrigerantsDetail = connect(
  (state: CommonState) => ({ ...state.settings.refrigerants.detail }),
  (dispatch) => ({
    onLoad: () => dispatch(actions.refrigerants.detail.load()),
    onEdit: () => dispatch(actions.refrigerants.edit.route()),
  }),
)(makeResourceLoading(RefrigerantsDetail))

const ConnectedRefrigerantsEdit = connect(
  (state: CommonState) => ({
    ...state.settings.refrigerants.edit,
    profile: state.general.profile,
  }),
  (dispatch) => ({
    onLoad: () => dispatch(actions.refrigerants.edit.load()),
    onBack: () => dispatch(actions.refrigerants.detail.route()),
    onComplete: (data: any) =>
      dispatch(actions.refrigerants.edit.complete({ refrigerants: data })),
  }),
)(makeResourceLoading(RefrigerantsEdit))

const Settings = (props: any) => {
  return (
    <>
      <Routes>
        <Route
          path={`${CorrectiveFactorsDetail.prefix}`}
          element={<ConnectedCorrectiveFactorsDetail />}
        />
        <Route
          path={`${CorrectiveFactorsDetail.prefix}/edit`}
          element={<ConnectedCorrectiveFactorsEdit />}
        />
        <Route
          path={`${RefrigerantsDetail.prefix}`}
          element={<ConnectedRefrigerantsDetail />}
        />
        <Route
          path={`${RefrigerantsDetail.prefix}/edit`}
          element={<ConnectedRefrigerantsEdit />}
        />
        <Route
          path='*'
          element={<Navigate to={`${CorrectiveFactorsDetail.prefix}`} />}
        />
      </Routes>
    </>
  )
}

Settings.prefix = 'settings'

export default Settings
