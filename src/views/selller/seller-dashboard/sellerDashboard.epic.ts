import * as Actions from "constant/action";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { AjaxError, AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { get , post} from "__utils/ajax-wrapper";
import { API_CONSTANTS } from "__utils/api-constants";
import { FluxStandardAction } from "__utils/type";
import { resolveURLParams } from "__utils/url-param-resolver";


export const saveBidEpic: Epic<FluxStandardAction, FluxStandardAction> = (action$) => {
  return action$.pipe(
      ofType(Actions.SAVE_BID_QUERY),
      mergeMap((action: FluxStandardAction) => {

          const { proposalId, sellerId, buyerId, proposalAnswers } = action.payload;
          return post(API_CONSTANTS.SAVE_BID, action.payload, { "Content-Type": "application/json" }, true).pipe(
              map((response: AjaxResponse | AjaxError): FluxStandardAction => {
                  if (response.status === 200 ) {
                      return {
                          type: Actions.SAVE_BID_SUCCESS,
                          payload: response.response.meta
                      };
                  } else {
                      return {
                          type: Actions.SAVE_BID_ERROR,
                          payload: response
                      };
                  }
              }),
              catchError((error) => of({ type: Actions.SAVE_BID_ERROR, error }))
          );
      })
  );
};

export const publishBidEpic: Epic<FluxStandardAction, FluxStandardAction> = (action$) => {
  return action$.pipe(
      ofType(Actions.PUBLISH_BID_QUERY),
      mergeMap((action: FluxStandardAction) => {

          const { bidId, amount, percent} = action.payload;

          const url = resolveURLParams(
              API_CONSTANTS.PUBLISH_BID,
              { bidId: bidId, amount:amount, percent},
              null,
          );

          return post(url, action.payload.data, { "Content-Type": "application/json" }, true).pipe(
              map((response: AjaxResponse | AjaxError): FluxStandardAction => {
                  if (response.status === 200) {
                      return {
                          type: Actions.PUBLISH_BID_SUCCESS,
                          payload: response.response
                      };
                  } else {
                      return {
                          type: Actions.PUBLISH_BID_ERROR,
                          payload: response
                      };
                  }
              }),
              catchError((error) => of({ type: Actions.PUBLISH_BID_ERROR, error }))
          );
      })
  );
};
export const getBidsBySellerEpic: Epic<
  FluxStandardAction,
  FluxStandardAction
> = (action$) => {
  return action$.pipe(
    ofType(Actions.GET_BIDS_BY_SELLER_QUERY),
    mergeMap((action) => {
      const { vertical, requestId } = action.payload;
			const url = resolveURLParams(
				API_CONSTANTS.GET_BIDS_SELLER,
				null,
				{ vertical: vertical, requestId: requestId }
			  );
			  
      return get(
        url,
        {}
      ).pipe(
        map(
          (response: AjaxResponse | AjaxError): FluxStandardAction => {
            if (response.status === 200) {
              return {
                type: Actions.BIDS_BY_SELLER_SUCCESS,
                payload: {
                  data: response.response
                }
              };
            } else {
              return {
                type: Actions.BIDS_BY_SELLER_ERROR,
                payload: {
                  data: response
                }
              };
            }
          }
        ),
        catchError((error) => of({ type: Actions.BIDS_BY_SELLER_ERROR, error }))
      );
    })
  );
};

export const getBidInfoEpic: Epic<
  FluxStandardAction,
  FluxStandardAction
> = (action$) => {
  return action$.pipe(
    ofType(Actions.GET_BIDS_INFO_QUERY),
    mergeMap((action) => {
      const { vertical, requestId } = action.payload;
			const url = resolveURLParams(
				API_CONSTANTS.GET_BID_INFO,
				null,
				{ vertical: vertical, requestId: requestId }
			  );
			  
      return get(
        url,
        {}
      ).pipe(
        map(
          (response: AjaxResponse | AjaxError): FluxStandardAction => {
            if (response.status === 200) {
              return {
                type: Actions.GET_BID_INFO_SUCCESS,
                payload: {
                  data: response.response
                }
              };
            } else {
              return {
                type: Actions.GET_BID_INFO_ERROR,
                payload: {
                  data: response
                }
              };
            }
          }
        ),
        catchError((error) => of({ type: Actions.GET_BID_INFO_ERROR, error }))
      );
    })
  );
};

