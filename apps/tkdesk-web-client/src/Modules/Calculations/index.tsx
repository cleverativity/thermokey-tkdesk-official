import _ from 'lodash'
import { connect } from 'react-redux'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import makeResourceLoading from 'Components/Layout/ResourceLoading'

import actions from './actions'
import CalculationHeader from 'Modules/Calculations/Manage/CalculationHeader'

import CalculationsSearch from './Search'
import CalculationManage from './Manage'
import confirmCompleteCalculationEn from 'Model/Calculations/ModelDetail/modal/confirmCompleteCalculationEn'
import confirmCompleteCalculationIt from 'Model/Calculations/ModelDetail/modal/confirmCompleteCalculationIt'
import { StyledSpinner } from 'Components/Styled'
import { Col, Row } from 'antd'
import Forbidden from 'Modules/General/404/Forbidden'
import Blank from 'Modules/General/404/Blank'

export const ConnectedSearch = connect(
  (state: CommonState) => state.calculation.search,
  (dispatch) => ({
    onLoad: () => dispatch(actions.search.load()),
    onUpdateParams: (params: SearchParameters) =>
      dispatch(actions.search.updateQueryParameters({ params })),
    onCalculationEdit: ({ id }: { id: string }) =>
      dispatch(actions.generic.route({ id })),
    onExport: (filters: any) => dispatch(actions.search.export({ filters })),
    onExportSolveReport: (dates: any) =>
      dispatch(actions.search.exportSolveReport(dates)),
  }),
)(makeResourceLoading(CalculationsSearch))

export const ConnectedManage = connect(
  (state: CommonState) => ({
    ...state.calculation.manage,
    user_type: _.get(state.general.profile.data, 'user_type', ''),
    user_permissions: _.get(state.general.profile.data, 'user_permissions', {}),
    preferences: _.get(state.general.profile.data, 'preferences', {}),
    error:
      _.get(state.general.profile, 'error', false) ||
      _.get(state.calculation.manage, 'error', false),
  }),
  (dispatch, props: any) => {
    // const { id } = props
    const params = useParams()
    const id = _.get(params, 'id')
    return {
      onLoad: () => dispatch(actions.manage.load({ id })),

      onPrevStep: ({ id, status }: { id: string; status: string }) =>
        dispatch(actions.manage.resetStatus({ id, status })),

      // STEPS
      // to 2
      onSetUseCase: ({ id, use_case }: { id: string; use_case: string }) =>
        dispatch(actions.manage.setUseCase({ id, use_case })),
      // to 3
      onSolve: ({
        id,
        calculation,
      }: {
        id: string
        calculation: CalculationData
      }) => dispatch(actions.manage.solve({ id, calculation })),
      // to 4
      onSetDetail: ({ id, model_code }: { id: string; model_code: string }) =>
        dispatch(actions.manage.setDetail({ id, model_code })),
      onGoToSecondStep: () =>
        dispatch(
          actions.manage.resetStatus({ id, status: 'use_case_selected' }),
        ),

      // complete
      onComplete: ({ id, language }: { id: string; language: 'it' | 'en' }) => {
        if (language === 'it') {
          confirmCompleteCalculationIt(() =>
            dispatch(actions.manage.complete({ id })),
          )()
        } else {
          confirmCompleteCalculationEn(() =>
            dispatch(actions.manage.complete({ id })),
          )()
        }
      },
      onUpdateParams: (params: SearchParameters, currentCalculations: any) =>
        dispatch(
          actions.manage.updateQueryParameters({ params, currentCalculations }),
        ),
    }
  },
)(
  makeResourceLoading(CalculationManage, CalculationHeader, {
    forwardError: true,
  }),
)

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

const Calculations = (props: any) => {
  return (
    <Routes>
      <Route path='/' element={<ConnectedSearch />} />
      <Route path='edit' element={<ConnectedSpinner />} />
      <Route path=':id' element={<ConnectedManage />} />
      <Route path='forbidden' element={<Forbidden />} />
      <Route path='blank' element={<Blank />} />
      <Route path='*' element={<Navigate to='/blank' />} />
    </Routes>
  )
}

Calculations.prefix = 'calculations'

export default Calculations
