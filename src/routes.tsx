// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
// import Loadable from 'react-loadable';
import Home from './views/home';
import About from './views/about';
import { AppRoute } from '__utils/type';
import { FormModel } from 'components/proposal-form';
import ProposalForm from 'views/buyer/buyer-proposal-form';

// const AsyncAbout = Loadable({
//     loader: () => import(/* webpackChunkName: "about" */ './views/about'),
//     loading: () => <div>Loading...</div>,
// });

// export interface Route {
// 	path?: string;

// 	component?:  // eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		| React.ComponentType<RouteComponentProps<any>>
// 		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 		| React.ComponentType<any>;
// 	exact?: boolean;
// 	children?: Route[];
// 	redirect?: {
// 		pathname: string;
// 	};
// }

/**
 * Spreads out routes for V4 router to have a flat hierarchy
 * @param routesData nested routes
 * @param parent recursion path variable to spread path
 * @returns flatRoutes
 */

export const spreadRoutes = (
	routesData: AppRoute[],
	parent = ''
): AppRoute[] => {
	parent = parent === '/' ? '' : parent;
	return routesData.reduce((acc: AppRoute[], route: AppRoute) => {
		return [
			...acc,
			{ ...route, path: parent + route.path },
			...(route.children
				? spreadRoutes(route.children, parent + route.path)
				: [])
		];
	}, []);
};

export const routes: AppRoute[] = [
	{
		key: 1,
		path: '/',
		component: Home,
		exact: true
	},
	{
		key: 2,
		path: '/about',
		component: About,
		exact: true
	},
	{
		key: 3,
		path:'/buyer-proposal-form',
		component: ProposalForm,
		exact: true
	},
	// /* DO NOT CHANGE THE ORDER OF THESE BELOW */
	// {
	//     path: '/crm',
	//     component: () => <div></div>,
	//     exact: true,
	//     routes: [
	//         {
	//             path: '/:id',
	//             component: () => <div>Id page</div>,
	//         },
	//     ],
	// },
	{
		key: 29,
		component: () => <div>Error page</div>,
		path: '**'
	}
];

export const flatRoutes = spreadRoutes(routes);
