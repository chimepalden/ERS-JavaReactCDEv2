import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../UserStore";
import { useNavigate } from "react-router-dom";
import { approveReimbursementById, getPendingReimbursements, getReimbursments, getReimbursmentsForManager, getRequestsByStatus, getResolvedReimbursements } from "../../Slices/ReimbursementSlice";
import { Loading } from "../../Components/Loading/Loading";
import { Reimbursement } from "../../Components/Reimbursements/Reimbursements";
import { IReimbursement } from "../../Interfaces/IReimbursement";
import { Navbar } from "../../Components/Navbar/Navbar";
import './ReimbursementPage.scss';

export const ReimbursementPage:React.FC = () => {

    const userInfo = useSelector((state:RootState) => state.user);
    const reimbursementsInfo = useSelector((state:RootState) => state.reimbursements);
   // const reimbursementInfo = useSelector((state:RootState) => state.reimbursements.reimbursement);
    const navigator = useNavigate();
    const dispatch:AppDispatch = useDispatch();


    const [reimbursementAuthor, setReimbursementAuthor] = useState<number>(1);
    const [reimbursementStatus, setReimbursementStatus] = useState<number>(1);

    useEffect(()=>{
        if(!userInfo.currentProfile){
            navigator('/login');
        } else if(userInfo.currentProfile && !reimbursementsInfo.reimbursements) {
            if(userInfo.currentProfile.userRole == 1){
                setReimbursementAuthor(userInfo.currentProfile.userId);
                dispatch(getReimbursments(userInfo.currentProfile.userId));
            }else if(userInfo.currentProfile.userRole == 2){
                dispatch(getReimbursmentsForManager())
            }               
        }
        console.log("UserState: ", userInfo, "Reimbursements: ", reimbursementsInfo);

    },[userInfo, reimbursementsInfo.reimbursements]);

    const isManager = () => {
        if(userInfo.currentProfile?.userRole == 2){
            return true;
        } else return false;
    }

    const handleStatusChangeType = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setReimbursementStatus(parseInt(event.target.value));
    }

    const handleGetReimbursements = () =>{
        if(!isManager()){
            dispatch(getRequestsByStatus({reimbursementAuthor, reimbursementStatus}));
        }else if(!isManager() && reimbursementStatus == 4 && userInfo.currentProfile){
            dispatch(getReimbursments(userInfo.currentProfile.userId));
        }
        if(isManager() && reimbursementStatus == 1){
            dispatch(getPendingReimbursements());
        }else if(isManager() && reimbursementStatus == 2){
            dispatch(getResolvedReimbursements());
        }else if(isManager() && reimbursementStatus == 3){
            dispatch(getReimbursmentsForManager());
        }
    }

    return (
        <div className="reimbursement-page">
            <div className="header">
                <Navbar/>
            </div>
                <div className="select-container">
                { isManager()? 
                    <select className="select-type" onChange={handleStatusChangeType}>
                        <option value="1">Pending</option>
                        <option value="2">Resolved</option>
                        <option value="3" >All</option>
                    </select> :
                    <select className="select-type" onChange={handleStatusChangeType}>
                        <option value="1">Pending</option>
                        <option value="2">Approved</option>
                        <option value="3">Denied</option>
                        <option value="4" >All</option>
                    </select>
                }   
                <button className='select-btn' onClick={handleGetReimbursements}>Get Reimbursements</button>               
                </div>
            
            <div className="reimbursement-list">
            {reimbursementsInfo.reimbursements ? reimbursementsInfo.reimbursements
            .map((reimbursement:IReimbursement) =>{
                return <Reimbursement {...reimbursement} key={reimbursement.reimbursementId} />
                           
            }):
            <Loading/>
            }
            </div>
        </div>
    )



}