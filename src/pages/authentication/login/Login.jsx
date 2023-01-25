import React, { useState } from 'react'
import './login.css'
import login_image from '../../../images/zorin_login.png'
import img1 from '../../../images/image1.png'
import img2 from '../../../images/image2.png'
import img3 from '../../../images/image3.gif'

import { useNavigate } from 'react-router-dom'
function Login() {
    const imagearray = [img1 , img2 , img3 ,img1];
    const navigate = useNavigate()
    const [credential, setcredential] = useState({ email: "", password: "" });
    // const baseurl = "http://localhost:5000/api"
    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }
    const login_func = async () => {
        // console.log(process.env.REACT_APP_API_KEY7)
        if (credential.email !== "" && credential.password !== "") {
            console.log(credential.email)
            try {
                const responce = await fetch(`${process.env.REACT_APP_API_KEY}auth/login`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: credential.email, password: credential.password })
                });

                const json = await responce.json();
                console.log(json.result)
                if(json.flag === true){
                    localStorage.setItem("sclmdia_73sub67_token", json.token)
                    localStorage.setItem("sclmdia_73sub67_details", JSON.stringify(json.result))
                    navigate('/')

                }
                else{
                    alert(json.message)
                }
            } catch (error) {
                console.log(error)
                alert("internal error occured")
            }
        }
        else {
            alert("please provide credentials")
        }
    }
    return (
        <div className='md'>
            <div className="main">

                <div className="innermain">
                    <div className="logores">
                        <h1 className='text-center'>CodersBook</h1>
                    </div>
                    <div className="image9987">
                        <img src={imagearray[Math.floor(Math.random() * 4)]} alt="login" />
                        {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="image" /> */}
                    </div>
                    <div className="form">
                        <h3 className="login__header">
                            <span>W</span>elcome Back!!
                        </h3>
                        <hr />
                        <div class="form__group field">
                            <input type="text" class="form__field" placeholder="Name" name='email' value={credential.email} onChange={onChange} required />
                            <label for="name" class="form__label">Username</label>
                        </div>
                        <div class="form__group field">
                            <input type="password" class="form__field" placeholder="Name" value={credential.password} name="password" id='password' onChange={onChange} required />
                            <label for="name" class="form__label">Password</label>
                        </div>
                        {/* <div class="form__group field">
                            <input type="input" class="form__field" placeholder="Name" name="name" id='name' required />
                            <label for="name" class="form__label">Name</label>
                        </div> */}

                        <button className="btn-login" onClick={login_func}>
                            Log in
                        </button>
                        <button className="btn-signup" onClick={()=>{navigate('/signup')}}>
                            New User? Sign Up
                        </button>

                        {/* <div className="buttonbox">
                            <button className="btn-login1">
                                Sign Up
                            </button>
                            <button className="btn-login2">
                               Already an User!
                            </button>

                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

