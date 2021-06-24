/* eslint-disable @typescript-eslint/no-explicit-any */
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Observable } from 'rxjs';

const defaultHeaders: any = {
	'Content-Type': 'application/json'
};

/* This can be externalized in environment file. */
const baseUrl: string = 'https://swapi.co/api/';

export const get = (url: string, headers?: any): Observable<AjaxResponse> =>
	ajax.get(baseUrl + url, Object.assign({}, defaultHeaders, headers));

export const post = (url: string, body: any, headers?: any) =>
	ajax.post(baseUrl + url, body, Object.assign({}, defaultHeaders, headers));

export const put = (url: string, headers?: any) =>
	ajax.put(baseUrl + url, Object.assign({}, defaultHeaders, headers));

export const deleteRequest = (url: string, headers?: any) =>
	ajax.delete(baseUrl + url, Object.assign({}, defaultHeaders, headers));
