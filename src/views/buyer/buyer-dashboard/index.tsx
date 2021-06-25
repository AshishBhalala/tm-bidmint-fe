import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'antd';
import { size } from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch, useSelector } from 'react-redux';
import { GET_BUYER_PROPOSAL_RECORDS } from 'constants/action';
import BuyerProposalSelector from '../buyer-dashboard/buyer-proposal-selector';
import { some } from 'lodash/fp';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const BuyerDashboard: React.FC<any> = ( ) => {
	const {getBuyerProposerDataOnSuccess, getBuyerProposerDataOnError} = useSelector(BuyerProposalSelector);
	const objectData = {type : "buyer", status :"ACTIVE", id: "28d274f7-f73c-45e0-b848-6c709845d742"};
	const dispatch = useDispatch();
	useEffect(() => {
		return () => {
			dispatch({ type: GET_BUYER_PROPOSAL_RECORDS, payload: objectData});
		};
	}, []);

const [buyerProposerData,setBuyerProposerData]= useState([]);
	useEffect(() => {
		if(getBuyerProposerDataOnSuccess){
			setBuyerProposerData ( getBuyerProposerDataOnSuccess);
		}
	}
	)

	return (
		<div className="container-fluid">
			{buyerProposerData.map(item => {
				return (
					<Card>{item}</Card>
				);
			})}
		</div>
	);
};


export default BuyerDashboard;
