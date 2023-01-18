import React from 'react'
// import { TiThMenuOutline } from 'react-icons/ti'
import './navbar.css'
import Logo from '../../../images/logo.png'
function Navbar() {
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
            
            <div className="logo"><img src={Logo} alt="logo" /></div>
            <input type="text" name="" id="" placeholder='hello'/>
        </div>
        
    )
}

export default Navbar