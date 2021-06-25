import { ofType, Epic } from "redux-observable";
import { of, from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AjaxResponse, AjaxError } from "rxjs/ajax";
import { get, post } from "__utils/ajax-wrapper";
import { FluxStandardAction } from "__utils/type";
import { message } from "antd";
import * as Actions from "constant/action"
import { API_CONSTANTS } from "__utils/api-constants";
import { resolveURLParams } from "__utils/url-param-resolver";

export const excuteSaveProposalForm: Epic<FluxStandardAction, FluxStandardAction> = (action$) => {
    return action$.pipe(
        ofType(Actions.SAVE_PROPOSAL_FORM_API),
        mergeMap((action) => {
            return post(API_CONSTANTS.SAVE_PROPOSAL, action.payload).pipe(
                map(
                    (response: AjaxResponse | AjaxError): FluxStandardAction => {
                        if (response.status == 200) {
                            console.log("response ", response);

                            return {
                                type: Actions.SAVE_PROPOSAL_FORM_API_SUCCESS,
                                payload: {
                                    data: response.response
                                }
                            }
                        } else {
                            return {
                                type: Actions.SAVE_PROPOSAL_FORM_API_ERROR,
                                payload: {
                                    data: response.response
                                }
                            };
                        }
                    }
                ),
                catchError((error) => of({ type: Actions.SAVE_PROPOSAL_FORM_API_ERROR, error }))
            )
        })
    )
}

export const excutePublishProposal: Epic<FluxStandardAction, FluxStandardAction> = (action$) => {
    return action$.pipe(
        ofType(Actions.PUBLISH_PROPOSAL_API),
        mergeMap((action) => {
            const url = resolveURLParams(
                API_CONSTANTS.PUBLISH_PROPOSAL,
                action.payload,
                null,
            )
            console.log("action.payload.proposalId", action);
            console.log("url", url);

            return post(url, null).pipe(
                map(
                    (response: AjaxResponse | AjaxError): FluxStandardAction => {
                        if (response.status == 200) {
                            console.log("response ", response);

                            return {
                                type: Actions.PUBLISH_PROPOSAL_API_SUCCESS,
                                payload: {
                                    data: response.response
                                }
                            }
                        } else {
                            return {
                                type: Actions.PUBLISH_PROPOSAL_API_ERROR,
                                payload: {
                                    data: response.response
                                }
                            };
                        }
                    }
                ),
                catchError((error) => of({ type: Actions.PUBLISH_PROPOSAL_API_ERROR, error }))
            )
        })
    )
}