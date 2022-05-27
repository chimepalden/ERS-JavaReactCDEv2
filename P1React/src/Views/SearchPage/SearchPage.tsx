import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../UserStore";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Components/Loading/Loading";
import { Reimbursement } from "../../Components/Reimbursements/Reimbursements";
import { IReimbursement } from "../../Interfaces/IReimbursement";
import { IUser } from "../../Interfaces/IUser";
import { User } from "../../Components/User/User";
import { Navbar } from "../../Components/Navbar/Navbar";
import { Search } from "../../Components/Search/Search";
import { clearReimbursements } from "../../Slices/ReimbursementSlice";
import './SearchPage.css';

export const SearchPage:React.FC = () => {
    
    const userInfo = useSelector((state:RootState) => state.user);
    const reimbursementsInfo = useSelector((state:RootState) => state.reimbursements);
    const navigator = useNavigate();
    const dispatch:AppDispatch = useDispatch();

    const changeActive = () => {
      
            if(userInfo.users){
                return true;
            } else if(reimbursementsInfo.reimbursements) {
                return false;
            }
        
    }

    useEffect(()=>{
        clearReimbursements();
        console.log(userInfo.users);
        console.log(reimbursementsInfo.reimbursements);
        changeActive();
    },[userInfo.users,reimbursementsInfo.reimbursements])

    return (
        <div>
            <Navbar/>
            <Search/>
                <h1>Reimbursements</h1>
                <div className="reimbursement-list">
                {reimbursementsInfo.reimbursements ? reimbursementsInfo.reimbursements
                .map((reimbursement:IReimbursement) =>{
                    return <Reimbursement {...reimbursement} key={reimbursement.reimbursementId} />     
                }):
                <Loading/>
                }
                </div>
                <hr />
                <br />
                <h1>All Employees</h1>
                <div className="user-list">
                {userInfo.users ? userInfo.users
                .map((user:IUser) =>{
                    return <User {...user} key={user.userId} />     
                }):
                <></>
                }
                </div>
            

        </div>
    )
}