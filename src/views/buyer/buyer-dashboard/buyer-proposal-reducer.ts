import { any } from 'lodash/fp';
import {
	GET_BUYER_PROPOSAL_RECORDS,
	BUYER_PROPOSAL_ERROR,
	BUYER_PROPOSAL_SUCCESS
} from 'views/constants/actions';
import { FluxStandardAction } from '__utils/type';
import { fromJS, merge } from 'immutable';

interface BuyerProposalReducerState {
	isFetching: boolean;
	buyerProposalError: unknown;
	buyerProposalSuccess: unknown;
}
const rawState: BuyerProposalReducerState = {
	isFetching: false,
	buyerProposalError: null,
	buyerProposalSuccess: null
};

const initialState = fromJS(rawState);

export default function buyerProposalReducer(
	state = initialState,
	action: FluxStandardAction
) {
	switch (action.type) {
		case BUYER_PROPOSAL_SUCCESS:
			return merge(
				state,
				fromJS({ buyerProposalSuccess: action.payload.data })
			);
		case BUYER_PROPOSAL_ERROR:
			return merge(state, fromJS({ buyerProposalError: action.error }));
		default:
			return state;
	}
}
