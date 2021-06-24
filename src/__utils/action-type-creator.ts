import snakeCase from 'lodash/fp/snakeCase';
import toUpper from 'lodash/fp/toUpper';

export default function actionTypeCreator(type: string): string {
	return `${toUpper(snakeCase(type))}`;
}
