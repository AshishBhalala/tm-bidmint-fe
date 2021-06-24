/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './app.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
import { flatRoutes } from './routes';
import { AppRoute } from '__utils/type';
import "antd/dist/antd.less";
import 'antd/dist/antd.css';

const App: React.FC = () => {
	return (
		<Router>
			<div>
				<Switch>
					{flatRoutes.map((item: AppRoute) => {
						return item.to ? (
							<Route
								key={item.key}
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								render={() => <Redirect to={item.to as any} />}
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
				</Switch>
			</div>
		</Router>
	);
};

export default App;
