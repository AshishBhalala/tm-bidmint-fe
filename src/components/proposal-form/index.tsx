import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Radio, Select } from 'antd';
import './index.css';
import TurnAroundPage from 'components/turn-around-model';


export const FormModel = (props: any) => {
  const { Option } = Select;
  const [form] = Form.useForm();

   let {
	 saveProposal,
    } = props;

	const [proposalData, setProposalData] = useState(null);
	
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const saveProposalFn = (saveType: string) => {	
		console.log("save proposal data",proposalData );	
		saveProposal(proposalData, saveType);
	};
	
	const saveAndPublishProposalFn = (saveType: string, proposalData: any) => {		
		console.log("publsih proposal data",proposalData );
		saveProposal(proposalData, saveType);
	};


	const onValuesChange = (changedValues: any, allValues: any) =>{
		console.log("Proposal Form value ", changedValues, allValues);
		setProposalData(allValues)
	}

	return (
		<Form
			form ={form}
			name="proposalForm"
			initialValues={{ remember: true }}
			onFinish = {() => form.resetFields()}
			onFinishFailed={onFinishFailed}
			onValuesChange= {onValuesChange}
		>
			<Form.Item
				label="Number of employees"
				name="numberOfEmployees"
				rules={[{ required: true, message: 'Min 7. Emp required' }]}
			>
				<Input placeholder="Enter number fo employees" type="number" />
			</Form.Item>

			<Form.Item
				label="Avg. Age of Employees"
				name="ageOfEmployee"
				rules={[
					{
						required: true,
						message: 'Please input Avg. Age of Employees!'
					}
				]}
			>
				<Select
					placeholder="Select a option and change input text above"
					allowClear
				>
					<Option value="19_35"> 19-35</Option>
					<Option value="35_45">35-45</Option>
				</Select>
			</Form.Item>

			<Form.Item
				label="Sum insured amount"
				name="sumInsuredAmount"
				rules={[
					{
						required: true,
						message: 'Please input Sum insured amount '
					}
				]}
			>
				<Radio.Group>
					<Radio value={100000}> 1 Lac</Radio>
					<Radio value={200000}> 2 Lac</Radio>
					<Radio value={300000}> 3 Lac</Radio>
					<Radio value={400000}> 4 Lac</Radio>
					<Radio value={500000}> 5 Lac</Radio>
				</Radio.Group>
			</Form.Item>

			<Form.Item
				label="Coverage Type"
				name="coverageType"
				rules={[
					{
						required: true,
						message: 'Please input Sum insured amount '
					}
				]}
			>
				<Radio.Group>
					<Radio value="Employee_only">Employee only</Radio>
					<Radio value="Employee_family">Employee, spouse and 2 children</Radio>
				</Radio.Group>
			</Form.Item>

			<Form.Item
				name="newBusiness"
				valuePropName="checked"
				wrapperCol={{ offset: 8, span: 16 }}
			>
				<Checkbox>Buying for first time</Checkbox>
			</Form.Item>

			<Form.Item
				name="rollover"
				valuePropName="checked"
				wrapperCol={{ offset: 8, span: 16 }}
			>
				<Checkbox>Existing policy is expiring </Checkbox>
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>

			   <Button
					type="primary"
					style={{ margin: '0 8px' }}
					htmlType="submit"
					onClick= {() => saveProposalFn('save')}
				>
					Save
				</Button>

				<TurnAroundPage proposalform= {form} proposalQueAndAnsData = {proposalData} saveProposal = {saveAndPublishProposalFn} ></TurnAroundPage>

			</Form.Item>
		</Form>
	);
};
