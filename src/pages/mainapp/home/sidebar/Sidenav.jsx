import React ,{useContext} from 'react'
import './sidenav.css'
import User_image from '../../../../images/user_image.png'
import { useEffect } from 'react';
import { useState } from 'react';
import UserCard from '../userCard/UserCard';
import { useNavigate } from 'react-router-dom';
import togglepagecontext from '../../../../context/pagestoggle/togglepagecontext';
function Sidenav(props) {
  const content_page = useContext(togglepagecontext)
  const { pmppage, changepage, setprofileid } = content_page
  const navigate = useNavigate()
  const { userdata} = props;
  // const [pmp , setpmp] = useState(pmppage)
  const profileopenbtn = ()=>{
    setprofileid(userdata.user._id)
    changepage(2)
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
            <img src={userdata.user?.profilepic !== null ? userdata.user?.profilepic : "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"} alt="image" />
            <p>{userdata.user?.name}</p>
          </div>
          <button onClick={() => { profileopenbtn() }} className={(pmppage == 2 || pmppage == 5)? 'buttonactive-profileshow' : 'buttonnotactive-profileshow'}>Show Profile</button>
        </div>

        <div className="otherbuttons">
          <button className={(pmppage == 1) ? 'active' : ''} onClick={() => { changepage(1) }}>Home</button>
          <button data-bs-toggle="modal" data-bs-target="#followersmodal">Followers</button>
          <button data-bs-toggle="modal" data-bs-target="#followingmodal">Followings</button>
          <button onClick={() => { changepage(3) }} className={pmppage == 3 ? 'active' : ''}>My Posts</button>
          {/* <div className="imhgy"> */}

          <button>Saved</button>
          {/* </div> */}
          <button onClick={logout}>Log Out</button>
        </div>

      </div>
      {/* <!-- Button trigger modal --> */}
      {/* <button type="button" class="btn btn-primary">
        Launch demo modal
      </button> */}

      {/* <!-- Modal --> */}
      <div class="modal fade" id="followersmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Followers</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body mbfollow">
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
      <div class="modal fade" id="followingmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Followings</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
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