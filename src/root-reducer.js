import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
import saveProposalReducer from 'views/buyer/buyer-proposal-form/proposalForm.reducer'

const reducers = {
	saveProposalReducer
};

export default function createRootReducer(asyncReducers = {}, browserHistory) {
	const rootReducer = combineReducers({
		...reducers,
		router: connectRouter(browserHistory),
		...asyncReducers
	});

	return rootReducer;
}
