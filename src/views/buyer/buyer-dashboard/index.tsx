import React, { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, Modal, message, Menu, Dropdown, Button } from 'antd';
import { FormModel } from 'components/proposal-form';
import { useDispatch, useSelector } from 'react-redux';
import BuyerDashBoardSelector from './buyerDashboard.selector';
import { propsToJS } from '__utils/immutable-to-js';
import { useDeepCompare } from 'hooks/use-deep-memo';
import * as Actions from 'constant/action'
import { DownOutlined } from '@ant-design/icons';
import saveProposalSelector from '../buyer-proposal-form/proposalForm.selector';

interface BuyerDashboardProps {
	someProp: string;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = () => {

	const buyerIdValue = window.location.href.split('buyerId=')[1];
	window.sessionStorage.setItem('buyerId', buyerIdValue);
	
	const dispatch = useDispatch();
	const [showProposals, setShowProposals] = useState<boolean>(false);
	const [showProposalBids, setshowProposalBids] = useState<boolean>(false);
	const [ProposalBids, setProposalBids] = useState<any>();
	const [showProposalDetail, setShowProposalDetail] = useState<boolean>(false);
	const [proposalFormData, setProposalFormData] = useState<any>();
	const [proposalId, setProposalId] = useState<any>();
	const [proposalData, setProposalData] = useState<any>();
	const { proposal, proposalError, proposalInfo, proposalInfoError, proposalBids, acceptBid } = propsToJS(useSelector(BuyerDashBoardSelector));
	const [proposalSaveType, setProposalSaveType] = useState<any>(null);
	const [proposalTurnAroundT, setproposalTurnAroundT] = useState<any>(null);
	const { saveProposalResponseData, saveproposalResponseError,
		publishProposalResponseData, publishProposalResponseError
	} = propsToJS(useSelector(saveProposalSelector));

	useEffect(() => {
		dispatch({ type: Actions.GET_PROPOSAL, payload: { type: "buyer",  id: buyerIdValue } })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	useEffect(() => {
		if (proposal) {
			setProposalData(proposal);
			setShowProposals(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [useDeepCompare(proposal)]);

	const { allProposal,
		allProposalError,
	} = propsToJS(BuyerDashBoardSelector);


	useEffect(() => {
		if (allProposal) {
			setShowProposalDetail(allProposal);
			console.log("all proposal data", allProposal);
		}
	}, [useDeepCompare(allProposal)])

	useEffect(() => {
		if (acceptBid) {
		    message.success("Bid Accepted")
		}
	}, [useDeepCompare(acceptBid)])

	const viewProposalNowhandler = (detail: any) => {
		let proposalId = detail.id;
		// setBuyerId(detail.buyerId);
		setProposalId(detail.id);
		console.log("proposal data");

		setProposalFormData(detail.proposalQuestions[0]);
		//dispatch({ type: Actions.GET_PROPOSAL_INFO, payload: { proposalId : proposalId} });
		setShowProposalDetail(true);

	}

	const viewProposalhandler = () => {
		setShowProposalDetail(true);
	}

	const formSubmit = (formdata: any) => {
		console.log("values coming in buyer", formdata);
	}

	const closeModel = () => {
		setShowProposalDetail(false);
		setshowProposalBids(false);
	}

	const filterByhandler = (filter: any) => {
		dispatch({ type: Actions.GET_PROPOSAL, payload: { type: "buyer", status: filter, id: buyerIdValue } });
	}

	useEffect(() => {
		if (saveProposalResponseData) {

			if (proposalSaveType === 'save') {
				message.success("Proposal saved successfully")
			} else {
				let publishProposalrequest: any = {};
				publishProposalrequest['proposalId'] = saveProposalResponseData.meta.proposalId;
				publishProposalrequest['turnAroundTime'] = proposalTurnAroundT;
				console.log("publish proposal request", publishProposalrequest);

				dispatch({ type: Actions.RESET_PUBLISH_PROPOSAL_API_DATA });
				dispatch({ type: Actions.PUBLISH_PROPOSAL_API, payload: publishProposalrequest })
			}
			setProposalSaveType(null);
			setproposalTurnAroundT(null);
		}
	}, [useDeepCompare(saveProposalResponseData)]);

	useEffect(() => {
		console.log("proposal bid", proposalBids);

		if (proposalBids != null && proposalBids[0].statusCode !== 'NOT_FOUND') {
			setshowProposalBids(true)
			setProposalBids(proposalBids);
		}
	}, [useDeepCompare(proposalBids)]);

	const saveProposal = (formdata: any, saveType: string) => {
		let proposalQuestions: any = [];
		let name: string = "vaishnavi";
		let buyerId: string = buyerIdValue

		proposalQuestions.push(formdata);

		console.log("turn around time ", formdata['turnAroundTime']);

		setProposalSaveType(saveType);
		setproposalTurnAroundT(formdata['turnAroundTime']);

		dispatch({ type: Actions.RESET_SAVE_PROPOSAL_API_DATA });
		dispatch({ type: Actions.SAVE_PROPOSAL_FORM_API, payload: { "name": name, "proposalQuestions": proposalQuestions, "buyerId": buyerId } })

	}

	const getBids = (proposalId: any) => {
		console.log("coming", proposalId);

		let getBidProposalrequest = {
			"proposalId": proposalId
		}
		dispatch({ type: 'GET_PROPOSAL_BIDS_RESET' })
		dispatch({ type: Actions.GET_PROPOSAL_BIDS, payload: getBidProposalrequest });

	}

	const menu = (
		<Menu>
			<Menu.Item key="0" onClick={() => filterByhandler(null)}>
				All
			</Menu.Item>
			<Menu.Item key="1" onClick={() => filterByhandler("DRAFT")}>
				Draft
			</Menu.Item>
			<Menu.Item key="3" onClick={() => filterByhandler("PENDING")}>Pending</Menu.Item>
			<Menu.Item key="4" onClick={() => filterByhandler("ACCEPTED")}>Accepted</Menu.Item>
			<Menu.Item key="5" onClick={() => filterByhandler("ACTIVE")}>Active</Menu.Item>
		</Menu>
	);

	const viewBidshandler = (bidId: any) => {
		dispatch({ type: "ACCEPT_BIDS", payload: { 'bidId': bidId } })
	}

	return (
		<div>
			<Dropdown overlay={menu} trigger={['click']}>
				<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
					Filter By <DownOutlined />
				</a>
			</Dropdown>
			{proposalData ? proposalData.map((item: any, index: any) => {
				return (
					<Card id={index} style={{ marginTop: 16 }} title="Card title" extra={<a href="#" onClick={() => viewProposalNowhandler(item.body)} >Publish Proposal</a>}>
						{/* {item.body && item.body.proposalQuestions ? item.body.proposalQuestions.map((questions: any, value: any) => {
						return (<p id={item.body.id + value}>{JSON.stringify(questions)} <Button onClick={() => getBids(item.body.id)} > Show Bids </Button></p> )
					}) : <p>No Details</p>} */}

						{item.body && item.body.proposalQuestions ? Object.keys(item.body.proposalQuestions[0]).map((key: any, value: any) => {
							return (<p id={item.body.id + value}>{key + ':' + item.body.proposalQuestions[0][key]}</p>
							)
						}) : <p>No Details</p>}
						{<Button onClick={() => getBids(item.body.id)} > Show Bids </Button>}
						{/* {item.body && item.body.proposalQuestions ? Object.keys(item.body.proposalQuestions).map((id: any, value: any) => {
						return (<p id={value}>{item.body.proposalQuestions[id]}</p>)
					}) : <p>No Details</p>} */}
					</Card>)
			}) : null}
			{showProposalDetail && <Modal
				title="Proposal Detail"
				visible={showProposalDetail}
				width="60rem"
				onCancel={closeModel}
				footer={null}>
				<FormModel save={saveProposal} publish={saveProposal} type="buyer" buyerData={proposalFormData}></FormModel>
			</Modal>}

			{showProposalBids && <Modal
				title="Bid Details"
				visible={showProposalBids}
				width="60rem"
				onCancel={closeModel}
				footer={null}>
				{proposalBids ? proposalBids.map((item: any) => {
					return <Card id={item} title="Bid Details" extra={<a href="#" onClick={() => viewBidshandler(item.body.id)} > Accept Bids</a>}>
						{item.body && item.body.proposalAnswers ? Object.keys(item.body.proposalAnswers[0]).map((key: any, value: any) => {
							return (<p id={item.body.id + value}>{key + ':' + item.body.proposalAnswers[0][key]}</p>)
						})

							: <p>No Requirement available</p>
						}
						{<p> bidsAmmount : {item.body.amount}    BidScore : {item.body.bidStats.bidScore} </p>}
					</Card>
				}) : null}
			</Modal>}
		</div>
	);
};

export default BuyerDashboard;


