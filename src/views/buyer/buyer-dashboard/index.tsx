import React, {useState} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card , Modal} from 'antd';
import { FormModel } from 'components/proposal-form';

interface BuyerDashboardProps {
	someProp: string;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = () => {
	const [showProposalDetail, setShowProposalDetail] = useState<boolean>(false);

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
