import React, { useRef, useState, useContext, useEffect } from 'react'
import './profile.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft , faSpinner} from '@fortawesome/free-solid-svg-icons'

import togglepagecontext from '../../../../context/pagestoggle/togglepagecontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function UpdateProfile() {
    const context_page = useContext(togglepagecontext);
    const { changepage } = context_page
    const [myinfo, setmyInfo] = useState();
    const [imageSrc, setImageSrc] = useState('https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png');
    const [staticdata , setstaticdata] = useState();
    const [newdata, setnewdata] = useState(new FormData());
    const [usernamechecked, setusernamechecked] = useState(true);
    const [loading , setloading] = useState(false)
    const [chksym , setchksym] = useState(false)
    const [buttonloading , setbuttonloading] = useState(false)
    const [upbuttonloading , setupbuttonloading] = useState(false)
    const fileInput = useRef(null);

    // Add new data to state


    // Get User information
    useEffect(() => {

        const fetch_data = async () => {
            const mydata_raw = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata?id=${JSON.parse(localStorage.getItem('sclmdia_73sub67_details'))._id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )

            const mydata = await mydata_raw.json();

            setmyInfo(mydata.user)
            setstaticdata(mydata.user)
            if(mydata.user.profilepic !== null || mydata.user.profilepic !== ""){
                setImageSrc(mydata.user.profilepic)

            }
        }
        fetch_data();


    }, [])







    // function to call the updateprofile api
    const updateprofile = async () => {
        // console.log(newdata)

        if (usernamechecked === true) {
            setupbuttonloading(true)
            if (imageSrc !== myinfo.profilepic) {
                const data = new FormData();
                data.append("file", imageSrc);
                data.append("upload_preset", "utk7tsdj");
                data.append("cloud_name", "dbnqqpobe");
                await fetch(process.env.REACT_APP_CLOUDINARY_API, {
                    method: "POST",
                    body: data,
                }).then((res) => res.json())
                    .then((data) => {
                        console.log(data.url)
                        // data_to_upload.push({"image":data.url})
                        data.profilepic = data.url
                        // setImageSrc(data.url);
                    }).catch((err) => {
                        console.log(err)
                    })
            }
            // console.log()
            console.log( JSON.stringify(Object.fromEntries(newdata.entries())).profilepic)
            let data = await fetch(`${process.env.REACT_APP_API_KEY}auth/updateprofile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": localStorage.getItem('sclmdia_73sub67_token')
                },
                body: JSON.stringify(Object.fromEntries(newdata.entries()))

            })
            data = await data.json();
            if(data.flag === true){
                console.log(data)
                console.log(data.data)
                // localStorage.setItem('sclmdia_73sub67_details' , data.data)
                toast('Updated Profile')
                setupbuttonloading(false)
                // alert("Updated Successfully");
            }
            else{
                alert("Try Again")
            }

        }
        else {
            alert("Please Check the Availibilty of the username")
        }



    }



    // function to checkusername api
    const checkusername = async () => {
        // const userdata = username;
        const username = myinfo.username
        if(username.indexOf("@") !== -1){
            setchksym(true)
        }
        else{
            if(staticdata.username === username){
                setusernamechecked(true);
            }
            else{
                setbuttonloading(true)
                let data = await fetch(`${process.env.REACT_APP_API_KEY}auth/checkusername/${username}`, {
                    method: "GET",
                })
        
                data = await data.json();
                setbuttonloading(false)
                if (data.flag === false) {
                    setusernamechecked(false)
                }
                else {
                    setusernamechecked(true)
                }

            }
        }
        // if(staticdata.user)
       
        
    }
    const handleClick = () => {
        fileInput.current.click();
    };

    const handleChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageSrc(e.target.result)
            newdata.append("profilepic", e.target.result);
            setnewdata(newdata);

        };
        reader.readAsDataURL(file);
    };
   
    const onChange = (e) => {
        setmyInfo({ ...myinfo, [e.target.name]: e.target.value })
        if(e.target.name === 'bio'){
            e.target.value.replace(/\n/g, '\\n');
        }
        newdata.append(e.target.name, e.target.value);

        if(e.target.name === 'username'){
            setusernamechecked(false);
        }

        setnewdata(newdata);
    }
    return (
        <div>
            <div className="container">
                <div className="mainscreen">
                    <div className="navbar110">
                        {/* <button>back</button> */}
                        <FontAwesomeIcon icon={faArrowLeft} onClick={()=>{changepage(2)}}/>
                        <button className='updatebutton' onClick={updateprofile}>{upbuttonloading === true ? <FontAwesomeIcon className='spinner' icon={faSpinner}/>  : 'Update'}</button>
                    </div>
                    <div className="profileform">
                        <div className="imagesection">
                            <img src={imageSrc} onClick={handleClick} alt="" className="dp987" />
                            <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleChange} />
                            <label>Click on the image to change</label>

                        </div>
                        <div className="form2">
                            <div className="groupinp">
                                <div className="innergroupinp">
                                    <label htmlFor="">Full Name</label>
                                    <input type="text" id="" name="name" value={myinfo?.name} onChange={onChange} />

                                </div>
                            </div>
                            <div className="groupinp">
                                <div className="innergroupinp">
                                    <label htmlFor="">Username</label>
                                    <div className="usernameinpandbutton">
                                        <input type="text" name="username" id="" value={myinfo?.username} onChange={onChange} />
                                        <button onClick={checkusername}  > <div className={usernamechecked === false ? "indicator-red" : "indicator-green"}></div> {buttonloading === true ? <FontAwesomeIcon className='spinner' icon={faSpinner}/> : 'Check'}</button>
                                    </div>
                                    <label htmlFor="">{usernamechecked === false ? "Please Click on Check to check the availability" : "Available, Good To Go"}</label>
                                    

                                </div>
                                {/* <p className={chksym===true?" ":"d-none"}></p> */}
                            </div>
                            <div className="groupinp">
                                <div className="innergroupinp">
                                    <label htmlFor="">Bio</label>
                                    {/* <input type="text" name="" id="" /> */}
                                    <textarea name="bio" id="" rows="5" value={myinfo?.bio} onChange={onChange}></textarea>

                                </div>
                            </div>
                            <div className="groupinp">
                                <div className="innergroupinp">
                                    <label htmlFor="">email id</label>
                                    <input type="text" name="email" id="" value={myinfo?.email} onChange={onChange} />

                                </div>
                                <div className="innergroupinp">
                                    <label htmlFor="">mobile</label>
                                    <input type="text" name="" id="" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default UpdateProfile