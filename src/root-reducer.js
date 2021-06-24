import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';

const reducers = {
	
};
export default function createRootReducer(asyncReducers = {}, browserHistory) {
	const rootReducer = combineReducers({
		...reducers,
		router: connectRouter(browserHistory),
		...asyncReducers
	});

	return rootReducer;
}
