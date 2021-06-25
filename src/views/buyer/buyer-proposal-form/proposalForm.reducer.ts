import { fromJS, merge } from 'immutable';
import { FluxStandardAction } from '__utils/type';

export interface ProposalState {
    saveProposalResponseData: unknown;
    saveproposalResponseError: undefined | unknown;
    publishProposalResponseData: unknown,
    publishProposalResponseError: unknown
}
const rawState: ProposalState = {
    saveProposalResponseData: null,
    saveproposalResponseError: null,
    publishProposalResponseData: null,
    publishProposalResponseError: null
};
const intialState = fromJS(rawState);

export default function saveProposalReducer(
    state = intialState,
    action: FluxStandardAction
) {
    switch (action.type) {
        case 'SAVE_PROPOSAL_FORM_API_SUCCESS':
            return merge(state, fromJS({ saveProposalResponseData: action.payload.data }));
        case 'SAVE_PROPOSAL_FORM_API_ERROR':
            return merge(state, fromJS({ saveproposalResponseError: action.error }));
        case 'PUBLISH_PROPOSAL_API_SUCCESS':
            return merge(state, fromJS({publishProposalResponseData: action.payload.data}));
        case 'PUBLISH_PROPOSAL_API_ERROR':
            return merge(state, fromJS({ publishProposalResponseError: action.error }));
        default:
            return state;
    }
}

