import { any } from 'lodash/fp';
import {
	GET_BUYER_PROPOSAL_RECORDS,
	BUYER_PROPOSAL_ERROR,
	BUYER_PROPOSAL_SUCCESS
} from 'views/constants/actions';
import { FluxStandardAction } from '__utils/type';
import { fromJS, merge } from 'immutable';
import { Epic, ofType } from 'redux-observable';
import { get } from '__utils/ajax-wrapper';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AjaxError, AjaxResponse } from 'rxjs/ajax';
import { API_CONSTANTS } from '__utils/api-constants';
import { resolveURLParams } from '__utils/url-param-resolver';

export const getBuyerProposalEpic: Epic<
	FluxStandardAction,
	FluxStandardAction
> = action$ => {
	return action$.pipe(
		ofType(GET_BUYER_PROPOSAL_RECORDS),
		mergeMap(action => {
			const { vertical, searchParam, searchBy, mobile } = action.payload;

			let url = `${resolveURLParams(
				API_CONSTANTS.FETCH_BUYER_PROPOSAL_RECORDS,
				null,
				{
					vertical: vertical,
					searchParam: searchParam,
					searchBy: searchBy
				}
			)}?searchBy=${searchBy}`;

			if (mobile) {
				url = url + `&mobile=${mobile}`;
			}
			return get(url, {}).pipe(
				map(
					(
						response: AjaxResponse | AjaxError
					): FluxStandardAction => {
						if (response.status === 200) {
							return {
								type: BUYER_PROPOSAL_SUCCESS,
								payload: {
									data: response.response
								}
							};
						} else {
							return {
								type: BUYER_PROPOSAL_ERROR,
								payload: {
									data: response
								}
							};
						}
					}
				),
				catchError(error => of({ type: BUYER_PROPOSAL_ERROR, error }))
			);
		})
	);
};
