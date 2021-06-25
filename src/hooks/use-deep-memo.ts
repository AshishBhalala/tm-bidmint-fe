import { useMemo, useRef, DependencyList } from 'react';
import isEqual from 'lodash/fp/isEqual';

export const useDeepCompare = (
	value: DependencyList | undefined
): DependencyList | undefined => {
	const ref = useRef<DependencyList | undefined>();
	if (!isEqual(ref.current, value)) {
		ref.current = value;
	}
	return ref.current;
};
export const useDeepMemo = <T>(
	callback: () => T,
	dependencies: DependencyList | undefined
): T => {
	return useMemo<T>(callback, useDeepCompare(dependencies));
};
