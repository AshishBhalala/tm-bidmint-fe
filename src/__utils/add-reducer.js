import getInjectors from './reducer-injectors';
import { store } from '../index';

export default function addReducer(key, reducer) {
    const { injectReducer } = getInjectors(store);
    injectReducer(key, reducer);
}
