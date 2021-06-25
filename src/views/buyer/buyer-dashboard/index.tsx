import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'antd';
import { size } from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch, useSelector } from 'react-redux';
import { GET_BUYER_PROPOSAL_RECORDS } from 'constants/action';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface BuyerProposalCard {
	dataSource : any
}
interface BuyerDashboardProps {
	someProp: BuyerProposalCard[];
}

const dispatch = useDispatch();

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
	someProp
}: BuyerDashboardProps) => {
	useEffect(() => {
		return () => {
			dispatch({ type: GET_BUYER_PROPOSAL_RECORDS });
		};
	}, [dispatch]);

	return (
		<div className="container-fluid">
			{someProp.map(item => {
				return (
					<BuyerDashboardCardItem
                    dataSource={item.dataSource}
						
					></BuyerDashboardCardItem>
				);
			})}
		</div>
	);
};

export const BuyerDashboardCardItem: React.FC<BuyerProposalCard> = ({
	dataSource
}: BuyerProposalCard) => {
	return (
		<div className="row d-flex">
			<Card>
				<p>{dataSource}</p>
			</Card>
		</div>
	);
};

export default BuyerDashboard;
