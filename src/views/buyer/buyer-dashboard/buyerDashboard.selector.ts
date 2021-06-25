/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";
const getIsFetching = (state: any) =>
  state.getIn(["buyerDashboardReducer", "isFetching"]);
const getSaveProposal = (state: any) =>
  state.getIn(["buyerDashboardReducer", "savedProposal"]);
const getSaveProposalError = (state: any) =>
  state.getIn(["buyerDashboardReducer", "savedProposalError"]);
const getPublishProposal = (state: any) =>
  state.getIn(["buyerDashboardReducer", "publishProposal"]);
const getPublishProposalError = (state: any) =>
  state.getIn(["buyerDashboardReducer", "publishProposalError"]);
const getProposal = (state: any) =>
  state.getIn(["buyerDashboardReducer", "proposal"]);
const getProposalError = (state: any) =>
  state.getIn(["buyerDashboardReducer", "proposalError"]);
const getProposalInfo = (state: any) =>
  state.getIn(["buyerDashboardReducer", "proposalInfo"]);
const getProposalInfoError = (state: any) =>
  state.getIn(["buyerDashboardReducer", "proposalInfoError"]);
const getProposalBids = (state: any) =>
  state.getIn(["buyerDashboardReducer", "proposalBids"]);
const getproposalBidsError = (state: any) =>
  state.getIn(["buyerDashboardReducer", "proposalBidsError"]);
const getAcceptBid = (state: any) =>
  state.getIn(["buyerDashboardReducer", "acceptBid"]);
const getAcceptBidError = (state: any) =>
  state.getIn(["buyerDashboardReducer", "acceptBidError"]);
const BuyerDashBoardSelector = createSelector(
  [
    getIsFetching,
    getSaveProposal,
    getSaveProposalError,
    getPublishProposal,
    getPublishProposalError,
    getProposal,
    getProposalError,
    getProposalInfo,
    getProposalInfoError,
    getProposalBids,
    getproposalBidsError,
    getAcceptBid,
    getAcceptBidError
  ],
  (
    isFetching,
    savedProposal,
    savedProposalError,
    publishProposal,
    publishProposalError,
    proposal,
    proposalError,
    proposalInfo,
    proposalInfoError,
    proposalBids,
    proposalBidsError,
    acceptBid,
    acceptBidError
  ) => ({
    isFetching,
    savedProposal,
    savedProposalError,
    publishProposal,
    publishProposalError,
    proposal,
    proposalError,
    proposalInfo,
    proposalInfoError,
    proposalBids,
    proposalBidsError,
    acceptBid,
    acceptBidError
  })
);
export default BuyerDashBoardSelector;


