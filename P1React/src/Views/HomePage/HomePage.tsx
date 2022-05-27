import React, { useEffect } from 'react';
import { useSelector} from 'react-redux';
import {  RootState } from '../../UserStore';
import { RegisterReimbursement } from '../../Components/RegisterReimbursement/RegisterReimbursement';
import axios from 'axios';
import { Navbar } from '../../Components/Navbar/Navbar';
import { ReimbursementPage } from '../ReimbursementPage/ReimbursementPage';
import './HomePage.css';


export const HomePage: React.FC = () => {

    // const userState = useSelector((state:RootState)=> state.user);
    const requestState = useSelector((state:RootState)=> state.reimbursements);
    const userInfo = useSelector((state:RootState) => state.user);
   
    useEffect(() => {
        if(requestState.error){
           console.log(requestState.error); 
        }
    },[requestState])

    const isManager = () =>{
        if (userInfo.currentProfile?.userRole == 2){
            return true;
        } else {
            return false;
        }
    }



    const handleLogout = async (event:React.MouseEvent<HTMLButtonElement>) =>{
       await axios.put("http://localhost:8000/users/logout");
    }
    return(
        <div className="user-homepage-container">
            
            {isManager()? 
            <div className='manager-homepage-body'>
                <ReimbursementPage/>

            </div>
            :
            
            <div className="user-homepage-body">
                <div className="nav-container">
                    <Navbar/>
                </div>
                {requestState.error ? <h2 className="request-registration-error">Request Registration Error</h2> : <></>}
                <RegisterReimbursement />
            </div>} 
        </div>
    )

}