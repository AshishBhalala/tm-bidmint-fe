import { createSelector } from 'reselect';

const getIsFetching = (state: any) =>
	state.getIn(['buyerProposalReducer', 'isFetching']);

const getBuyerProposalDataOnSuccess = (state: any) =>
  state.getIn(['buyerProposalReducer', 'getBuyerProposerDataOnSuccess']);

const getBuyerProposalDataOnError =(state :any) =>
state.getIn(['buyerProposalReducer', 'getBuyerProposerDataOnError']);


const BuyerProposalSelector = createSelector(
[
    getIsFetching,
    getBuyerProposalDataOnSuccess,
    getBuyerProposalDataOnError
],
(
    isFetching,
    getBuyerProposerDataOnSuccess,
    getBuyerProposerDataOnError
) =>
({
    isFetching,
    getBuyerProposerDataOnSuccess,
    getBuyerProposerDataOnError

})
);
export default BuyerProposalSelector;
