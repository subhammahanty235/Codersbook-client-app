import React from 'react'
// import { TiThMenuOutline } from 'react-icons/ti'
import './navbar.css'
import Logo from '../../../images/logo.png'

import { faThumbsUp, faBell } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar(props) {
    const style = { color: "", fontSize: "1em", "margin": "0px 20px" }
    const { showhidesidenav } = props
    return (
        // <div>
        // <nav>
        //     <div className="logo">
        //         Xorin
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
                <FontAwesomeIcon style={style} icon={faBell} />

                <img onClick={showhidesidenav} src="https://avatars.githubusercontent.com/u/99578301?v=4" alt="" className="dp" />
                
            </div>
            
        </div>

    )
}

export default Navbar