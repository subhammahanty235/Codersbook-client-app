import React from 'react'
import Beargif from '../../images/boredbear.png'
import './noposts.css'
function NoPosts() {
  return (
    <div className='nopostsbox'>
        <img src={Beargif} alt="" />
        <hr className="nphr" />
        <h2>No Posts to Display</h2>
    </div>
  )
}

export default NoPosts