import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface TAmodelFormProps {
  visible: boolean;
  onCreate: (values: Values, proposalData : any) => void;
  onCancel: () => void;
  proposalData : unknown
}

export const TurnAroundModelForm: React.FC<TAmodelFormProps> = ({
  visible,
  onCreate,
  onCancel,
  proposalData
}) => {
  const [form] = Form.useForm();
  console.log("visible", visible);
  
  return (
    <Modal
      visible={visible}
      title="Publish Your Proposal"
      okText="Publish"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values, proposalData);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="turnArroundTime"
          label="Enter turnaround time for bid"
          rules={[{ required: true, message: 'Please Enter turnaround time for bid!' }]}
        >
          <Input  type="number" placeholder= "e.g 24hr, 48 hr"/>
        </Form.Item>
        <Form.Item name="ProposalDescription" label="Description">
          <Input type="textarea" placeholder="optional"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};


