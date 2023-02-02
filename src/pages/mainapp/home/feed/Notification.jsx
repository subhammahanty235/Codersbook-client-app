// import React, { useState, useEffect } from "react";
// // import axios from "axios";
// import io from "socket.io-client";

// const NotificationList = ({ userId }) => {
//     const [notifications, setNotifications] = useState([]);
//     const socket = io("http://localhost:5000");
//     const config = {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json',
//             'authtoken': localStorage.getItem('sclmdia_73sub67_token')
//         }
//     };
//     useEffect(() => {a
//         const fetchNotifications = async () => {
//             let response = await fetch('http://localhost:5000/api/notification/allnotifications', config)
//             //   const response = await axios.get(`` , config);
//             response = await response.json();
//             // console.log(response)
//             setNotifications(response);
//         };
//         fetchNotifications();

//         socket.on("notification-recieve", newNotification => {
//             console.log("New Notification")
//             setNotifications([...notifications, newNotification]);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [notifications]);

//     return (
//         <ul>
//             {
//                 notifications?.map((notification) => {
//                     console.log(notification)
//                     return <li key={notification._id}>{notification.notificationtext}</li>
//                 })
//             }
//             {/* {notifications?.map(notification => (
       
//         <li key={notification._id}>{notification.notificationtext}</li>
//       ))} */}
//         </ul>
//     );
// };

// export default NotificationList;
