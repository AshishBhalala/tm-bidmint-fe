/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";

const getSaveproposaldata = (state: any) =>
  state.getIn(["buyerDashboardReducer", "saveproposaldata"]);
const getSaveproposalError = (state: any) =>
  state.getIn(["buyerDashboardReducer", "saveproposalError"]);
const getPublishProposal = (state: any) =>
  state.getIn(["buyerDashboardReducer", "publishPropsalData"]);
const getPublishProposalError = (state: any) =>
  state.getIn(["buyerDashboardReducer", "publishProposalError"]);
const getAllProposal = (state: any) =>
  state.getIn(["buyerDashboardReducer", "allProposal"]);
const getAllProposalError = (state: any) =>
  state.getIn(["buyerDashboardReducer", "allProposalError"]);
const getProposalInfo = (state: any) =>
  state.getIn(["buyerDashboardReducer", "proposalInfo"]);
const getProposalInfoError = (state: any) =>
  state.getIn(["buyerDashboardReducer", "proposalInfoError"]);

const BuyerDashBoardSelector = createSelector(
  [
    getSaveproposaldata,
    getSaveproposalError,
    getPublishProposal,
    getPublishProposalError,
    getAllProposal,
    getAllProposalError,
    getProposalInfo,
    getProposalInfoError
  ],
  (
    saveproposaldata,
    saveproposalError,
    publishPropsalData,
    publishProposalError,
    allProposal,
    allProposalError,
    proposalInfo,
    proposalInfoError
  ) => ({
    saveproposaldata,
    saveproposalError,
    publishPropsalData,
    publishProposalError,
    allProposal,
    allProposalError,
    proposalInfo,
    proposalInfoError
  })
);

export default BuyerDashBoardSelector;
