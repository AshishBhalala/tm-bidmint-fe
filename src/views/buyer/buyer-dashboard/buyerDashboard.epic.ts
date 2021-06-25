import * as Actions from "constant/action";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { AjaxError, AjaxResponse } from "rxjs/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { get , post} from "__utils/ajax-wrapper";
import { API_CONSTANTS } from "__utils/api-constants";
import { FluxStandardAction } from "__utils/type";
import { resolveURLParams } from "__utils/url-param-resolver";


export const saveProposalEpic: Epic<FluxStandardAction, FluxStandardAction> = (action$) => {
  return action$.pipe(
      ofType(Actions.SAVE_PROPOSAL_FORM),
      mergeMap((action: FluxStandardAction) => {

          const { proposalId, sellerId, buyerId, proposalAnswers } = action.payload;

          const url = resolveURLParams(
              API_CONSTANTS.SAVE_PROPOSAL,
              { proposalId: proposalId, sellerId: sellerId, buyerId: buyerId, proposalAnswers: proposalAnswers },
              null,
          );

          return post(url, action.payload.data, { "Content-Type": "application/json" }, true).pipe(
              map((response: AjaxResponse | AjaxError): FluxStandardAction => {
                  if (response.status === 200 && response.response.meta.message === "success") {
                      return {
                          type: Actions.SAVE_PROPOSAL_FORM_SUCCESS,
                          payload: response.response.data
                      };
                  } else {
                      return {
                          type: Actions.SAVE_PROPOSAL_FORM_ERROR,
                          payload: response
                      };
                  }
              }),
              catchError((error) => of({ type: Actions.SAVE_PROPOSAL_FORM_ERROR, error }))
          );
      })
  );
};

export const publishProposalEpic: Epic<FluxStandardAction, FluxStandardAction> = (action$) => {
  return action$.pipe(
      ofType(Actions.PUBLISH_PROPOSAL_QUERY),
      mergeMap((action: FluxStandardAction) => {

          const { bidId} = action.payload;

          const url = resolveURLParams(
              API_CONSTANTS.PUBLISH_PROPOSAL,
              { bidId: bidId},
              null,
          );

          return post(url, action.payload.data, { "Content-Type": "application/json" }, true).pipe(
              map((response: AjaxResponse | AjaxError): FluxStandardAction => {
                  if (response.status === 200 && response.response.meta.message === "success") {
                      return {
                          type: Actions.PUBLISH_PROPOSAL_SUCCESS,
                          payload: response.response.data
                      };
                  } else {
                      return {
                          type: Actions.PUBLISH_PROPOSAL_ERROR,
                          payload: response
                      };
                  }
              }),
              catchError((error) => of({ type: Actions.PUBLISH_PROPOSAL_ERROR, error }))
          );
      })
  );
};
export const getProposalEpic: Epic<
  FluxStandardAction,
  FluxStandardAction
> = (action$) => {
  return action$.pipe(
    ofType(Actions.GET_PROPOSAL),
    mergeMap((action) => {
      const { type, id, status } = action.payload;
			const url = resolveURLParams(
				API_CONSTANTS.GET_PROPOSAL,
				{ type: type, id: id, status: status },
				null
			  );
			  
      return get(
        url,
        {}
      ).pipe(
        map(
          (response: AjaxResponse | AjaxError): FluxStandardAction => {
            if (response.status === 200) {
              return {
                type: Actions.GET_PROPOSAL_SUCCESS,
                payload: {
                  data: response.response
                }
              };
            } else {
              return {
                type: Actions.GET_PROPOSAL_ERROR,
                payload: {
                  data: response
                }
              };
            }
          }
        ),
        catchError((error) => of({ type: Actions.GET_PROPOSAL_ERROR, error }))
      );
    })
  );
};

export const getProposalInfoEpic: Epic<
  FluxStandardAction,
  FluxStandardAction
> = (action$) => {
  return action$.pipe(
    ofType(Actions.GET_PROPOSAL_INFO),
    mergeMap((action) => {
      const { vertical, requestId } = action.payload;
			const url = resolveURLParams(
				API_CONSTANTS.GET_PROPOSAL_INFO,
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
                type: Actions.GET_PROPOSAL_INFO_SUCCESS,
                payload: {
                  data: response.response
                }
              };
            } else {
              return {
                type: Actions.GET_PROPOSAL_INFO_ERROR,
                payload: {
                  data: response
                }
              };
            }
          }
        ),
        catchError((error) => of({ type: Actions.GET_PROPOSAL_INFO_ERROR, error }))
      );
    })
  );
};

