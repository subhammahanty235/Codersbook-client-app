import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './posts.css'
function Comment(props) {
  const { cmt } = props;
  const [userData , setUserData] = useState("")
  const getuserdata = async()=>{
     let resdata = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata?id=${cmt.commentedBy}`,{
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
        <img src={userData.user?.profilepic !== null ? userData.user?.profilepic : "https://res.cloudinary.com/dbnqqpobe/image/upload/v1683888315/removal.ai__5c5595dd-bcec-47ef-9403-c6e5317ac359_uiregk.png"} alt="image" className='imgdp' />
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