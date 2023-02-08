import React, { useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import Feedbox from './feed/Feedbox'
import './home.css'
import Sidenav from './sidebar/Sidenav'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Profile from './Profiles/Profile'
import UpdateProfile from './Profiles/UpdateProfile'
import togglepagecontext from '../../../context/pagestoggle/togglepagecontext'
import { useContext } from 'react'
import NotificationList from './feed/Notification'
import Notificationsec from './notificationsection/Notificationsec'
import io from "socket.io-client";


function Home() {
  const content_page = useContext(togglepagecontext)
  const { pmppage, changepage, setprofileid } = content_page

  // to operate the notification box
  const [menuopen, setmenuOpen] = useState(false);
  const togglenotificationbox = () => {
    setmenuOpen(!menuopen)
  }


  // 

  // for the notification
  const [notifications, setNotifications] = useState([]);
  const socket = io("http://localhost:5000");
  const config = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'authtoken': localStorage.getItem('sclmdia_73sub67_token')
    }
  };


  const navigate = useNavigate()

  const [show, setshow] = useState(false);
  const set = () => {
    setshow(!show);
  }
  useEffect(() => {
    if (!localStorage.getItem('sclmdia_73sub67_token')) {
      navigate('/login')
    }
  })

  const [userdata, setuserdata] = useState({})


  let page = <Feedbox userdata={userdata} />
  // let page = <Feedbox userdata={userdata} pmp={pmppage} pmppage={pnp_change} setprofileid={setprofileid}/>
  if (pmppage == 2) {
    // page = <Profile id={profileid} />
    page = <Profile />
  }
  else if (pmppage == 5) {
    page = <UpdateProfile />
  }
  else {
    page = <Feedbox userdata={userdata} />
    // page = <NotificationList/>
  }


  // fetch Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      let response = await fetch('http://localhost:5000/api/notification/allnotifications', config)
      //   const response = await axios.get(`` , config);
      response = await response.json();
      // console.log(response)
      setNotifications(response);
    };
    fetchNotifications();
    // setTimeout(() => {
    //   socket.on("notification-recieve", newNotification => {
    //     console.log("New notificatiokn")
    //     setNotifications([...notifications, newNotification]);
    //   });
    //   // console.log('This will run after 3 seconds');
    // }, 3000);

    // return () => {
    //   socket.disconnect();
    // };
  }, [notifications]);


  useEffect(() => {
    if (!localStorage.getItem('sclmdia_73sub67_token')) {
      navigate('/login')
    }
    else {
      async function getdata() {
        const mydetails = JSON.parse(localStorage.getItem('sclmdia_73sub67_details'));

        // console.log(mydetails)
        const data = await fetch(`${process.env.REACT_APP_API_KEY}auth/getdata/${mydetails._id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },

        })
        const data2 = await data.json();
        setuserdata(data2)
      }

      getdata();
    }
  }, [])
  return (
    <>

      <div className="mainbody">

        <div className='homescreen'>
          <Navbar showhidesidenav={set} togglenotificationbox={togglenotificationbox} />
          {/* Notification box */}


          <div className={`sub-menu-wrap ${menuopen === true ? 'open-menu' : ''}`}>
            <Notificationsec notifications={notifications} />

          </div>
          <div className="oth" >

            <div className="feedboxarea">

              {
                page
              }
              {/* <Feedbox userdata={userdata} pmp={pmppage}/> */}
            </div>
            <div className={`sidebararea ${show === false ? "sidebarhide" : "sidebarshow"}`}>
              <Sidenav setsidenav={set} userdata={userdata} />
              {/* <Sidenav userdata={userdata} pmppage={pnp_change} pmp={pmppage} setprofileid={setprofileid}/> */}
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Home