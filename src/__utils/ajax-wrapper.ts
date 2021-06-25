/* eslint-disable @typescript-eslint/no-explicit-any */
import { ajax, AjaxResponse } from "rxjs/ajax";
import { Observable, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { message } from "antd";
export const setCookie = (
	name: string,
	value: string | number | boolean,
	days = 7,
	path = "/"
) => {
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie =
		name +
		"=" +
		encodeURIComponent(value) +
		"; expires=" +
		expires +
		"; path=" +
		path;
};
export const getCookie = (name: string) => {
	return document.cookie.split("; ").reduce((r, v) => {
		const parts = v.split("=");
		return parts[0] === name ? decodeURIComponent(parts[1]) : r;
	}, "");
};
export const deleteCookie = (name: any, path: string | undefined) => {
	setCookie(name, "", -1, path);
};
// const defaultHeaders: any = {
//  // "Access-Control-Allow-Origin":"*"
//   // "X-CSRFToken":
//   //   document.cookie &&
//   //   typeof document.cookie === "string" &&
//   //   getCookie("csrftoken")
// };

export const getDefaultHeaders = () => {
  return {
  };
};

export const getContentTypeJsonHeader = () => {
  return {
    "Content-Type": "application/json"
  }
}
let baseUrl = 'http://localhost:1212';
export const getJSON = (
	url: string,
	headers?: any
): Observable<AjaxResponse> => {
	return ajax.getJSON(url, Object.assign({}, getDefaultHeaders(), headers));
};

const handleAPISuccess = (
	response: AjaxResponse,
	showErrorMessage?: boolean
): AjaxResponse => {
	if (showErrorMessage && response.response.status === "failure") {
		message.error(response.response.responseData);
	}
	return response;
};

const handleAPIError = (error: any) => {
	if (error && error.status === 401) {
		let redirect = window.location.pathname + window.location.search;
		// remove starting /tma
		redirect = redirect.replace("/tma", "");
		window.location.href = window.location.origin + '/tma/login?redirect=' + redirect;
	} else if (error && error.status === 403) {
		message.error("You are not authorised to perform this operation");
	}
	return throwError(error);
};

export const get = (
	url: string,
	headers?: any,
	showLoader?: boolean,
	baseServiceURL?: any
): Observable<AjaxResponse> => {
	// ajax.get(baseUrl + url, Object.assign({}, defaultHeaders, headers));
	if (baseServiceURL) {
		url = baseServiceURL + url;
	}
	url = baseUrl + url;
	return ajax({
		url: url,
		method: "GET",
		// body: { dummy: true },
		// crossDomain: true,
		withCredentials: false,
		headers: Object.assign({}, getDefaultHeaders(), headers)
	}).pipe(
		map(
			(response: AjaxResponse): AjaxResponse => handleAPISuccess(response)
		),
		catchError((error: any) => handleAPIError(error))
	);
};
export const post = (
	url: string,
	body: any,
	headers?: any,
	showLoader?: boolean,
	baseServiceURL?: any
) => {
	if (baseServiceURL) {
		url = baseServiceURL + url;
	}
	url = baseUrl + url;

	return ajax({
		url: url,
		method: "POST",
		body,
		// crossDomain: true,
		withCredentials: false,
		headers: Object.assign({}, getDefaultHeaders(), headers)
	}).pipe(
		map(
			(response: AjaxResponse): AjaxResponse => handleAPISuccess(response)
		),
		catchError((error: any) => handleAPIError(error))
	);
};
export const put = (url: string, headers?: any, showLoader?: boolean) => {
	// ajax.put(baseUrl + url, Object.assign({}, defaultHeaders, headers));
	return ajax({
		url: url,
		method: "PUT",
		// crossDomain: true,
		withCredentials: false,
		headers: Object.assign({}, getDefaultHeaders(), headers)
	}).pipe(
		map(
			(response: AjaxResponse): AjaxResponse => handleAPISuccess(response)
		),
		catchError((error: any) => handleAPIError(error))
	);
};
export const deleteRequest = (
	url: string,
	headers?: any,
	showLoader?: boolean,
	baseServiceURL?: any
) => {
	// ajax.delete(baseUrl + url, Object.assign({}, defaultHeaders, headers));
	if (baseServiceURL) {
		url = baseServiceURL + url;
	}
	return ajax({
		url: url,
		method: "DELETE",
		// crossDomain: true,
		withCredentials: false,
		headers: Object.assign({}, getDefaultHeaders(), headers)
	}).pipe(
		map(
			(response: AjaxResponse): AjaxResponse => handleAPISuccess(response)
		),
		catchError((error: any) => handleAPIError(error))
	);
};
