import { connect } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import makeResourceLoading from 'Components/Layout/ResourceLoading'

import actions from './actions'
import actionsCalculations from 'Modules/Calculations/actions'
import actionsSelections from 'Modules/Selections/actions'

import Home from './Home'
import Forbidden from 'Modules/General/404/Forbidden'
import Blank from 'Modules/General/404/Blank'

const ConnectedHome = connect(
  (state: CommonState) => state.dashboard.generic,
  (dispatch) => {
    return {
      onLoad: () => dispatch(actions.generic.load()),
      onGoCalculations: () => dispatch(actionsCalculations.generic.preload()),
      onGoSelections: () => dispatch(actionsSelections.generic.preload()),
    }
  },
)(makeResourceLoading(Home))

const Dashboard = (props: any) => {
  return (
    <Routes>
      <Route path='/' element={<ConnectedHome />} />
      <Route path='forbidden' element={<Forbidden />} />
      <Route path='blank' element={<Blank />} />
      <Route path='*' element={<Navigate to='/blank' />} />
    </Routes>
  )
}

Dashboard.prefix = 'dashboard'

export default Dashboard
