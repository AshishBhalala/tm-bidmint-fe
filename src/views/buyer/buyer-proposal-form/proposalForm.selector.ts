import { createSelector } from 'reselect';

const getSaveProposalData = (state: any) =>
    state.getIn(["saveProposalReducer", "saveProposalResponseData"]);
const getSaveProposalError = (state: any) =>
    state.getIn(["saveProposalReducer", "saveproposalResponseError"]);
const getpublishProposalResponseData = (state: any) =>
    state.getIn(["saveProposalReducer", "publishProposalResponseData"]);
const getpublishProposalResponseError = (state: any) =>
    state.getIn(["saveProposalReducer", "publishProposalResponseError"]);

const saveProposalSelector = createSelector([
    getSaveProposalData,
    getSaveProposalError,
    getpublishProposalResponseData,
    getpublishProposalResponseError
],
    (
        saveProposalResponseData,
        saveproposalResponseError,
        publishProposalResponseData,
        publishProposalResponseError
    ) => ({
        saveProposalResponseData,
        saveproposalResponseError,
        publishProposalResponseData,
        publishProposalResponseError
    }))

export default saveProposalSelector;