import React ,{useContext} from 'react'
import './sidenav.css'
import User_image from '../../../../images/user_image.png'
import { useEffect } from 'react';
import { useState } from 'react';
import UserCard from '../userCard/UserCard';
import {  useNavigate } from 'react-router-dom';
import togglepagecontext from '../../../../context/pagestoggle/togglepagecontext';
import { Link } from 'react-router-dom'
function Sidenav(props) {
  const content_page = useContext(togglepagecontext)
  const { pmppage, changepage, setprofileid } = content_page
  const navigate = useNavigate()
  const { userdata , setsidenav} = props;
  // const [pmp , setpmp] = useState(pmppage)
  const profileopenbtn = ()=>{
    navigate('/')
    setprofileid(userdata.user._id)
    changepage(2)
    setsidenav(false)

  }

  const getfollowings = ()=>{

  }

  const logout = ()=>{

    localStorage.removeItem('sclmdia_73sub67_details')
    localStorage.removeItem('sclmdia_73sub67_token')

    navigate('/login')
  }

  return (
    <div className='sidenav'>

      <div className="container">
        <div className="profile">
          <div className="nameanddp">
            <img src={userdata.user?.profilepic !== null ? userdata.user?.profilepic : "https://res.cloudinary.com/dbnqqpobe/image/upload/v1683888315/removal.ai__5c5595dd-bcec-47ef-9403-c6e5317ac359_uiregk.png"} alt="image" />
            <p>{userdata.user?.name}</p>
          </div>
          <button onClick={() => { profileopenbtn() }} className={(pmppage == 2 || pmppage == 5)? 'buttonactive-profileshow' : 'buttonnotactive-profileshow'}>Show Profile</button>
        </div>

        <div className="otherbuttons">
          <button className={(pmppage == 1) ? 'active' : ''}  onClick={() => { navigate('/'); changepage(1);setsidenav(false) }}>Home</button>
          <button data-bs-toggle="modal" data-bs-target="#followersmodal">Followers</button>
          <button data-bs-toggle="modal" data-bs-target="#followingmodal">Followings</button>
          <button onClick={() => { changepage(3);setsidenav(false) }} className={pmppage == 3 ? 'active' : ''}>My Posts</button>
          {/* <div className="imhgy"> */}

          <button>Saved</button>
          {/* </div> */}
          {/* <hr /> */}
          <br />
          <br />
          <button  onClick={logout}>Log Out</button>
        </div>

      </div>
      {/* <!-- Button trigger modal --> */}
      {/* <button type="button" className="btn btn-primary">
        Launch demo modal
      </button> */}

      {/* <!-- Modal --> */}
      <div className="modal fade" id="followersmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Followers</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body mbfollow">
              {
                userdata.user?.followers.length===0?<p className="text-center">You Don't have any followers</p>:
                userdata.user?.followers.map((user)=>{
                  // console.log(user);
                  return <UserCard id={user} key={user._id}/>
                })
              }

             
            </div>
            
          </div>
        </div>
      </div>

      {/* following */}
      <div className="modal fade" id="followingmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Followings</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            {
                userdata.user?.following.length===0?<p className="text-center">Follow People to see them here</p>:
                userdata.user?.following.map((user)=>{
                  // console.log(user);
                  return <UserCard id={user} key={user._id}/>
                })
              }
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidenav