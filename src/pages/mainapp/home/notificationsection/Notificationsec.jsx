import React, {useEffect} from 'react'
import './notification.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Notificationsec({notifications}) {
    useEffect(() => {
        AOS.init();
      }, [])

    return (
        <div >

            {/* <h5 className="notificationbox-header">
            Notifications
        </h5> */}
        {
            notifications.length !== 0?
            notifications.map((notification)=>{
                console.log(notification);
           return <div className="sub-menu">
                {notification.notificationtext}
            
            </div>

            })
            : "No Notifications"
        }
           
           
            {/* <hr />
        <hr /> */}



        </div>
    )
}

export default Notificationsec