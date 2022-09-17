import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Dashboard, Schedule, User, CreateSchedule, CreateUser, EditUser, EditSchedule, RegisterAdmin } from "../Components";

const Routing = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/halaman-utama' element={<Dashboard/>}/>
                <Route path='/jadwal-pembelajaran' element={<Schedule/>}/>
                <Route path='/pengguna' element={<User/>}/>
                <Route path='/tambah-jadwal' element={<CreateSchedule/>}/>
                <Route path='/edit-jadwal/:id' element={<EditSchedule/>}/>
                <Route path='/tambah-pengguna' element={<CreateUser/>}/>
                <Route path='/edit-pengguna/:id' element={<EditUser/>}/>
                <Route path='/register' element={<RegisterAdmin/>}/>
            </Routes>
        </Router>
    </div>
  )
}

export default Routing
