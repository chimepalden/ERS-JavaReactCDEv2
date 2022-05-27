import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../UserStore';
import { useNavigate } from 'react-router-dom';
import { getUserDetailsbyUsername, getAllUsers } from "../../Slices/UserSlice";
import { getReimbursmentsById } from "../../Slices/ReimbursementSlice";
import './Search.scss';


export const Search:React.FC =()=> {

    const userInfo = useSelector((state:RootState)=>state.user);
    const requestState = useSelector((state:RootState)=> state.reimbursements);
    const navigator = useNavigate();
    const dispatch:AppDispatch = useDispatch();
    const [username, setUsername] = useState<string>("");
    const [employeeId, setEmployeeId] = useState<number>(0);

    const handleChangeUsername = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }
    const handleChangeId = (event:React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeId(parseInt(event.target.value));
    }

    const isManager = () =>{
        if (userInfo.currentProfile?.userRole == 2){
            return true;
        } else {
            return false;
        }
    }
    const handleSearchUser = () => {

        if(isManager()) {
            dispatch(getUserDetailsbyUsername(username));
        }
    }

    const handleSearchReimbursements = () => {
       
        if(isManager()) {
            dispatch(getReimbursmentsById(employeeId));
        }
    }

    const handleGetAllUsers = () => {
        if(isManager()){
            dispatch(getAllUsers())
        }
    }


    return (
        <>
        
        <div className="search-container">

            <div className="reimbursement-search-container">
                <span>Search By Employee Id: </span>
                <input type="number" className="reimbursements-search-input" placeholder="Employee Id" onChange={handleChangeId} />
                <button className="reimbursement-search-btn" onClick={handleSearchReimbursements}>Search!</button>
            </div>
            
            


            <div className="user-search-container">
                <span>Get All Users: </span>
            
                <button className="all-user-btn" onClick={handleGetAllUsers}>Gotta Catch 'Em All!</button>
            </div>

        </div>

        </>
    )


}



/*
<div className="user-search-container">
            <span>Search By Username: </span>
            <input type="text" className="user-search-input" placeholder="Username" onChange={handleChangeUsername} />
            <button className="user-search-btn" onClick={handleSearchUser}>Search!</button>
        </div>
 */








    
