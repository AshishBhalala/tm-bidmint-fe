import React, {useState, useEffect} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card , Modal, Menu, Dropdown} from 'antd';
import { FormModel } from 'components/proposal-form';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch} from 'react-redux';
import * as Actions from "constant/action";
import {  useSelector } from "react-redux";
import { propsToJS } from "__utils/immutable-to-js";
import BuyerDashBoardSelector from "../../buyer/buyer-dashboard/buyerDashboard.selector";


import { useDeepCompare } from "hooks/use-deep-memo";

interface SellerDashboardProps {
	someProp: string;
}

const SellerDashboard: React.FC<SellerDashboardProps> = () => {
	const dispatch = useDispatch();
	const [showProposalDetail, setShowProposalDetail] = useState<boolean>(false);
	const [showProposals, setShowProposals] = useState<boolean>(false);

	const [proposalData, setProposalData] = useState<any>();
	const { proposal, proposalError } = propsToJS(useSelector(BuyerDashBoardSelector));


	useEffect(() => {
			dispatch({ type: Actions.GET_PROPOSAL, payload: { type : "buyer", status : "DRAFT", id: "79c2c985-b2bd-44d8-8bca-9f499d3109da"} })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	useEffect(() => {
		if(proposal){
			setProposalData(proposal);
			setShowProposals(true);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [useDeepCompare(proposal)]);

	const bidNowhandler = (detail: any) => {
		let proposalId = detail.id;
		setShowProposalDetail(true);

	}

	const formSubmit = (formdata: any) =>{
		console.log("values coming in buyer", formdata);	
  }

	const closeModel = () => {
		setShowProposalDetail(false);
	}
	const menu = (
		<Menu>
			<Menu.Item key="0">
				Saved
			</Menu.Item>
			<Menu.Item key="1">
				Pending
			</Menu.Item>
			<Menu.Item key="3">Active</Menu.Item>
		</Menu>
	);
	return (
		<div>
			<Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Filter By 
      </a>
  		</Dropdown>
			{proposalData ? proposalData.map((item: any, index: any) => {
				return (
				<Card id={index} style={{marginTop: 16 }} title="Card title" extra={<a href="#" onClick={() => bidNowhandler(item.body)} >Bid Now</a>}>
						{item.body && item.body.proposalQuestions ? item.body.proposalQuestions.map((questions: any, value: any) => {
							return (<p id={item.body.id + value}>{JSON.stringify(questions)}</p>)
						}) : <p>No Details</p>}
						{/* {item.body && item.body.proposalQuestions ? Object.keys(item.body.proposalQuestions).map((id: any, value: any) => {
							return (<p id={value}>{item.body.proposalQuestions[id]}</p>)
						}) : <p>No Details</p>} */}
			  </Card>)
			}): null}
      { showProposalDetail && <Modal
					title="Proposal Detail"
					visible={showProposalDetail}
					width="60rem"
					onCancel={closeModel}
					footer={null}>
					<FormModel formSubmit = {formSubmit}></FormModel>
			</Modal>}
			
		</div>
	);
};

export default SellerDashboard;
