import React, { useState } from 'react'
import { useEffect } from 'react'
import './notification.css'
function NotificationBox(props) {
  const {data} = props
    const [senderdata , setsenderData] = useState()
    useEffect(()=>{
        const getsenderdata = async()=>{
            const userdata_raw = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata/${data.from}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )

            const userdata = await userdata_raw.json();
            setsenderData(userdata.user)
        }
        // alert(data)
        getsenderdata()
    },[])
  return (
    <div className='notificationbox-main'>
        <img src={senderdata?.profilepic !== null ? senderdata?.profilepic : "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"} alt=""  />
        
        <p>{data?.notificationtext}<span>2d</span></p>
    </div>
  )
}

export default NotificationBox