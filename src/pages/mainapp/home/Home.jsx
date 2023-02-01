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

function Home() {
  const content_page = useContext(togglepagecontext)
  const { pmppage, changepage, setprofileid } = content_page
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
  //   const [pmppage , setpmppage] = useState(1);
  //   // const [profileid , setprofile]= useState(JSON.parse(localStorage.getItem('sclmdia_73sub67_details'))._id)
  //   const [profileid , setprofile]= useState("")
  //   const setprofileid = (id)=>{
  //     setprofile(id)
  //     console.log(profileid)
  //   }
  //   const pnp_change = (n)=>{         //it will help swiching between all posts and my posts page
  //     setpmppage(n);
  //     console.log(pmppage)

  // }
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
          <Navbar showhidesidenav={set} />
          {/* Notification box */}

          
          <div className={`sub-menu-wrap  open-menu `}>
                    <div className="sub-menu">

                        hdhewiewiuui
                        {/* <div className="user-info">
                            <h5 className="tripname text-center">{tripData.tripName}</h5>
                            <p className="tripid ">Trip ID : {tripData.tripID}</p>
                            <p className="tripbudget">Trip Budget : ₹{tripData.budgetTotal}</p>
                            <p className="totalmem">Total Members : {tripData.users?.length}</p>
                            <hr />
                            <p className="username">Name : {mydata.name} </p>
                            <p className="emailid">{mydata.emailId}</p>
                            <p className="Totalspent">Total Spent :  ₹{mydata.totalAmountpaid}</p>
                            <hr />
                           
                            {/* <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="customSwitch1" checked/>
                                    <label class="custom-control-label" for="customSwitch1">Change Theme</label>
                            </div> */}
                        {/* <button className="btn btn-outline-primary logoutbutton" onClick={logOut}>Log Out</button> */}
                        {/* </div>  */}

                    </div>
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