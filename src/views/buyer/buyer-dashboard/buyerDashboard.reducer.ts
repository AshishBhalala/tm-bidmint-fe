import * as Actions from "constant/action";
import { fromJS, merge } from "immutable";
import { FluxStandardAction } from "__utils/type";
export interface BuyerDashboardState {
  isFetching: boolean;
  error: undefined | string;
}
const rawState: BuyerDashboardState = {
  isFetching: false,
  error: undefined,
};
const intialState = fromJS(rawState);
export default function bellerDashboardReducer(
  state = intialState,
  action: FluxStandardAction
) {
  switch (action.type) {
    case Actions.SAVE_PROPOSAL_FORM_SUCCESS:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.SAVE_PROPOSAL_FORM_ERROR:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.PUBLISH_PROPOSAL_SUCCESS:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.PUBLISH_PROPOSAL_ERROR:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.GET_PROPOSAL_SUCCESS:
      return merge(state, fromJS({ proposal: action.payload.data }));
    case Actions.GET_PROPOSAL_ERROR:
      return merge(state, fromJS({ proposalError: action.payload.data }));
    case Actions.GET_PROPOSAL_INFO_SUCCESS:
      return merge(state, fromJS({ proposalInfo: action.payload.data }));
    case Actions.GET_PROPOSAL_INFO_ERROR:
      return merge(state, fromJS({ proposalInfoError: action.payload.data }));
    case Actions.GET_PROPOSAL_BIDS_SUCCESS:
          return merge(state, fromJS({ proposalBids: action.payload.data }));
    case Actions.GET_PROPOSAL_BIDS_ERROR:
          return merge(state, fromJS({ proposalBidsError: action.payload.data }));
   case 'GET_PROPOSAL_BIDS_RESET':
             return merge(state, fromJS({ proposalBids: null, proposalBidsError: null }));
   case 'ACCEPT_BIDS_SUCCESS':
          return merge(state, fromJS({ acceptBid: action.payload.data }));
    case 'ACCEPT_BIDS_ERROR':
          return merge(state, fromJS({ acceptBidError: action.payload.data }));
    default:
      return state;
  }
}


