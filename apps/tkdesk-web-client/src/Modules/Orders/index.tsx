import { connect } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import makeResourceLoading from 'Components/Layout/ResourceLoading'
import actions from './actions'
import calculationActions from 'Modules/Calculations/actions'
import OrdersSearch from './Search'
import Forbidden from 'Modules/General/404/Forbidden'
import Blank from 'Modules/General/404/Blank'

const ConnectedSearch = connect(
  (state: CommonState) => ({
    ...state.order.search,
    language: state.general?.profile?.data?.preferences?.language,
  }),
  (dispatch) => ({
    onLoad: () => dispatch(actions.search.load()),
    onUpdateParams: (params: SearchParameters) =>
      dispatch(actions.search.updateQueryParameters({ params })),
    onChangeStatus: ({
      id,
      status,
    }: {
      id: string | number
      status: 'created' | 'open' | 'closed'
    }) => dispatch(actions.search.changeStatus({ id, status })),
    onCalculationDetail: ({ id }: { id: string }) =>
      dispatch(calculationActions.generic.route({ id })),
    // VAI AL CALCOLO
  }),
)(makeResourceLoading(OrdersSearch))

// const ConnectedDetail = connect(
//   (state: CommonState) => state.order.search,
//   (dispatch, props: any) => {
//     const { id } = props.match.params
//     return {
//       onLoad: () => dispatch(actions.detail.load({ id })),
//     }
//   }
// )(makeResourceLoading(OrderDetail))

const Orders = (props: any) => {
  const { match } = props

  return (
    <>
      <Routes>
        {/* <Route path='/' element={<ConnectedSearch />} /> */}
        <Route path='forbidden' element={<Forbidden />} />
        <Route path='blank' element={<Blank />} />
        <Route path='*' element={<Navigate to='/blank' />} />
      </Routes>
    </>
  )
}
Orders.prefix = 'orders'

export default Orders
