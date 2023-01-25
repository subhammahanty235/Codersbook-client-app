import React from 'react'
import loading from '../../images/loading.gif'
import './loading.css'
function Loading() {
  return (
    <div className='loadingsec'>
        <img src={loading} alt="" />
    </div>
  )
}

export default Loading