/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';

import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';
import configureStore, { browserHistory } from './configure-store';
import BuyerDashboard from 'views/buyer/buyer-dashboard';
import home from 'views/home';
// import configMock from './mocks/config.json';

const initialState = {};
export const store = configureStore(initialState);
const rootElement = document.getElementById('root');

// store.dispatch({ type: 'FETCH_CONFIG', data: configMock })
ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={browserHistory}>
			<App />
		</ConnectedRouter>
	</Provider>,
	rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
