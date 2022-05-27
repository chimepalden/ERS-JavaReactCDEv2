import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../UserStore";
import { registerReimbursement } from "../../Slices/ReimbursementSlice";
import { IReimbursement } from "../../Interfaces/IReimbursement";
import { useNavigate } from "react-router-dom";
import './RegisterReimbursement.scss'

export const RegisterReimbursement:React.FC = () => {

    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [reimbursementType, setReimbursementType] = useState<number>(1);
    const navigator = useNavigate();
    const userInfo = useSelector((state:RootState)=>state.user);
    const dispatch:AppDispatch = useDispatch();

    const handleChangeAmount = (event:React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.target.value));
    }
    const handleChangeDescription = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }
    const handleChangeType = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setReimbursementType(parseInt(event.target.value));
    }

    const handleReimbursement =  () => {
                
        if(userInfo){
            let reimbursement:IReimbursement = {
                amount,
                description,
                //reimbursementAuthor: 1,
                reimbursementAuthor: userInfo.currentProfile?.userId,
                reimbursementType
            }
            dispatch(registerReimbursement(reimbursement));
            
        }
        window.location.reload;
    }
    useEffect(()=>{
        console.log(amount, description, reimbursementType);
    },[amount, description, reimbursementType]);

    return(
        <div className="create-reimbursement">
            <div className="create-header">
                <h1>Enter your Expense Below!</h1>
            </div>
            <div className="create-body">
            <div className="amount-container">
                <span className="amount-text">Amount:</span>
                <input className="amount" placeholder="amount" type="number" onChange={handleChangeAmount}></input>
            </div>
            <div className="description-container">
                <span>Description: </span>
                <textarea className="content" onChange={handleChangeDescription} placeholder="Describe your Reimbursement" maxLength={256}></textarea>
            </div>
            <div className="type-container">
                <span>Select Type: </span>
                <select className="select-type" onChange={handleChangeType}>
                    <option value="1">Lodging</option>
                    <option value="2">Travel</option>
                    <option value="3">Food</option>
                    <option value="4">Other</option>
                </select>
            </div>
            </div>
            
            <button className="create-btn" onClick={handleReimbursement}>Send New Reimbursement for Approval</button>
    </div>
    )
}

