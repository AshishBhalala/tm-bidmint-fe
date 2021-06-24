import { ajax, AjaxResponse, AjaxError } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import actionTypeCreator from '__utils/action-type-creator';
import { FluxStandardAction } from '__utils/type';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'react';

const useFetchData = (fieldName: string, slideCode: string) => {
	const dispatch = useDispatch<Dispatch<FluxStandardAction>>();
	const fetchData = (url: string, resultsKey: string) => {
		dispatch({ type: 'FETCHING_DATA', payload: { fieldName, slideCode } });
		const fetchObs = ajax({
			url
		}).pipe(
			map(
				(response: AjaxResponse | AjaxError): FluxStandardAction => {
					const responseJson = response.response;
					if (response.status === 200) {
						const data = resultsKey
							? responseJson[resultsKey]
							: responseJson;
						return {
							type: actionTypeCreator('FETCH_DATA_SUCCESS'),
							payload: {
								fieldName,
								slideCode,
								data
							}
						};
					} else {
						return {
							type: actionTypeCreator('FETCH_DATA_ERROR'),
							payload: {
								fieldName,
								slideCode
							},
							error: responseJson.errorMessage
						};
					}
				}
			),
			catchError(error =>
				of({
					type: 'FETCH_DATA_ERROR',
					payload: {
						fieldName,
						slideCode
					},
					error
				})
			)
		);

		fetchObs.subscribe((response: FluxStandardAction) => {
			dispatch(response);
		});
	};
	return fetchData;
};

export default useFetchData;
