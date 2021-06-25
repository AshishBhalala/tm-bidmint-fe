import React from 'react';
import { Form, Input, Button, Checkbox, Radio, Select } from 'antd';
import './index.css';
import { ColorPropType } from 'react-native';

export const FormModel = (props: any) => {
	const { Option } = Select;

  let {
    fromSumbit,
  } = props;
	const onFinish = (values: any) => {
    console.log('success:', values );
		props.formSubmit(values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Form
			name="proposalForm"
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item
				label="Number of employees"
				name="companyName"
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
					<Option value="35"> 19-35</Option>
					<Option value="45">35-45</Option>
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
					<Radio value={1}> 1 Lac</Radio>
					<Radio value={2}> 2 Lac</Radio>
					<Radio value={3}> 3 Lac</Radio>
					<Radio value={4}> 4 Lac</Radio>
					<Radio value={5}> 5 Lac</Radio>
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
					<Radio value={1}>Employee only</Radio>
					<Radio value={2}>Employee, spouse and 2 children</Radio>
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
				<Button type="primary" htmlType="submit">
					Save and Publish
				</Button>
				<Button
					type="primary"
					style={{ margin: '0 8px' }}
					htmlType="submit"
				>
					Save
				</Button>
			</Form.Item>
		</Form>
	);
};
