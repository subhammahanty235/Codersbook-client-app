
import './App.css';
import React , {useState} from 'react';
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


function App() {
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
            
          </Routes>
        </BrowserRouter>

      </Togglepagestate>
      {/* <Uploadimg/>
         <Profile/> */}
    </>

  ); 
}

export default App;
