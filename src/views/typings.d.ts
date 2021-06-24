import { tupleNum } from '__utils/type';

import { Dict } from '__utils/type';

const HTTPStatusCodes = tupleNum(200, 403, 404, 500);
type HTTPStatusCodeType = (typeof HTTPStatusCodes)[number];

type AnalyticsConfig = {
	track: boolean;
	triggerType: string;
	vertical: string;
	source: string;
};

type SelectConfig = {
	valueKey?: string;
	textKey?: string;
	onChange?: string;
	defaultValue?: string;
};
export interface FormGroup {
	label: string;
	code: string;
	fields: TmField[];
	grid?: Grid;
}
export interface TmField {
	name: string;
	label: string;
	type: string;
	subtype?: string;
	required?: boolean;
	hide?: boolean;
	disabled?: boolean;
	options: unknown[];
	analyticsConfig?: AnalyticsConfig;
	changeFn?: string;
	placeholder?: string;
	errorText?: string;
	props: Dict<string>;
	minlength?: number;
	maxlength?: number;
	pattern?: RegExp;
}

const GridValues = tupleNum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
type GridValueType = (typeof GridValues)[number];
export type Grid = {
	xs?: GridValueType[];
	sm?: GridValueType[];
	md?: GridValueType[];
	lg?: GridValueType[];
};

interface CheckoutConfigResponse {
	status: HTTPStatusCodeType;
	data: Data;
}

declare global {
	interface Window {
		dataLayer: Dict<common>;
	}
}

window.dataLayer = window.dataLayer || {};
