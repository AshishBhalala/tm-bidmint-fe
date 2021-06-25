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
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.GET_PROPOSAL_ERROR:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.GET_PROPOSAL_INFO_SUCCESS:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.GET_PROPOSAL_INFO_ERROR:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    default:
      return state;
  }
}
