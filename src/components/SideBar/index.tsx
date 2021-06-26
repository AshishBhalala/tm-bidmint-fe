import { Layout, Menu } from 'antd';
import React from 'react';
import BidMint from '../../images/BidMint.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface SidebarMenuProps {
	collapsed: boolean;
	setCollapsed: (collapsed: boolean) => void;
	onMenuItemClick: (key: any) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = (props: SidebarMenuProps) => {
	return (
		<Sider
			collapsible
			collapsed={props.collapsed}
			onCollapse={() => props.setCollapsed(!props.collapsed)}
		>
			<img
				src={BidMint}
				alt=""
				style={{ height: '100px', width: '200px' }}
			/>
			<Menu
				theme="dark"
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode="inline"
				onClick={props.onMenuItemClick}
			>
				<SubMenu key="sub1" title="Buyer">
					<Menu.Item key="buyer-proposal-form">Proposal</Menu.Item>
					<Menu.Item key="buyer-dashboard">Dashboard</Menu.Item>
				</SubMenu>
				<SubMenu key="sub2" title="Seller">
					<Menu.Item key="seller-dashboard">Dashboard</Menu.Item>
				</SubMenu>
			</Menu>
		</Sider>
	);
};

export default SidebarMenu;
