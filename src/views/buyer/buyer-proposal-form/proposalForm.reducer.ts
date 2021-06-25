import { fromJS, merge } from 'immutable';
import { FluxStandardAction } from '__utils/type';

export interface ProposalState {
	isFetching: boolean;
	data: unknown;
	error: undefined | string;
}
const rawState: ProposalState = {
	isFetching: false,
	data: [],
	error: undefined
};
const intialState = fromJS(rawState);

export default function proposalReducer(
	state = intialState,
	action: FluxStandardAction
) {
	switch (action.type) {
		case 'PROPOSAL_API_SUCCESS':
			return merge(state, fromJS({ data: action.payload.data }));
		case 'PROPOSAL_API_ERROR':
			return merge(state, fromJS({ error: action.error }));
		default:
			return state;
	}
}
