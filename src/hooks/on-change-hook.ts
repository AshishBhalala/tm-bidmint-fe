import { useDispatch } from 'react-redux';
import { TmField } from 'views/typings';
import { Dispatch } from 'react';
import { FluxStandardAction } from '__utils/type';

export const useOnChange = (field: TmField, slideCode: string) => {
	const dispatch = useDispatch<Dispatch<FluxStandardAction>>();
	const handleChange = (selectedValue: string | number | boolean) => {
		dispatch({
			type: 'ON_CHANGE',
			payload: {
				field,
				slideCode,
				value: selectedValue
			}
		});
	};
	return handleChange;
};
