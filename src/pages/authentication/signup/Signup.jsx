import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './signup.css'
import login_image from '../../../images/zorin_login.png'
function Signup() {
    const navigate = useNavigate()
    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }
        const [credential, setcredential] = useState({ email: "", password: "" , name:"" });

        
        const login_func = async () => {
            if (credential.username !== "" && credential.password !== "") {
                console.log(credential)
                try {
                    const responce = await fetch(`${process.env.REACT_APP_API_KEY}auth/signup`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({name:credential.name, email: credential.email, password: credential.password })
                    });
    
                    const json = await responce.json();
                    
                    console.log(json)
                    if(json.flag === true){
                        localStorage.setItem("sclmdia_73sub67_token", json.token)
                        localStorage.setItem("sclmdia_73sub67_details", json.result)
                        navigate('/')

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
        
        <div>
            <div className="main">

                <div className="innermain">

                    <div className="image">
                        <img src={login_image} alt="login" />
                        {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="image" /> */}
                    </div>
                    <div className="form">
                        <h3 className="login__header">
                            <span>Joining</span> A new World
                        </h3>
                        <hr />
                        <div class="form__group field">
                            <input type="text" class="form__field" placeholder="Name" name="name" id='name' value={credential.name} onChange={onChange} required />
                            <label for="name" class="form__label">Full Name</label>
                        </div>
                        <div class="form__group field">
                            <input type="text" class="form__field" placeholder="email id" name="email" id='email' value={credential.email} onChange={onChange} required />
                            <label for="name" class="form__label">email id</label>
                        </div>
                        <div class="form__group field">
                            <input type="input" class="form__field" placeholder="Name" required />
                            <label for="name" class="form__label">username</label>
                        </div>
                        <div class="form__group field">
                            <input type="text" class="form__field" placeholder="Password"  name="password" id='password' value={credential.password} onChange={onChange} required />
                            <label for="name" class="form__label">password</label>
                        </div>
                        {/* <p className="text-center">
                            Aleady A user , Click on the Already User Button to login 
                        </p> */}
                        {/* <div className="buttonbox">
                            <button className="btn-login1">
                                Sign Up
                            </button>
                            <button className="btn-login2">
                               Already an User!
                            </button>

                        </div> */}
                        <button className="btn-login" onClick={login_func}>
                            Sign Up
                        </button>
                        <button className="btn-signup">
                            Already User? Log in
                        </button>
                    </div>

                    {/* <button className="btn-su">Login</button> */}
                </div>
            </div>
        </div>
    )
}

export default Signup

