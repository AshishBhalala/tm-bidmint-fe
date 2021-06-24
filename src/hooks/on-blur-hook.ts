import { TmField } from 'views/typings';
import { useDispatch } from 'react-redux';

export const useOnBlur = (field: TmField, slideCode: string) => {
	const dispatch = useDispatch();
	const handleBlur = (evt: React.FocusEvent) => {
		dispatch({
			type: 'ON_BLUR',
			evt,
			field,
			slideCode
		});
	};
	return handleBlur;
};
