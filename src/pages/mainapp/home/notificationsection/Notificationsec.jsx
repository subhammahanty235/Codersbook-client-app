import React, {useEffect} from 'react'
import './notification.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import NotificationBox from './NotificationBox';

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
                // alert(notification)
                console.log(notification);
           return <NotificationBox data={notification}/>
                
            
        

            }) 
            : "No Notifications"

        // <NotificationBox/>
        }
           
           
            {/* <hr />
        <hr /> */}



        </div>
    )
}

export default Notificationsec