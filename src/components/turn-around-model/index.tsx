import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface TAmodelFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const TurnAroundModelForm: React.FC<TAmodelFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
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
            onCreate(values);
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



export const TurnAroundPage = (props : any) => {
  const [visible, setVisible] = useState(false);

  let {
    saveProposal,
    proposalQueAndAnsData,
    proposalform
     } = props;

  const onPublishProposal = (values: any) => {
    proposalQueAndAnsData['turnAroundTime']= values.turnArroundTime;
    console.log("publsih proposal data",proposalQueAndAnsData );
    setVisible(false);
    saveProposal('saveAndPublish', proposalQueAndAnsData);
  };

  
  return (
    <div>
      <Button
        type="primary"
        onClick={ () => {
          proposalform
          .validateFields()
          .then((values: any) => {
            proposalform.resetFields();
            setVisible(true);
          })
        }}
      >
        Save And Publish
      </Button>
      <TurnAroundModelForm
        visible={visible}
        onCreate={onPublishProposal}
        onCancel={() => {
        setVisible(false);
        }}
      />
    </div>
  );
};


export default TurnAroundPage;