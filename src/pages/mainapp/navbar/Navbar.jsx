import React from 'react'
// import { TiThMenuOutline } from 'react-icons/ti'
import './navbar.css'
import Logo from '../../../images/logo.png'

import { faThumbsUp, faBell } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar(props) {
    const style = { color: "", fontSize: "1em", "margin": "0px 20px" ,"cursor":"pointer" }
    const { showhidesidenav , togglenotificationbox} = props
    let dp = "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" || localStorage.getItem('sclmdia_73sub67_details').profilepic;
    if( localStorage.getItem('sclmdia_73sub67_details') != null){
         dp = localStorage.getItem('sclmdia_73sub67_details').profilepic

    }
    return (
        // <div>
        // <nav>
        //     <div className="logo">
        //         Xorinfmt.Println("the value of opinter is ", ptr)fmt.Println("the value of opinter is ", ptr)
        //     </div>
        //     <input type="text" name="" id="" placeholder='hello'/>
        //     {/* <button>jsjs</button> */}
        // </nav>
        // </div>

        <div className="navb">

            {/* <div className="logo"><img src={Logo} alt="logo" /></div> */}
            <h4 className='logo'><span>{"</Coders> "}</span></h4>
            <input type="text" name="" id="" placeholder='hello' />
            <div className="sec">
                <FontAwesomeIcon style={style} icon={faBell} onClick={()=>{
                    togglenotificationbox()
                }} />

                <img onClick={showhidesidenav} src={dp} alt="dp" className="dp" />
                
            </div>
            
        </div>

    )
}

export default Navbar