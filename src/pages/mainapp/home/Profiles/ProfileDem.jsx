import React, { useState, useEffect, useContext } from 'react'
import NoPosts from '../../../../components/noposts/NoPosts';
import Post from '../feed/Posts/Post';
import './profile.css'
import togglepagecontext from '../../../../context/pagestoggle/togglepagecontext';
import Loading from '../../../../components/noposts/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../../navbar/Navbar'
import Sidenav from '../sidebar/Sidenav'
import Profile from './Profile'

// from Home.jsx



import '../../home/home.css'

// import { useLocation, useNavigate } from 'react-router-dom'


import UpdateProfile from '../Profiles/UpdateProfile'
// import togglepagecontext from '../../../context/pagestoggle/togglepagecontext'
// import { useContext } from 'react'
// import NotificationList from '../notificationsection/'
import Notificationsec from '../notificationsection/Notificationsec'
import io from "socket.io-client";


import { useLocation, useNavigate } from 'react-router-dom'
import './profile.css'
function ProfileDem() {
    let location = useLocation();
    let navigate = useNavigate()
    const [loading, setloading] = useState(false);
    const context_page = useContext(togglepagecontext);
    // const { changepage } = context_page
    const [myPosts, setmyPosts] = useState();
    const [userinfo, setuserInfo] = useState();
    const [myinfo, setmyInfo] = useState();
    const [followerslist, setfollowerslist] = useState([])
    const [followinglist, setfollowinglist] = useState([])
    const [tfb, settfb] = useState(myinfo?.following.includes(userinfo?._id) ? true : false)
    const [userdata, setuserdata] = useState({})
    const [show, setshow] = useState(false);
    const mydetails = JSON.parse(localStorage.getItem('sclmdia_73sub67_details'));
    let searchParams = new URLSearchParams(location.search);
    let profileusername = searchParams.get("username");
    
    // From Home.jsx

    const content_page = useContext(togglepagecontext)
    const { pmppage, changepage, setprofileid } = content_page

    // to operate the notification box
    const [menuopen, setmenuOpen] = useState(false);
    const togglenotificationbox = () => {
        setmenuOpen(!menuopen)
    }

    const [notifications, setNotifications] = useState([]);
    // const socket = io("http://localhost:5000");
    const config = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authtoken': localStorage.getItem('sclmdia_73sub67_token')
        }
    };
    let page = <Profile />
    // let page = <Feedbox userdata={userdata} pmp={pmppage} pmppage={pnp_change} setprofileid={setprofileid}/>
    if (pmppage == 2) {
        // page = <Profile id={profileid} />
        page = <Profile />
    }
    else if (pmppage == 5) {
        page = <UpdateProfile />
    }
    // else {
    //     page = <Feedbox userdata={userdata} />
    //     // page = <NotificationList/>
    // }

    useEffect(() => {
        const fetchNotifications = async () => {
            let response = await fetch(`${process.env.REACT_APP_API_KEY}notification/allnotifications`, config)
            //   const response = await axios.get(`` , config);
            response = await response.json();
            // console.log(response)
            setNotifications(response);
        };
        fetchNotifications();
        
    });

    useEffect(() => {
        // console.log(username)
        if (!localStorage.getItem('sclmdia_73sub67_token')) {
            navigate('/login')
        }
        else {
            async function getdata() {
                const mydetails = JSON.parse(localStorage.getItem('sclmdia_73sub67_details'));

                // console.log(mydetails)
                const data = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata/${mydetails._id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },

                })
                const data2 = await data.json();
                setuserdata(data2)
            }

            getdata();
        }
    }, [])


    // states
   
    const followaccount = async () => {
        // console.log(followinglist)
        // console.log(followerslist)

        let data = await fetch(`${process.env.REACT_APP_API_KEY}auth/follow/${userinfo._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem('sclmdia_73sub67_token')
            }
        })
        data = await data.json();
        if (data.flag === true) {
            toast("Followed")
            setfollowinglist(followinglist.push(userinfo._id))
            // console.log(followinglist)



        }
        else {
            alert("Error")
        }
    }
    const set = () => {
        setshow(!show);
    }
    //   const togglenotificationbox = () => {
    //     setmenuOpen(!menuopen)
    //   }

    const unfollowaccount = async () => {
        // console.log(followinglist)
        // console.log(followerslist)

        let data = await fetch(`${process.env.REACT_APP_API_KEY}auth/unfollow/${userinfo._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'authtoken': localStorage.getItem('sclmdia_73sub67_token')
            }
        })
        data = await data.json();
        if (data.flag === true) {
            toast("UnFollowed")
            setfollowinglist(followinglist.pull(userinfo._id))
            console.log(followinglist)



        }
        else {
            alert("Error")
        }
    }
    useEffect(() => {
        // console.log(id)
        const fetch_my_data = async () => {
            setloading(true)

            const mydata_raw = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata?id=${mydetails?._id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
            const mydata = await mydata_raw.json();
            // setmyPosts(mydata.posts)
            setmyInfo(mydata.user)

            setfollowerslist(mydata.user.followers);
            setfollowinglist(mydata.user.following);
            setloading(false)

        }
        const fetch_data = async () => {
            setloading(true)
            const mydata_raw = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata?username=${profileusername}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )

            const mydata = await mydata_raw.json();
            setmyPosts(mydata.posts)
            setuserInfo(mydata.user)
            settfb(myinfo?.following.includes(userinfo._id) ? true : false)
            setloading(false)
        }



        fetch_my_data()
        fetch_data();
        // console.log(tfb)




    }, [])
  


    return (
        <>
            <>

                <div className="mainbody">

                    <div className='homescreen'>
                        <Navbar showhidesidenav={set} togglenotificationbox={togglenotificationbox} />
                        {/* Notification box */}


                        <div className={`sub-menu-wrap ${menuopen === true ? 'open-menu' : ''}`}>
                            <Notificationsec notifications={notifications} />

                        </div>
                        <div className="oth" >

                            <div className="feedboxarea">

                                {loading === false ?

                                    <div className="mainbox">
                                        <div className="innermainbox">
                                            <div className="name-dp-id">
                                                <img className='dp987' src={userinfo?.profilepic !== null ? userinfo?.profilepic : "https://th.bing.com/th/id/OIP.D-1rllcf24AeFq9hvmSHSQHaHa?w=183&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7"} alt="image" />
                                                {/* <img className="dp987" src="data:image/jpeg;base64,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" alt="" /> */}
                                                <div className="name-id">
                                                    <h3 className="pname">{userinfo?.name}</h3>
                                                    <h5 className="pid">@{userinfo?.username}</h5>
                                                    <br />
                                                    <div className='follow-editprofile-onp'>
                                                        {

                                                            mydetails?._id === userinfo?._id ?
                                                                <button data-bs-toggle="modal" data-bs-target="#editprofilemodal" onClick={() => { changepage(5) }}>Edit Profile</button>
                                                                : (userinfo?.following.includes(mydetails?._id)) ?
                                                                    <button>Follow Back</button> : (myinfo?.following.includes(userinfo?._id) ?
                                                                        <button onClick={() => { console.log(followerslist); console.log(followinglist) }}>UnFollow</button> :
                                                                        <button onClick={followaccount}>Follow</button>)
                                                            // mydetails?._id ===userinfo?._id ? <button data-bs-toggle="modal" data-bs-target="#editprofilemodal" onClick={()=>{changepage(5)}}>Edit Profile</button> : (userinfo?.following.includes(mydetails?._id)) ? <button onClick={followaccount}>Follow Back</button> :(myinfo?.following.includes(userinfo?._id) ?  <button onClick={()=>{console.log(followerslist);console.log(followinglist)}}>UnFollow</button> : <button onClick={followaccount}>Follow</button> )
                                                        }
                                                        {/* <button>Follow</button> */}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="follow-unfollow-buttons">
                                                <div className='follow-editprofile'>
                                                    {

                                                        mydetails?._id === userinfo?._id ?
                                                            <button data-bs-toggle="modal" data-bs-target="#editprofilemodal" onClick={() => { changepage(5) }}>Edit Profile</button>
                                                            : (userinfo?.following.includes(mydetails?._id)) ?
                                                                <button onClick={followaccount}>Follow Back</button> : (myinfo?.following.includes(userinfo?._id) ?
                                                                    <button onClick={unfollowaccount}>UnFollow</button> :
                                                                    <button onClick={followaccount}>Follow</button>)
                                                        // mydetails?._id ===userinfo?._id ? <button data-bs-toggle="modal" data-bs-target="#editprofilemodal" onClick={()=>{changepage(5)}}>Edit Profile</button> : (userinfo?.following.includes(mydetails?._id)) ? <button onClick={followaccount}>Follow Back</button> :(myinfo?.following.includes(userinfo?._id) ?  <button onClick={()=>{console.log(followerslist);console.log(followinglist)}}>UnFollow</button> : <button onClick={followaccount}>Follow</button> )
                                                    }
                                                    {/* <button>Follow</button> */}

                                                </div>
                                                <div className='profiledetails'>
                                                    <button>Followers <span>{userinfo?.followers?.length}</span></button>
                                                    <button>Followings <span>{userinfo?.following?.length}</span></button>
                                                    <button onClick={() => { console.log(tfb) }}>Posts <span>{userinfo?.totalposts}</span></button>
                                                </div>

                                            </div>
                                            <hr className="posthr" />
                                            <div className="bio">
                                                {/* <h4>Bio:</h4> */}
                                                <p dangerouslySetInnerHTML={{ __html: userinfo?.bio?.replace(/\n/g, "<br/>") }} />
                                                {/* {userinfo?.bio} */}
                                                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque tempora quae illo officiis autem maxime? Ratione, placeat. Architecto, maxime. Quia, repellendus similique eos perferendis quas facere suscipit ex eveniet sunt nostrum illo saepe culpa fugit? Minima labore sapiente ipsa nemo? Ullam suscipit nemo odit non officia alias excepturi consectetur reprehenderit quas laborum nostrum distinctio quos nam rerum velit sit quidem maiores, illum nisi facilis voluptatibus saepe? Commodi earum, ullam maiores similique cum ipsam quos omnis nostrum officiis tempora non excepturi voluptatem illum! Incidunt blanditiis, sit aliquid ipsum dicta commodi, recusandae velit quisquam vel quis fugit rem, sunt distinctio amet! Unde. */}
                                            </div>
                                            {/* <hr className="posthr" /> */}
                                            <div className="posts">
                                                <div className="container">
                                                    {
                                                        myPosts?.length === 0 ? < NoPosts /> :
                                                            myPosts?.map((post) => {
                                                                // console.log(post)
                                                                return <Post post={post} key={post._id} />

                                                            })
                                                    }

                                                </div>
                                            </div>
                                            <ToastContainer style={{ marginTop: '100px' }} />
                                        </div>




                                    </div>
                                    : <Loading />

                                }

                            </div>
                            <div className={`sidebararea ${show === false ? "sidebarhide" : "sidebarshow"}`}>
                                <Sidenav setsidenav={set} userdata={userdata} />
                                {/* <Sidenav userdata={userdata} pmppage={pnp_change} pmp={pmppage} setprofileid={setprofileid}/> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>




    )
}

export default ProfileDem