import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState,AppDispatch } from "../../UserStore";
import { getUserDetails, getUserDetailsbyUsername } from "../../Slices/UserSlice";
import { Reimbursement } from "../../Components/Reimbursements/Reimbursements";
import { IReimbursement } from "../../Interfaces/IReimbursement";
import { UpdateUser } from "../../Components/UpdateUser/UpdateUser";
import { Navbar } from "../../Components/Navbar/Navbar";
import './ProfilePage.css';

export const ProfilePage:React.FC =() => {

    const userInfo = useSelector((state:RootState)=>state.user);
    const dispatch:AppDispatch = useDispatch();

    const username = userInfo.currentProfile?.userName;

    useEffect(()=>{
        console.log("get info about current user: ", userInfo.currentProfile?.userName);
        /*
        if(userInfo.currentProfile){
            dispatch(getUserDetailsbyUsername(userInfo.currentProfile.userName));
        }
        */
    }, [userInfo]);

     const isManager = () =>{
        if (userInfo.currentProfile?.userRole == 2){
            return true;
        } else {
            return false;
        }
    }

    return(
    
        <div>
            <Navbar/>
            <div className="profile-container">
            <h2>Profile of:  {userInfo.currentProfile?.firstName} {userInfo.currentProfile?.lastName}</h2>
            <h2>User ID: {userInfo.currentProfile?.userId}</h2>
            <h2>Email: {userInfo.currentProfile?.email}</h2>
            <span>User Role: </span>{isManager() ? <span>Manager</span> : <span>Employee</span>}
            <hr />
            
            <UpdateUser/>
            </div>
        </div>)
}

/*
userId: number,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    userRole: number
*/