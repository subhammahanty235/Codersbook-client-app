import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './posts.css'
function Comment(props) {
  const { cmt } = props;
  const [userData , setUserData] = useState("")
  const getuserdata = async()=>{
     let resdata = await fetch(`http://localhost:5000/api/auth/getdata/${cmt.commentedBy}`,{
          method:"GET",

     })
     resdata = await resdata.json();
     setUserData(resdata)

  }
  useEffect(()=>{
      getuserdata()
      // console.log(=)
  })
  return (
    <div>
        <div className="commentcont">
        <img src={userData.user?.profilepic !== null ? userData.user?.profilepic : "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"} alt="image" className='imgdp' />
            <div className="maincont">
                <div className="innermaincont">

                <p className="name">
                    {userData.user?.name}  <span></span>
                </p>
                <p className="content">
                    {cmt?.comment}
                </p>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Comment