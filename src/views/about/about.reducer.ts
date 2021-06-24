import { fromJS, merge } from 'immutable';
import { FluxStandardAction } from '__utils/type';

export interface AboutState {
	isFetching: boolean;
	data: unknown;
	error: undefined | string;
}
const rawState: AboutState = {
	isFetching: false,
	data: [],
	error: undefined
};
const intialState = fromJS(rawState);

export default function aboutReducer(
	state = intialState,
	action: FluxStandardAction
) {
	switch (action.type) {
		case 'ABOUT_API_SUCCESS':
			return merge(state, fromJS({ data: action.payload.data }));
		case 'ABOUT_API_ERROR':
			return merge(state, fromJS({ error: action.error }));
		default:
			return state;
	}
}
