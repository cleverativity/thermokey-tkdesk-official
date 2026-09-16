import _ from 'lodash'
import { connect } from 'react-redux'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import makeResourceLoading from 'Components/Layout/ResourceLoading'

import Search from './Search'
import Creation from './Creation'
import Edit from './Edit'
import Detail from './Detail'

import SearchPolynomial from './Polynomials/Search'

import actions from './actions'

const ConnectedSearch = connect(
  (state: CommonState) => ({
    ...state.fan_model.search,
    isUploading: state.fan_model.create?.params?.isUploading ?? false,
    errorModal: state.fan_model.create?.error ?? false,
  }),
  (dispatch) => ({
    onLoad: () => {
      dispatch(actions.search.load())
    },
    onFanModelNew: () => {
      dispatch(actions.create.route())
    },
    onImportFans: (documents: any) =>
      dispatch(actions.create.importFans({ documents })),
    onFanModelEdit: (id: any) => {
      dispatch(actions.edit.route(id))
    },
    onFanModelDetail: (id: any) => dispatch(actions.detail.route(id)),
    onUpdateParams: (params: SearchParameters) =>
      dispatch(actions.search.updateQueryParameters({ params })),
  }),
)(makeResourceLoading(Search))

const ConnectedCreation = connect(
  (state: CommonState) => state.fan_model.create,
  (dispatch) => ({
    onLoad: () => {
      dispatch(actions.create.load())
    },
    onBack: () => dispatch(actions.search.route()),
    onCreate: (fan_model: FanModels) =>
      dispatch(actions.create.complete({ fan_model })),
  }),
)(makeResourceLoading(Creation))

const ConnectedEdit = connect(
  (state: CommonState) => ({
    ...state.fan_model.edit,
    profile: state.general.profile.data,
  }),
  (dispatch, props: any) => {
    const params = useParams()
    const id = _.get(params, 'id')
    return {
      onLoad: () => dispatch(actions.edit.load({ id })),
      onEdit: (fan_model: FanModels) =>
        dispatch(actions.edit.complete({ fan_model })),
    }
  },
)(makeResourceLoading(Edit))

const ConnectedDetail = connect(
  (state: CommonState) => ({
    ...state.fan_model.detail,
    language: state?.general?.profile?.data.preferences.language,
  }),
  (dispatch) => {
    const params = useParams()
    const id = _.get(params, 'id')
    return {
      onLoad: () => dispatch(actions.detail.load({ id })),
      onBack: () => dispatch(actions.search.route()),
      onEdit: (id: string) => dispatch(actions.edit.route({ id })),
      onDelete: (id: string | number) =>
        dispatch(actions.detail.delete({ id })),

      onPolynomialSearch: (fan_model_id: any) =>
        dispatch(actions.polynomials.search.route(fan_model_id)),
    }
  },
)(makeResourceLoading(Detail))

const ConnectedSearchPolynomial = connect(
  (state: CommonState) => ({
    ...state.fan_model.polynomials.search,
    errorModal: state.fan_model.polynomials.create?.error ?? false,
  }),
  (dispatch) => {
    const params = useParams()

    const fan_model_id = _.get(params, 'id')

    return {
      onLoad: () => {
        dispatch(actions.polynomials.search.load({ id: fan_model_id }))
      },
      onCreate: (fan_model_id: string, values: any) => {
        dispatch(actions.polynomials.create.complete({ fan_model_id, values }))
      },
      onBack: () => dispatch(actions.detail.route({ id: fan_model_id })),
      onEdit: (values: any) => {
        dispatch(actions.polynomials.edit.complete({ fan_model_id, values }))
      },
      onDelete: (idPoly: string | number) =>
        dispatch(actions.polynomials.search.delete({ fan_model_id, idPoly })),
    }
  },
)(makeResourceLoading(SearchPolynomial))

const FanModels = (props: any) => {
  return (
    <Routes>
      <Route path='/' element={<ConnectedSearch />} />
      <Route path='new' element={<ConnectedCreation />} />
      <Route path='/:id/detail' element={<ConnectedDetail />} />
      <Route path='/:id/edit' element={<ConnectedEdit />} />
      <Route path='/:id/polynomials' element={<ConnectedSearchPolynomial />} />
      {/*<Route path='forbidden' element={<Forbidden />} />
      <Route path='blank' element={<Blank />} /> */}
      <Route path='*' element={<Navigate to='/blank' />} />
    </Routes>
  )
}

FanModels.prefix = 'fan-models'

export default FanModels
