import { connect } from 'react-redux'
import _ from 'lodash'
import { Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom'

import makeResourceLoading from 'Components/Layout/ResourceLoading'
import Search from './Search'
import Creation from './Creation'
import Edit from './Edit'
import Detail from './Detail'

import actions from './actions'
import appActions from 'Modules/App/actions'
import userActions from 'Modules/Users/actions'
import Profile from './Profile'
import Blank from 'Modules/General/404/Blank'
import Forbidden from 'Modules/General/404/Forbidden'

const ConnectedSearch = connect(
  (state: CommonState) => ({
    ...state.user.search,
    preferences: _.get(state.general.profile.data, 'preferences', {}),
  }),
  (dispatch) => ({
    onLoad: () => dispatch(actions.search.load()),
    onUserNew: () => dispatch(actions.create.route()),
    onUserEdit: (id: any) => dispatch(actions.edit.route(id)),
    onUserDetail: (id: any) => dispatch(actions.detail.route(id)),
    onUpdateParams: (params: SearchParameters) =>
      dispatch(actions.search.updateQueryParameters({ params })),
    onProfileDetail: () => dispatch(userActions.profile.detail.route()),
    onExport: (language: any) => dispatch(actions.search.export({ language })),
  }),
)(makeResourceLoading(Search))

const ConnectedCreation = connect(
  (state: CommonState) => state.user.create,
  (dispatch) => ({
    onLoad: () => dispatch(actions.create.load()),
    onBack: () => dispatch(actions.search.route()),
    onCreate: (user: User) => dispatch(actions.create.complete({ user })),
  }),
)(makeResourceLoading(Creation))

const ConnectedEdit = connect(
  (state: CommonState) => ({
    ...state.user.edit,
    profile: state.general.profile.data,
  }),
  (dispatch, props: any) => {
    const params = useParams()
    const user_id = _.get(params, 'user_id')
    return {
      onLoad: () => dispatch(actions.edit.load({ user_id })),
      onEdit: (user: User) => dispatch(actions.edit.complete({ user })),
    }
  },
)(makeResourceLoading(Edit))

const ConnectedProfile = connect(
  (state: CommonState) => state.general.profile,
  (dispatch, props: any) => {
    return {
      onResetEula: () => dispatch(appActions.profile.resetEula()),
      onDownloadEula: ({
        storage_url,
        language,
      }: {
        storage_url: string
        language: string
      }) =>
        dispatch(
          userActions.profile.detail.downloadEula({ storage_url, language }),
        ),
      onProfileEdit: (id: string) => dispatch(actions.edit.route({ id })),
    }
  },
)(makeResourceLoading(Profile))

const ConnectedDetail = connect(
  (state: CommonState) => ({
    ...state.user.detail,
    language: state?.general?.profile?.data.preferences.language,
  }),
  (dispatch, props: any) => {
    const params = useParams()
    const user_id = _.get(params, 'user_id')
    return {
      onLoad: () => dispatch(actions.detail.load({ user_id })),
      onBack: () => dispatch(actions.search.route()),
      onEdit: (id: string) => dispatch(actions.edit.route({ id })),

      onEditValidity: (user: User) =>
        dispatch(actions.detail.editValidity({ user })),
      onActivate: ({
        id,
        expiration_date,
      }: {
        id: string
        expiration_date: string
      }) => dispatch(actions.detail.activate({ id, expiration_date })),

      onDelete: (id: string | number) =>
        dispatch(actions.detail.delete({ id })),
      onResendSignUp: ({
        username,
        language,
      }: {
        username: string
        language: 'it' | 'en'
      }) => dispatch(actions.detail.resendSignUp({ username, language })),
    }
  },
)(makeResourceLoading(Detail))

const Users = (props: any) => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route index element={<ConnectedSearch />} />
        <Route path='new' element={<ConnectedCreation />} />
        <Route
          path=':user_id'
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route index element={<ConnectedDetail />} />
          <Route path='detail' element={<ConnectedDetail />} />
          <Route path='edit' element={<ConnectedEdit />} />
        </Route>

        <Route
          path='profile'
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route index element={<ConnectedProfile />} />

          <Route path='detail' element={<ConnectedProfile />} />
        </Route>

        <Route path='forbidden' element={<Forbidden />} />
        <Route path='blank' element={<Blank />} />
        <Route path='*' element={<Navigate to='/blank' />} />
      </Route>
      {/* <Route path='/' element={<ConnectedSearch />} /> */}
    </Routes>
  )
}

Users.prefix = 'users'

export default Users
