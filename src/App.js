
import './App.css';
import React , {useEffect, useState} from 'react';
import Login from './pages/authentication/login/Login';
import Signup from './pages/authentication/signup/Signup';
import Home from './pages/mainapp/home/Home';
import Navbar from './pages/mainapp/navbar/Navbar';
import Togglepagestate from './context/pagestoggle/Togglepagestate';
import {
  BrowserRouter, Routes,
  Route,
  
  // Link
} from "react-router-dom";
import Loading from './components/noposts/Loading';
import ProfileDem from './pages/mainapp/home/Profiles/ProfileDem';
import { io } from 'socket.io-client';

function App() {

  // useEffect(()=>{
  //   const socket = io()
  //   console.log(socket)
  // })
  // require('dotenv').config()
 
  // const navigate = useNavigate()

  return (
    <>
    {/* <MyForm/> */}
      <Togglepagestate>
        <BrowserRouter>

          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/profile' element={<ProfileDem />} />
            
          </Routes>
        </BrowserRouter>

      </Togglepagestate>
      {/* <Uploadimg/>
         <Profile/> */}
    </>

  ); 
}

export default App;
