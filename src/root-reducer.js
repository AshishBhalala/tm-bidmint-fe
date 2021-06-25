import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
import sellerDashboardReducer from 'views/selller/seller-dashboard/sellerDashboard.reducer'
import buyerDashboardReducer from 'views/buyer/buyer-dashboard/buyerDashboard.reducer'


const reducers = {
	sellerDashboardReducer,
	buyerDashboardReducer
};
export default function createRootReducer(asyncReducers = {}, browserHistory) {
	const rootReducer = combineReducers({
		...reducers,
		router: connectRouter(browserHistory),
		...asyncReducers
	});

	return rootReducer;
}
