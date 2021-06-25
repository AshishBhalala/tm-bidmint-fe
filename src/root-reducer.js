import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
import buyerProposerReducer from 'views/buyer/buyer-dashboard/buyer-proposal-reducer';
const reducers = {
	buyerProposerReducer
};
export default function createRootReducer(asyncReducers = {}, browserHistory) {
	const rootReducer = combineReducers({
		...reducers,
		router: connectRouter(browserHistory),
		...asyncReducers
	});

	return rootReducer;
}
