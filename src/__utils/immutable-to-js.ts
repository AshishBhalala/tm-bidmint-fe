import { Dict } from '__utils/type';
import { isImmutable } from 'immutable';
/* eslint-disable @typescript-eslint/no-explicit-any */

export const propsToJS = (immutableData: any) => {
	const KEY = 0;
	const VALUE = 1;

	const propsJS: Dict<any> = Object.entries(immutableData).reduce(
		(newProps: Dict<any>, currentProp: any) => {
			newProps[currentProp[KEY]] = isImmutable(currentProp[VALUE])
				? currentProp[VALUE].toJS()
				: currentProp[VALUE];
			return newProps;
		},
		{}
	);
	return propsJS;
};
