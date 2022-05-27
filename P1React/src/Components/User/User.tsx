import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../UserStore';

import { IUser } from '../../Interfaces/IUser';

import './User.css';
//import defaultImage from "../../deafultpic.jpg";

export const User:React.FC<IUser> = (user:IUser) => {

    const dispatch:AppDispatch = useDispatch();
    const userInfo = useSelector((state:RootState) => state.user);
   
    

  
/*
    const isPending = () => {
        if(userInfo.user?.userStatus == 1 &&isManager()){
            return true;
        } else return false;
    }
*/
    

    return(
        <div className="user-container">
            <div className='user-id'>
                <span>user Id: </span>
                <span className='user-id'>{user.userId} |</span>
            </div>
            <div className='user-username'>
               <span>| Username: </span>
                <span className='user-username'>{user.userName} |</span>
            </div>
            <div className='user-first-name'>
                <span>| First Name: </span>
                <span className='user-first-name'>{user.firstName} |</span>
            </div>
            <div className='user-last-name'>
                <span>| Last Name: </span>
                <span className='user-last-name'>{user.lastName} |</span>
            </div>
            <div className='user-email'>
                <span>| Email: </span>
                <span className='user-email'>{user.email} |</span>
            </div>
            <div className="user-role">
                <span>| User Role: </span>
                {user.userRole == 2 ?<span className="user-role">Manager |</span> : <span>Employee |</span>}
            </div>
        </div>
    )

}