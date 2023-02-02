import React from 'react'
import './notification.css'
function Notificationsec({notifications}) {

    return (
        <div>

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