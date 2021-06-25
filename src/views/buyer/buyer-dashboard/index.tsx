import React, {useState, useEffect} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card , Modal, message} from 'antd';
import { FormModel } from 'components/proposal-form';
import { useDispatch } from 'react-redux';
import * as Action from 'constant/action'
import BuyerDashBoardSelector from './buyerDashboard.selector';
import { propsToJS } from '__utils/immutable-to-js';
import { useDeepCompare } from 'hooks/use-deep-memo';

interface BuyerDashboardProps {
	someProp: string;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = () => {

	const dispatch = useDispatch();
	const [showProposalDetail, setShowProposalDetail] = useState<boolean>(false);
	const { allProposal,
		allProposalError,
	  } = propsToJS(BuyerDashBoardSelector);

	useEffect(() =>{
		let getProposalRequest = {
			type: "buyer",
			status : "DRAFT",
			id: "5a96c0684c27af02740a4c74"
		}
		dispatch({type: Action.GET_PROPOSAL, payload : getProposalRequest})
	}, [])

	useEffect(() => {
		if(allProposal) {
			setShowProposalDetail(allProposal);
			console.log("all proposal data",allProposal );			
		}
	}, [useDeepCompare(allProposal)])
	

	const viewProposalhandler = () => {
		setShowProposalDetail(true);
	}

	const formSubmit = (formdata: any) =>{
		console.log("values coming in buyer", formdata);	
  }

	const closeModel = () => {
		setShowProposalDetail(false);
	}
	return (
		<div>
			<Card style={{marginTop: 16 }} title="Card title" extra={<a href="#" onClick={viewProposalhandler} >View Proposal</a>}>
          Content
        </Card>
			<Card style={{marginTop: 16 }} title="Card title" extra={<a href="#" onClick={viewProposalhandler} >View Proposal</a>}>
          Content
      </Card>
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

export default BuyerDashboard;
