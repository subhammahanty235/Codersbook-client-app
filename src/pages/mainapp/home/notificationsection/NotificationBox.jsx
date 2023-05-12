import React, { useState } from 'react'
import { useEffect } from 'react'
import './notification.css'
function NotificationBox(props) {
    const { data } = props
    const [senderdata, setsenderData] = useState()

    // date


    function formatDate(date) {
        const now = new Date();
        let str_date = new Date(date);
        // alert(Date.now())
        const timeDiff = now - str_date;
        const seconds = timeDiff / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;

        if (days >= 1) {
            return `${Math.floor(days)}d`;
        } else if (hours >= 1) {
            return `${Math.floor(hours)}h`;
        } else if (minutes >= 1) {
            return `${Math.floor(minutes)}m`;
        } else {
            return `${Math.floor(seconds)}s`;
        }
    }




    useEffect(() => {
        const getsenderdata = async () => {
            
            const userdata_raw = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata?id=${data.sender}`, {
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
    }, [])
    return (
        <div className='notificationbox-main'>
            <img onClick={()=>{
                console.log(senderdata);
            }} src={senderdata?.profilepic !== null ? senderdata?.profilepic : "https://res.cloudinary.com/dbnqqpobe/image/upload/v1683888315/removal.ai__5c5595dd-bcec-47ef-9403-c6e5317ac359_uiregk.png"} alt="" />

            <p>{data?.notificationtext}<span>{formatDate(data?.created)}</span></p>
        </div>
    )
}

export default NotificationBox