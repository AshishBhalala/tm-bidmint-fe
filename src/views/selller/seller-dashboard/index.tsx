import React, {useState, useEffect} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card , Modal, Menu, Dropdown, message} from 'antd';
import { FormModel } from 'components/proposal-form';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch} from 'react-redux';
import * as Actions from "constant/action";
import {  useSelector } from "react-redux";
import { propsToJS } from "__utils/immutable-to-js";
import BuyerDashBoardSelector from "../../buyer/buyer-dashboard/buyerDashboard.selector";
import SellerDashBoardSelector from "../seller-dashboard/sellerDashboard.selector";



import { useDeepCompare } from "hooks/use-deep-memo";

interface SellerDashboardProps {
	someProp: string;
}

const SellerDashboard: React.FC<SellerDashboardProps> = () => {

	const sellerIdValue = window.location.href.split('sellerId=')[1];
	const dispatch = useDispatch();
	const [showProposalDetail, setShowProposalDetail] = useState<boolean>(false);
	const [showProposals, setShowProposals] = useState<boolean>(false);

	const [proposalData, setProposalData] = useState<any>();
	const [proposalFormData, setProposalFormData] = useState<any>();

	const [proposalId, setProposalId] = useState<any>();

	const [buyerId, setBuyerId] = useState<any>();
	const [bidId, setBidId] = useState<any>();
	const [bidAmount, setBidAmount] = useState<any>(null);


	const [bidSaved, setBidSaved] = useState<boolean>(false);


	const [sellerId, setSellerId] = useState<any>(sellerIdValue);

	const [proposalSaveType, setProposalSaveType] = useState<any>(null);



	const { proposal, proposalError, proposalInfo, proposalInfoError } = propsToJS(useSelector(BuyerDashBoardSelector));
	const { savedBids, savedBidError, publishBid, publishBidError } = propsToJS(useSelector(SellerDashBoardSelector));



	useEffect(() => {
			dispatch({ type: Actions.GET_PROPOSAL, payload: { type : "seller"} })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	useEffect(() => {
		if(proposal){
			setProposalData(proposal);
			setShowProposals(true);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [useDeepCompare(proposal)]);

	useEffect(() => {
		if(publishBid){
			message.success("Bid saved successfully");
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [useDeepCompare(publishBid)]);

	useEffect(() => {
		if(proposalInfo){
			setShowProposalDetail(true);

		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [useDeepCompare(proposalInfo)]);

	useEffect(() => {
		if(savedBids){
			if(proposalSaveType === 'save'){
				closeModel();
				message.success("Bid saved successfully")
			} else {          
				dispatch({ type: Actions.PUBLISH_BID_QUERY, payload: {bidId : savedBids.bidId, amount: bidAmount, percent: 100}});
			}
			setProposalSaveType(null);
		}
			setBidSaved(true);
			//setBidId(savedBids.body.meta.bidId);
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [useDeepCompare(savedBids)]);

	useEffect(() => {
		if(savedBidError){
			message.success("Error Saving Bid")
			setBidSaved(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [useDeepCompare(savedBidError)]);

	const bidNowhandler = (detail: any) => {
		let proposalId = detail.id;
		setBuyerId(detail.buyerId);
		setProposalId(detail.id);
		setProposalFormData(detail.proposalQuestions[0]);
		//dispatch({ type: Actions.GET_PROPOSAL_INFO, payload: { proposalId : proposalId} });
		setShowProposalDetail(true);

	}

	const formSubmit = (formdata: any) =>{
		console.log("values coming in buyer", formdata);	
  }

	const closeModel = () => {
		setBidSaved(false);
		setBuyerId(null);
		setProposalId(null);
		setProposalFormData(null);
		setShowProposalDetail(false);
	}

	const filterByhandler = (filter: any) => {
		dispatch({ type: Actions.GET_PROPOSAL, payload: { type : "seller", status: filter,} });
  }

	const saveBidhandler = (formdata: any, saveType : string) => {
		let proposalQuestions: any[] = [];
		 proposalQuestions.push(formdata);
		let payLoad = {
			"proposalId": proposalId,
			"sellerId": sellerId,
			"proposalAnswers":proposalQuestions,
			"buyerId":buyerId
	 }
	 	dispatch({ type: 'RESET_BID_DETAIL'});
	  setBidAmount(formdata.BidAmount);
	  setProposalSaveType(saveType);
		dispatch({ type: Actions.SAVE_BID_QUERY, payload: payLoad });
	}

	const menu = (
		<Menu>
			<Menu.Item key="0" onClick={()=>filterByhandler(null)}>
				All
			</Menu.Item>
			<Menu.Item key="1" onClick={()=>filterByhandler("DRAFT")}>
				Draft
			</Menu.Item>
			<Menu.Item key="3" onClick={()=>filterByhandler("PENDING")}>Pending</Menu.Item>
			<Menu.Item key="4" onClick={()=>filterByhandler("ACCEPTED")}>Accepted</Menu.Item>
			<Menu.Item key="5" onClick={()=>filterByhandler("ACTIVE")}>Active</Menu.Item>
		</Menu>
	);
	return (
		<div>
			<Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Filter By <DownOutlined/>
      </a>
  		</Dropdown>
			{proposalData ? proposalData.map((item: any, index: any) => {
				return (
				<Card id={index} style={{marginTop: 16 }} title="Card title" extra={<a href="#" onClick={() => bidNowhandler(item.body)} >Bid Now</a>}>
						{item.body && item.body.proposalQuestions ? Object.keys(item.body.proposalQuestions[0]).map((key: any, value: any) => {
                            return (<p id={item.body.id + value}>{key + ':' + item.body.proposalQuestions[0][key]}</p>)
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
				<FormModel save={saveBidhandler} publish = {saveBidhandler} type ="seller" buyerData={proposalFormData}></FormModel>
			</Modal>}
			
		</div>
	);
};

export default SellerDashboard;
