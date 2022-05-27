import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUsers, logout } from "../../Slices/UserSlice";
import { AppDispatch } from "../../UserStore";
import { clearReimbursements } from "../../Slices/ReimbursementSlice";
//import image for navbar
import './Navbar.css';
import { RootState } from "../../UserStore";

export const Navbar: React.FC = () => {
    const navigator = useNavigate();
    const dispatch:AppDispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearReimbursements());
        dispatch(clearUsers());
        navigator('/login');
    }

    const isManager = () =>{
        if (userInfo.currentProfile?.userRole == 2){
            return true;
        } else {
            return false;
        }
    }
    const userInfo = useSelector((state:RootState) => state.user);

    return(
        <nav className="navbar">
            <img className="profile-pic" src="" />
           {!isManager()?  <ul className='nav-menu'>
                <li className="nav-item">
                    <Link to={"/userhome"} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/reimbursements"} className="nav-link">Reimbursements</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/profile'} className="nav-link">Profile</Link>
                </li>
                <li className="logout">
                    <Link to={"/login"} className="nav-link">
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </Link>
                </li>
            </ul> :  <ul className='nav-menu'>
                <li className="nav-item">
                    <Link to={"/userhome"} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/userHome"} className="nav-link">Reimbursements</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/profile'} className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/search'} className="nav-link">Search</Link>
                </li>
                <li className="logout">
                    <Link to={"/login"} className="nav-link">
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </Link>
                </li>
            </ul>}
            </nav>
    )




}