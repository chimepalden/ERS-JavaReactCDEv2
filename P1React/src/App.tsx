import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './Views/LoginPage/LoginPage';
import { ProfilePage } from './Views/ProfilePage/ProfilePage';
import { ReimbursementPage } from './Views/ReimbursementPage/ReimbursementPage';
import { HomePage } from './Views/HomePage/HomePage';
import { SearchPage } from './Views/SearchPage/SearchPage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/userhome" element={<HomePage/>} />
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path='/reimbursements' element={<ReimbursementPage/>} />
        <Route path='/search' element={<SearchPage/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
