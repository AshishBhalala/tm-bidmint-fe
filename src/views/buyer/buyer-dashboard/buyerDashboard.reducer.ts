import * as Actions from "constant/action";
import { fromJS, merge } from "immutable";
import { FluxStandardAction } from "__utils/type";

export interface BuyerDashboardState {
  saveproposaldata: unknown,
  saveproposalError: unknown,
  publishPropsalData: unknown,
  publishProposalError: unknown,
  allProposal : unknown,
  allProposalError : unknown
}
const rawState: BuyerDashboardState = {
  saveproposaldata: null,
  saveproposalError: null,
  publishPropsalData: null,
  publishProposalError: null,
  allProposal : [{}],
  allProposalError: null

};
const intialState = fromJS(rawState);

export default function buyerDashboardReducer(
  state = intialState,
  action: FluxStandardAction
) {
  switch (action.type) {
    case Actions.SAVE_PROPOSAL_FORM_SUCCESS:
      return merge(state, fromJS({ saveproposaldata: action.payload.data }));
    case Actions.SAVE_PROPOSAL_FORM_ERROR:
      return merge(state, fromJS({ saveproposalError: action.payload.data }));
    case Actions.PUBLISH_PROPOSAL_SUCCESS:
      return merge(state, fromJS({ publishPropsalData: action.payload.data }));
    case Actions.PUBLISH_PROPOSAL_ERROR:
      return merge(state, fromJS({ publishProposalError: action.payload.data }));
    case Actions.GET_PROPOSAL_SUCCESS:
      return merge(state, fromJS({ allProposal: action.payload.data }));
    case Actions.GET_PROPOSAL_ERROR:
      return merge(state, fromJS({ allProposalError: action.payload.data }));
    case Actions.GET_PROPOSAL_INFO_SUCCESS:
      return merge(state, fromJS({ proposalInfo: action.payload.data }));
    case Actions.GET_PROPOSAL_INFO_ERROR:
      return merge(state, fromJS({ proposalInfoError: action.payload.data }));
    default:
      return state;
  }
}
