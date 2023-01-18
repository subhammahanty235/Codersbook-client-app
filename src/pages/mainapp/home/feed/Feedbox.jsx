import React,{useEffect , useContext} from 'react'
import { useLocation } from 'react-router-dom'
import Profile from '../Profiles/Profile'
import './feedbox.css'
import Myposts from './myposts/Myposts'
import Postnew from './newpost/Postnew'
import Posts from './Posts/Posts'
import togglepagecontext from '../../../../context/pagestoggle/togglepagecontext'
function Feedbox(props) {
  const content_page = useContext(togglepagecontext)
  const { pmppage} = content_page
 
  const { userdata } = props

    let page = <Posts />
    if(pmppage == 1){
      page = <Posts />
      
    }
    
    else{
      page = <Myposts/>
    }

  
  return (
    <div className='feedbox'>
      {/* <button data-bs-toggle="modal" data-bs-target="#exampleModal">click</button> */}

      <div className="innerfeedbox">
        <Postnew userdata={userdata}  />
        {
          page
        } 
        {/* <Myposts /> */}
      </div>

    </div>
  )
}

export default Feedbox