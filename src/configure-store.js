import { applyMiddleware, compose, createStore } from "redux";
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';

import createRootReducer from './root-reducer';
import { rootEpic, epicMiddleWare } from './root-epic';
import { epic$ } from './root-epic';


export const browserHistory = createBrowserHistory()

export default function configureStore(preloadedState = {}) {
    const middlewares = [epicMiddleWare, routerMiddleware(browserHistory)];
    const enhancers = [applyMiddleware(...middlewares)];

    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
            typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;

    const store = createStore(
        createRootReducer({}, browserHistory),
        fromJS(preloadedState),
        composeEnhancers(...enhancers)
    );

    // Add a dictionary to keep track of the registered async reducers
    store.asyncReducers = {};

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./root-reducer', () => {
            store.replaceReducer(createRootReducer(store.asyncReducers, browserHistory));
        });
    }
    if (module.hot) {
        module.hot.accept('./root-epic', () => {
            const nextRootEpic = require('./root-epic').rootEpic;
            // First kill any running epics
            store.dispatch({ type: 'EPIC_END' });
            // Now setup the new one
            epic$.next(nextRootEpic);
        });
    }
    epicMiddleWare.run(rootEpic);
    return store;
}