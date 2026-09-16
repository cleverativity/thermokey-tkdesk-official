import _ from 'lodash'
import { connect } from 'react-redux'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import makeResourceLoading from 'Components/Layout/ResourceLoading'

import actions from './actions'

import SelectionsSearch from './Search'
import SelectionHeader from './Manage/SelectionHeader'
import { StyledSpinner } from 'Components/Styled'
import { Col, Row } from 'antd'
import Forbidden from 'Modules/General/404/Forbidden'
import Blank from 'Modules/General/404/Blank'

import confirmCleanedRouteEn from 'Model/BackModals/confirmCleanedRouteEn'
import confirmCleanedRouteIt from 'Model/BackModals/confirmCleanedRouteIt'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Modules/Selections')

export const ConnectedSearch = connect(
  (state: CommonState) => state.selection.search,
  (dispatch) => ({
    onLoad: () => dispatch(actions.search.load()),
    onUpdateParams: (params: SearchParameters) =>
      dispatch(actions.search.updateQueryParameters({ params })),
    onEdit: ({ id }: { id: string }) => dispatch(actions.generic.route({ id })),
  }),
)(makeResourceLoading(SelectionsSearch))

const ConnectedManage = connect(
  (state: CommonState) => {
    log.info('ConnectedManage', state)
    return {
      ...state.selection.manage,
      preferences: _.get(state.general.profile.data, 'preferences', {}),
      user_id: _.get(state.general.profile.data, 'id', {}),
    }
  },
  (dispatch) => {
    const params = useParams()
    const id = _.get(params, 'id')

    return {
      onLoad: () => dispatch(actions.manage.load({ id })),

      onPrevStep: ({
        id,
        status,
        selection,
      }: {
        id: string
        status: string
        selection: SelectionBack
      }) => dispatch(actions.manage.resetStatus({ id, status, selection })),

      onStep: (
        id: number | string,
        step: number,
        language: string,
        selection: SelectionBack,
      ) => {
        switch (step) {
          case 0:
            if (language === 'it') {
              confirmCleanedRouteIt(() =>
                dispatch(
                  actions.manage.resetStatus({
                    id,
                    status: 'created',
                    selection,
                  }),
                ),
              )()
            } else {
              confirmCleanedRouteEn(() =>
                dispatch(
                  actions.manage.resetStatus({
                    id,
                    status: 'created',
                    selection,
                  }),
                ),
              )()
            }

            break
          case 1:
            dispatch(
              actions.manage.resetStatus({
                id,
                status: 'use_case_selected',
                selection,
              }),
            )
            break
          case 2:
            dispatch(
              actions.manage.resetStatus({
                id,
                status: 'solved',
                selection,
              }),
            )
            break
          default:
            dispatch(
              actions.manage.resetStatus({
                id,
                status: 'use_case_selected',
                selection,
              }),
            )
            break
        }
      },

      // STEPS
      onSetUseCase: ({
        id,
        macro_serie,
        selection,
        user_id,
      }: {
        id: string
        macro_serie: string
        selection: SelectionBack
        user_id: number
      }) =>
        dispatch(
          actions.manage.setUseCase({
            id,
            macro_serie,
            selection,
            user_id,
          }),
        ),
      onSolve: ({
        id,
        selection,
        user_id,
        macro_serie,
      }: {
        id: string
        selection: SelectionBack
        user_id: number
        macro_serie: string
      }) =>
        dispatch(
          actions.manage.solve({ id, selection, user_id, macro_serie }),
        ),
      onSetDetail: ({
        id,
        machine_id,
        macro_serie,
        thermal,
      }: {
        id: string
        machine_id: number
        macro_serie: string
        thermal: string
      }) =>
        dispatch(
          actions.manage.setDetail({ id, machine_id, macro_serie, thermal }),
        ),

      onGeneratePdf: ({
        id,
        template,
        selections,
        admin,
        session_id,
      }: {
        id: string
        template: string
        selections: any
        admin: boolean
        session_id: string
      }) =>
        dispatch(
          actions.manage.generatePdf({
            id,
            template,
            selections,
            admin,
            session_id,
          }),
        ),

      onEditCustomData: ({ id, values }: { id: string; values: any }) =>
        dispatch(actions.manage.editCustomData({ id, values })),
      //Temporary delete steps
      onDeleteSteps: ({ id }: { id: number }) =>
        dispatch(actions.manage.deleteSteps({ id })),
      onLoadAccessories: (payload) =>
        dispatch(actions.manage.accessories(payload)),
      onPDFDownload: (payload) =>
        dispatch(actions.manage.thermalPdfDownload(payload)),
    }
  },
)(makeResourceLoading(SelectionHeader))

const IsolatedSpinner = () => (
  <Row justify='center' align='middle' style={{ height: '80%' }}>
    <Col>
      <StyledSpinner />
    </Col>
  </Row>
)
const ConnectedSpinner = connect(
  (state: CommonState) => ({}),
  (dispatch) => ({
    onLoad: () => dispatch(actions.generic.preload()),
  }),
)(makeResourceLoading(IsolatedSpinner))

const Selections = (props: any) => {
  return (
    <Routes>
      <Route path='/' element={<ConnectedSearch />} />
      <Route path='list' element={<ConnectedSearch />} />
      <Route path='edit' element={<ConnectedSpinner />} />
      <Route path=':id' element={<ConnectedManage />} />
      <Route path='forbidden' element={<Forbidden />} />
      <Route path='blank' element={<Blank />} />
      <Route path='*' element={<Navigate to='/blank' />} />
    </Routes>
  )
}

Selections.prefix = 'selections'

export default Selections
