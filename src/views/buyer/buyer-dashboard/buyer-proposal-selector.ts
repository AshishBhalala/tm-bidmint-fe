import { createSelector } from "reselect";

const getIsFetching = (state: any) =>
  state.getIn(["buyerProposalReducer", "isFetching"]);