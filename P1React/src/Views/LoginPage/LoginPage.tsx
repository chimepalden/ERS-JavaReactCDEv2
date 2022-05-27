import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { RootState } from '../../UserStore';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../Components/LoginPage/LoginPage';
import './LoginPage.css';


export const LoginPage: React.FC = () => {

    const userInfo = useSelector((state:RootState)=> state.user);

    const navigator = useNavigate();

    useEffect(()=>{
        if(!userInfo.error && userInfo.currentProfile){
            navigator("/userhome");
    }}, [userInfo]);

    return(
        <div className="login-page">
            {userInfo.error ? <h2 className="login-error">Username or password incorrect</h2> : <></>}
            <Login />
        </div>
    )

}