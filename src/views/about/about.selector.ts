/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from 'reselect';

const getData = (state: any) => state.getIn(['aboutReducer', 'data']);
const getError = (state: any) => state.getIn(['aboutReducer', 'error']);

const AboutSelector = createSelector(
	[getData, getError],
	(data, error) => ({
		data,
		error
	})
);

export default AboutSelector;
