import React, {useState} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card , Modal} from 'antd';
import { FormModel } from 'components/proposal-form';


interface SellerDashboardProps {
	someProp: string;
}

const SellerDashboard: React.FC<SellerDashboardProps> = () => {
	const [showProposalDetail, setShowProposalDetail] = useState<boolean>(false);

	const bidNowhandler = () => {
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
			<Card style={{marginTop: 16 }} title="Card title" extra={<a href="#" onClick={bidNowhandler} >Bid Now</a>}>
          Content
        </Card>
			<Card style={{marginTop: 16 }} title="Card title" extra={<a href="#" onClick={bidNowhandler} >Bid Now</a>}>
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

export default SellerDashboard;
