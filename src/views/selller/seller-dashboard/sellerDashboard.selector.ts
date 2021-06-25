/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "reselect";

const getIsFetching = (state: any) =>
  state.getIn(["sellerDashboardReducer", "isFetching"]);
const getSaveBid = (state: any) =>
  state.getIn(["sellerDashboardReducer", "savedBids"]);
const getSaveBidError = (state: any) =>
  state.getIn(["sellerDashboardReducer", "savedBidError"]);
const getPublishBid = (state: any) =>
  state.getIn(["sellerDashboardReducer", "publishBid"]);
const getPublishBidError = (state: any) =>
  state.getIn(["sellerDashboardReducer", "publishBidError"]);
const getBidBySeller = (state: any) =>
  state.getIn(["sellerDashboardReducer", "bidBySeller"]);
const getBidBySellerError = (state: any) =>
  state.getIn(["sellerDashboardReducer", "bidBySellerError"]);
const getBidInfo = (state: any) =>
  state.getIn(["sellerDashboardReducer", "bidInfo"]);
const getBidInfoError = (state: any) =>
  state.getIn(["sellerDashboardReducer", "bidInfoError"]);

const SellerDashBoardSelector = createSelector(
  [
    getIsFetching,
    getSaveBid,
    getSaveBidError,
    getPublishBid,
    getPublishBidError,
    getBidBySeller,
    getBidBySellerError,
    getBidInfo,
    getBidInfoError
  ],
  (
    isFetching,
    savedBids,
    savedBidError,
    publishBid,
    publishBidError,
    bidBySeller,
    bidBySellerError,
    bidInfo,
    bidInfoError
  ) => ({
    isFetching,
    savedBids,
    savedBidError,
    publishBid,
    publishBidError,
    bidBySeller,
    bidBySellerError,
    bidInfo,
    bidInfoError
  })
);

export default SellerDashBoardSelector;
