import React, { useEffect, useState, useRef } from 'react';
import { Card, message } from 'antd';
import { FormModel } from 'components/proposal-form';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'constant/action'
import { propsToJS } from '__utils/immutable-to-js';
import saveProposalSelector from './proposalForm.selector';
import { useDeepCompare } from "hooks/use-deep-memo";


export const ProposalForm = () => {

  const [state, setState] = useState({});
  const componentWillUnmount = useRef(false)
  const dispatch = useDispatch();
  const { saveProposalResponseData, saveproposalResponseError } = propsToJS(useSelector(saveProposalSelector));
	const [proposalSaveType, setProposalSaveType] = useState<any>(null);

  useEffect(() => { 
    if(saveProposalResponseData){
      console.log("save type", proposalSaveType);
      
        if(proposalSaveType === 'save'){
          message.success("Proposal saved successfully")
        } else {
          console.log("proposal Id ", saveProposalResponseData.meta.proposalId);
          dispatch({type : Actions.PUBLISH_PROPOSAL_API, payload : saveProposalResponseData.meta.proposalId})
        }
        setProposalSaveType(null);
    }
  }, [useDeepCompare(saveProposalResponseData)]);


  const saveProposal = (formdata: any, saveType : string) => {
    let proposalQuestions: any[] = [];
    let name: string = "vaishnavi";
    let buyerId: string = ""

    Object.keys(formdata).map((key, value) => {
      let questionobject: any = {};
      questionobject[key] = formdata[key];
      proposalQuestions.push(questionobject)
    })

    setProposalSaveType(saveType);
    dispatch({ type: Actions.SAVE_PROPOSAL_FORM_API, payload: { "name": name, "proposalQuestions": proposalQuestions, "buyerId": buyerId } })
    
    
  }

  return (
    <div id="insurerProgress">
      <Card title="Create Proposal Form">
        <FormModel saveProposal={saveProposal}></FormModel>
      </Card>
    </div>
  );

}

export default { ProposalForm };
