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

export const getQueryParamsFromString = (search: string) => {
    const queryParams: any = {}
    if (search && search.length) {
        if (search[0] === '?') search = search.substring(1);
        search.split('&').forEach((searchParamStr: string) => {
            const searchParam: string[] = searchParamStr.split('=');
            if (searchParam.length === 2) {
                queryParams[searchParam[0]] = searchParam[1];
            }
        });
    }
    return queryParams;
}