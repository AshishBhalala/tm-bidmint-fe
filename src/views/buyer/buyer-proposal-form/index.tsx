import React from 'react';
import { Card } from 'antd';
import { FormModel } from 'components/proposal-form';
import './index.css';

export class ProposalForm extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
          hovering: false
        };
      }

    formSubmit = (formdata: any) =>{
        console.log("values coming in buyer", formdata);
        
    }
    render(){

	return (
		<div id="insurerProgress">
			<Card title="Create Proposal Form">
				<FormModel formSubmit = {this.formSubmit}></FormModel>
			</Card>
		</div>
    );
    }
}

export default { ProposalForm };
