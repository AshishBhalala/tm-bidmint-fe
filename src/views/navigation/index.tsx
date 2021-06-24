import { Layout } from 'antd';
import SidebarMenu from '../../components/SideBar';
import React, { useEffect, useState, Dispatch } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FluxStandardAction } from '__utils/type';

import { createBrowserHistory } from 'history';

const { Content } = Layout;

interface NavigationProps extends RouteComponentProps {
	dispatch: Dispatch<FluxStandardAction>;
}
const Navigation = (props: any) => {
	const [collapsed, setCollapsed] = useState<boolean>(false);

	const onMenuItemClick = (key: any) => {
		window.location.href = `/${key.key}`;
		//history.push(`/${key.key}`);
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<SidebarMenu
				collapsed={collapsed}
				setCollapsed={setCollapsed}
				onMenuItemClick={onMenuItemClick}
			/>
			<Content style={{ padding: '0 24px', minHeight: 280 }}>
				<div style={{ padding: '5px' }} />
				{props.children || 'Content'}
			</Content>
		</Layout>
	);
};
export default Navigation;
