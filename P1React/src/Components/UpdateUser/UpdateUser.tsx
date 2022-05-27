import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../UserStore";
import { updateUser } from "../../Slices/UserSlice";
import { IUser } from "../../Interfaces/IUser";
import { useNavigate } from "react-router-dom";
import './UpdateUser.scss';


export const UpdateUser: React.FC =() => {

   
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const userInfo = useSelector((state:RootState)=> state.user);
    const navigator = useNavigate();
    const dispatch:AppDispatch = useDispatch();

    const handleChangeFirst = (event:React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }
    const handleChangeLast = (event:React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }
    const handleChangeEmail = (event:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
   
    
    

    const handleUpdateUser = () => {
       
        if (userInfo.currentProfile){
            let user:IUser ={
                userId: userInfo?.currentProfile?.userId,
                userName: userInfo.currentProfile?.userName,
                password: userInfo.currentProfile.password,
                firstName,
                lastName,
                email,
                userRole: userInfo.currentProfile?.userRole

            }
            dispatch(updateUser(user));
            
        }
    }

    useEffect(()=>{
        console.log(firstName,lastName,email);
    },[firstName,lastName,email]);


    return (
    <div className="update-user">
        <h3>Update User Below</h3>
        <div className="first-name-container">
            <p>First Name: </p>
            <input className="first-name-input" type="text" placeholder={userInfo.currentProfile?.firstName} onChange={handleChangeFirst}/>
        </div>
        <div className="last-name-container">
            <p>last Name: </p>
            <input className="last-name-input" type="text" placeholder={userInfo.currentProfile?.lastName} onChange={handleChangeLast}/>
        </div>
        <div className="email-container">
            <p>Email: </p>
            <input className="email-input" type="text" placeholder={userInfo.currentProfile?.email} onChange={handleChangeEmail}/>
        </div>
        <button className="update-btn" onClick={handleUpdateUser}>Update!</button>
    </div>
    )
}