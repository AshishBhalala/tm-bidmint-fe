// import React from 'react';
import invariant from 'invariant';
import isEmpty from 'lodash/fp/isEmpty';
import isFunction from 'lodash/fp/isEmpty';
import isString from 'lodash/fp/isEmpty';
import createRootReducer from '../root-reducer';
import { browserHistory } from '../configure-store';

export function injectReducerFactory(store, isValid) {
    return function injectReducer(key, reducer) {
        invariant(
            !isString(key) && !isEmpty(key) && isFunction(reducer),
            '(src/utils...) injectReducer: Expected `reducer` to be a reducer function',
        );

        // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
        if (
            Reflect.has(store.asyncReducers, key) &&
            store.asyncReducers[key] === reducer
        )
        return;
        store.asyncReducers[key] = reducer;
        store.replaceReducer(createRootReducer(store.asyncReducers, browserHistory));
    };
}

export default function getInjectors(store) {
    return {
        injectReducer: injectReducerFactory(store, true),
    };
}
