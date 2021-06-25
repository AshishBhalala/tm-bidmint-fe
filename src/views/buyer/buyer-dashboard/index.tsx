import React,{ useEffect, useRef, useState } from 'react';
import { Card } from 'antd';
import { size } from 'lodash';
import 'bootstrap/dist/css/bootstrap.css'
import { useDispatch, useSelector } from "react-redux";
import {GET_BUYER_PROPOSAL_RECORDS} from 'views/constants/actions'
// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface BuyerProposalCard{

    budgeted: number,
    spent: number,
    category: string,
}
interface BuyerDashboardProps {
	someProp: BuyerProposalCard[];
}

const dispatch = useDispatch(); 

    const BuyerDashboard: React.FC<BuyerDashboardProps> = ({someProp}: BuyerDashboardProps) => { 
        useEffect(() => {
            return () => {
                dispatch({ type:  GET_BUYER_PROPOSAL_RECORDS});
            }
        }, [dispatch]);
        
        
        
    
        return <div className="container-fluid">
                        {someProp.map(item => {
                            return <BuyerDashboardCardItem category= {item.category}
                            budgeted = {item.budgeted}
                            spent = {item.spent}
                             >
                            </BuyerDashboardCardItem>
                        })}
           
      </div>
    };

    export const BuyerDashboardCardItem: React.FC<BuyerProposalCard> =({budgeted, spent, category} : BuyerProposalCard) =>{
        return <div className= "row d-flex">
            <Card >
            <p>{category}</p>
        <p>{budgeted}</p> 
          <p>{spent}</p>
            </Card>
           
        </div>
        

    }

export default BuyerDashboard;
