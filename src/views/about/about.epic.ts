import { ofType, Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AjaxResponse, AjaxError } from 'rxjs/ajax';
import { get } from '__utils/ajax-wrapper';
import { FluxStandardAction } from '__utils/type';
import { API_CONSTANTS } from '__utils/api-constants';

export const aboutEpic: Epic<
	FluxStandardAction,
	FluxStandardAction
> = action$ => {
	return action$.pipe(
		ofType('ABOUT_API_FETCH'),
		mergeMap(() => {
			return get(API_CONSTANTS.PEOPLE + '/' + '1').pipe(
				map(
					(
						response: AjaxResponse | AjaxError
					): FluxStandardAction => {
						if (response.status === 200) {
							return {
								type: 'ABOUT_API_SUCCESS',
								payload: {
									data: response.response.films
								}
							};
						} else {
							return {
								type: 'ABOUT_API_ERROR',
								payload: {
									data: response
								}
							};
						}
					}
				),
				catchError(error => of({ type: 'ABOUT_API_ERROR', error }))
			);
		})
	);
};
