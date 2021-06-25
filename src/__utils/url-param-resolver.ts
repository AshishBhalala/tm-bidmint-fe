export const resolveURLParams = (
	url: string,
	searchParams: any,
	pathParams: any
): string => {
	if (pathParams) {
		Object.keys(pathParams).forEach((key) => {
			if (pathParams[key] !== null && pathParams[key] !== undefined) {
				url = url.replace(`{${key}}`, pathParams[key]);
			}
		});
	}
	if (searchParams) {
		url += '?';
		Object.keys(searchParams).forEach((key) => {
			if (searchParams[key] !== null && searchParams[key] !== undefined) {
				url += key + '=' + searchParams[key] + '&';
			}
		});
	}
	return url;
};
