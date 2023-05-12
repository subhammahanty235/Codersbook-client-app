import React, { useEffect } from 'react'
// import { TiThMenuOutline } from 'react-icons/ti'
import './navbar.css'
import Logo from '../../../images/logo.png'
import { useNavigate } from 'react-router-dom'
import { faThumbsUp, faBell } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar(props) {
    const navigate = useNavigate()
    const style = { color: "", fontSize: "1em", "margin": "0px 20px" ,"cursor":"pointer" }
    const { showhidesidenav , togglenotificationbox} = props
    let dp =localStorage.getItem('sclmdia_73sub67_details').profilepic || "https://res.cloudinary.com/dbnqqpobe/image/upload/v1683888315/removal.ai__5c5595dd-bcec-47ef-9403-c6e5317ac359_uiregk.png"  ;

    useEffect(()=>{
        if( localStorage.getItem('sclmdia_73sub67_details') != null){
             dp = localStorage.getItem('sclmdia_73sub67_details').profilepic
    
        }else{
            navigate('/login');
        }
        
    },[])
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