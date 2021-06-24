import { RouteProps, RedirectProps } from 'react-router';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
export const tuple = <T extends string[]>(...args: T) => args;
export const tupleNum = <T extends number[]>(...args: T) => args;

export type Dict<T> = {
	[key: string]: T;
};

export interface FluxStandardAction {
	type: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload?: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error?: boolean | any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	meta?: any;
}
export interface Dependencies {
	func(value: string): string;
}

export type CommonTypeTuple = string | boolean | number | undefined;

export interface AppRoute extends RouteProps {
	key: number;
	children?: AppRoute[];
	to?: RedirectProps['to'];
}
