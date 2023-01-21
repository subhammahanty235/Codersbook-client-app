import React from 'react'
// import { TiThMenuOutline } from 'react-icons/ti'
import './navbar.css'
import Logo from '../../../images/logo.png'
function Navbar(props) {
    const {showhidesidenav} = props
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
            <img onClick={showhidesidenav}  src="https://avatars.githubusercontent.com/u/99578301?v=4" alt="" className="dp" />
        </div>
        
    )
}

export default Navbar