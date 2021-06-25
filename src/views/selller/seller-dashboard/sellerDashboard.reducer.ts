import * as Actions from "constant/action";
import { fromJS, merge } from "immutable";
import { FluxStandardAction } from "__utils/type";

export interface SellerDashboardState {
  isFetching: boolean;
  error: undefined | string;
}
const rawState: SellerDashboardState = {
  isFetching: false,
  error: undefined,

};
const intialState = fromJS(rawState);

export default function sellerDashboardReducer(
  state = intialState,
  action: FluxStandardAction
) {
  switch (action.type) {
    case Actions.SAVE_BID_SUCCESS:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.SAVE_BID_ERROR:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.PUBLISH_BID_SUCCESS:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.PUBLISH_BID_ERROR:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.BIDS_BY_SELLER_SUCCESS:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.BIDS_BY_SELLER_ERROR:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.GET_BID_INFO_SUCCESS:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    case Actions.GET_BID_INFO_ERROR:
      return merge(state, fromJS({ premiumInsights: action.payload.data }));
    default:
      return state;
  }
}
