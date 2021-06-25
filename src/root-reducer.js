import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
import saveProposalReducer from 'views/buyer/buyer-proposal-form/proposalForm.reducer'
import sellerDashboardReducer from 'views/selller/seller-dashboard/sellerDashboard.reducer'
import buyerDashboardReducer from 'views/buyer/buyer-dashboard/buyerDashboard.reducer'


const reducers = {
	saveProposalReducer,
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
