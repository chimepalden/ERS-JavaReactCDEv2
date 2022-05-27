import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../UserStore';

import { IReimbursement } from '../../Interfaces/IReimbursement';
import { approveReimbursementById, denyReimbursementById} from "../../Slices/ReimbursementSlice";
import './Reimbursement.css';
//import defaultImage from "../../deafultpic.jpg";

export const Reimbursement:React.FC<IReimbursement> = (reimbursement:IReimbursement) => {

    const dispatch:AppDispatch = useDispatch();
    const userInfo = useSelector((state:RootState) => state.user);
   /* 
   const reimbursementInfo = useSelector((state:RootState) => state.reimbursements);
    const [reimbursementStatus, setReimbursementStatus] = useState<number>(0); 
    */

    const isManager = () => {
        if(userInfo.currentProfile?.userRole == 2){
            return true;
        } else return false;
    }
/*
    const isPending = () => {
        if(reimbursementInfo.reimbursement?.reimbursementStatus == 1 &&isManager()){
            return true;
        } else return false;
    }
*/
    const handleResolve = (event:React.MouseEvent<HTMLButtonElement>) => {
        let actionValue = parseInt((event.target as HTMLButtonElement).value);
        let reimbId = event.currentTarget?.getAttribute("data-id");
        if(actionValue == 2){
            if(reimbId){
                dispatch(approveReimbursementById(reimbId));
            }
        } else if(actionValue == 3){
            if(reimbId) {
                dispatch(denyReimbursementById(reimbId));
            }
        } 
    }

    return(
        <div className="reimbursement">
            <div className='reimbursement-id'>
                <span>Reimbursement Id: </span>
                <span className='reimbursement-number'>{reimbursement.reimbursementId} | </span>
            </div>
            <div className='reimbursement-amount'>
               <span>| Total: </span>
                <span className='reimbursement-total'>{reimbursement.amount} | </span>
            </div>
            <div className='reimbursement-submit-date'>
                <span>| Submitted Date: </span>
                
                <span className='reimb-submit-date'>{reimbursement.dateSubmitted?.toString()} | </span>
            </div>
            <div className='reimbursement-resolved-date'>
                <span>| Resolved Date: </span>
                <span className='reimb-resolved-date'>{reimbursement.dateResolved?.toString()} | </span>
            </div>
            <div className='reimbursement-description'>
                <span>| Description: </span>
                <span className='reimbursement-desc'>{reimbursement.description} | </span>
            </div>
            <div className="reimbursement-author">
                <span>| Author Id: </span>
                <span className="reimbursement-auth">{reimbursement.reimbursementAuthor} | </span>
            </div>
            <div className='reimbursement-resolver'>
                <span>| Resolver Id: </span>
                <span className='reimbursement-res'>{reimbursement.reimbursementResolver} | </span>
            </div>
            <div className='reimbursement-type'>
                <span>| Type: </span>
                <span className='reimb-type'>{reimbursement.reimbursementType} | </span>
            </div>
            <div className='reimbursement-status'>
                <span>| Status: </span>
                <span className='reimb-status'>{reimbursement.reimbursementStatus} | </span>
            </div>
            <div className="actions">
            { isManager()?
                <div>
                    <button className="approve-btn" value="2" data-id = {reimbursement.reimbursementId} 
                        onClick={handleResolve}>Approve</button>
                    <button className="deny-btn" value="3" data-id={reimbursement.reimbursementId} onClick={handleResolve}>Deny</button>
                </div> 
                    : <></>
            }
           </div>
        </div>
    )

}