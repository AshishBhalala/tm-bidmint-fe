import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Radio, Select } from 'antd';
import './index.css';
import { TurnAroundModelForm } from 'components/turn-around-model';


export const FormModel = (props: any) => {
	const { Option } = Select;
	const [form] = Form.useForm();

	let {
		save,
		publish,
		type,
		buyerData
	} = props;


	const [proposalData, setProposalData] = useState(null);
	const [visible, setVisible] = useState(false);

	const onProposalModules = (values: any, proposalData : any) => {
		proposalData['turnAroundTime'] = values.turnArroundTime;
		console.log("publsih proposal data", proposalData);
		setVisible(false);
		save(proposalData, 'saveAndPublish');
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const saveProposalFn = (saveType: string) => {
		form
          .validateFields()
          .then(values => {
			console.log("save proposal data", proposalData);
			save(proposalData, saveType);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
	};

	const saveAndPublishProposalFn = (saveType: string) => {
		form
          .validateFields()
          .then(values => {
			if (type == 'buyer') {
				setVisible(true);
			} else {
				save(proposalData, saveType);
			}
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });

	};


	const onValuesChange = (changedValues: any, allValues: any) => {
		console.log("Proposal Form value ", changedValues, allValues);
		setProposalData(allValues)
	}


	return (
		<div>
		<Form
			form={form}
			name="proposalForm"
			initialValues={buyerData}
			onFinish={() => { form.resetFields() }}
			onFinishFailed={onFinishFailed}
			onValuesChange={onValuesChange}
		>
			<Form.Item
				label="Number of employees"
				name="numberOfEmployees"
				rules={[{ required: true, message: 'Min 7. Emp required' }]}
			>
				<Input placeholder="Enter number fo employees" type="number" disabled={type === 'seller'} />
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
					disabled={type === 'seller'}
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
				<Radio.Group disabled={type === 'seller'}>
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
				<Radio.Group disabled={type === 'seller'}>
					<Radio value="Employee_only">Employee only</Radio>
					<Radio value="Employee_family">Employee, spouse and 2 children</Radio>
				</Radio.Group>
			</Form.Item>

			<Form.Item
				name="newBusiness"
				valuePropName="checked"
				wrapperCol={{ offset: 8, span: 16 }}
			>
				<Checkbox disabled={type === 'seller'} >Buying for first time</Checkbox>
			</Form.Item>

			<Form.Item
				name="rollover"
				valuePropName="checked"
				wrapperCol={{ offset: 8, span: 16 }}
			>
				<Checkbox disabled={type === 'seller'} >Existing policy is expiring </Checkbox>
			</Form.Item>

			<Form.Item
				label="Enter Bid Amount For This Proposal"
				name="BidAmount"
				rules={[{ required: type == 'seller', message: 'Enter Bid Amount' }]}
				hidden={type === 'buyer'}
			>
				<Input disabled={type === 'buyer'} placeholder="Enter Bid Amount" type="number" />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>

				<Button
					type="primary"
					style={{ margin: '0 8px' }}
					htmlType="submit"
					onClick={() => saveProposalFn('save')}
				>
					{type == 'buyer' ? 'Save' : 'Save Proposal'}
				</Button>

				<Button
					type="primary"
					style={{ margin: '0 8px' }}
					htmlType="submit"
					onClick={() => saveAndPublishProposalFn('saveAndPublish')}
				>
					{type == 'buyer' ? 'Save And Publish' : 'Send Bid'}
				</Button>

				{visible ? <TurnAroundModelForm 
					visible={visible}
					onCreate={onProposalModules}
					onCancel={() => {
						setVisible(false);
					}}
					proposalData = {proposalData}
					></TurnAroundModelForm> : null}

			</Form.Item>
		</Form>
		</div>
	);
};
