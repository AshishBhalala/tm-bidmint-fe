import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
import aboutReducer from './views/about/about.reducer';

const reducers = {
	aboutReducer
};
export default function createRootReducer(asyncReducers = {}, browserHistory) {
	const rootReducer = combineReducers({
		...reducers,
		router: connectRouter(browserHistory),
		...asyncReducers
	});

	return rootReducer;
}
