/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import 'antd/dist/antd.less';
import 'antd/dist/antd.css';
import './app.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
import { flatRoutes } from './routes';
import { AppRoute } from '__utils/type';
import { Menu, Layout } from 'antd';
import BidMint from '../src/images/BidMint.png';
import { RouteComponentProps } from 'react-router-dom';
import { FluxStandardAction } from '__utils/type';
import Navigation from '../src/views/navigation';

const App: React.FC = () => {
	const dashBoardRoutes = flatRoutes.map((routeContent: any, key: any) => {
		return routeContent.path;
	});

	return (
		<Router basename="/">
			<div>
				<Switch>
					<Route exact path={dashBoardRoutes}>
						<Navigation>
							{flatRoutes.map((item: AppRoute) => {
								return item.to ? (
									<Route
										key={item.key}
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										render={() => (
											<Redirect to={item.to as any} />
										)}
									/>
								) : (
									<Route
										key={item.key}
										path={item.path}
										component={item.component}
										exact={item.exact ? item.exact : false}
									/>
								);
							})}
						</Navigation>
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
