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

  const dispatch = useDispatch();
  const { saveProposalResponseData, saveproposalResponseError ,
    publishProposalResponseData, publishProposalResponseError
  } = propsToJS(useSelector(saveProposalSelector));
  const [proposalSaveType, setProposalSaveType] = useState<any>(null);
  const [proposalTurnAroundT, setproposalTurnAroundT] = useState<any>(null);


  useEffect(() => {
    return () => {
      dispatch({ type: Actions.RESET_PUBLISH_PROPOSAL_API_DATA });
      dispatch({ type: Actions.RESET_SAVE_PROPOSAL_API_DATA });

    };
  }, []);

  useEffect(() => { 
    if(saveProposalResponseData){
      
        if(proposalSaveType === 'save'){
          message.success("Proposal saved successfully")
        } else {          
          let publishProposalrequest :any = {};
          publishProposalrequest['proposalId']= saveProposalResponseData.meta.proposalId;
          publishProposalrequest['turnAroundTime'] = proposalTurnAroundT;
          console.log("publish proposal request", publishProposalrequest);

          dispatch({ type: Actions.RESET_PUBLISH_PROPOSAL_API_DATA });
          dispatch({type : Actions.PUBLISH_PROPOSAL_API, payload : publishProposalrequest})
        }
        setProposalSaveType(null);
        setproposalTurnAroundT(null);
    }
  }, [useDeepCompare(saveProposalResponseData)]);

  useEffect(() => { 
    if(publishProposalResponseData){
      message.success(publishProposalResponseData.message)
    }
  }, [useDeepCompare(publishProposalResponseData)]);


  const saveProposal = (formdata: any, saveType : string) => {
    let proposalQuestions: any[] = [];
    let name: string = "vaishnavi";
    let buyerId : string | null=	window.sessionStorage.getItem('buyerId');


    proposalQuestions.push(formdata);
    console.log("turn around time ", formdata['turnAroundTime']);
    
    setProposalSaveType(saveType);
    setproposalTurnAroundT(formdata['turnAroundTime']);

    dispatch({ type: Actions.RESET_SAVE_PROPOSAL_API_DATA });
    dispatch({ type: Actions.SAVE_PROPOSAL_FORM_API, payload: { "name": name, "proposalQuestions": proposalQuestions, "buyerId": buyerId } })
    
    
  }

  
  return (
    <div id="insurerProgress">
      <Card title="Create Proposal Form">
        <FormModel save={saveProposal} publish = {saveProposal} type ="buyer" ></FormModel>
      </Card>
    </div>
  );

}

export default { ProposalForm };
