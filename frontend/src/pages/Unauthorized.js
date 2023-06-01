import React from 'react'
import { Link } from 'react-router-dom'
import './unauthorized.scss'
function Unauthorized() {
  return (
    <>
      <div className='ucontainer'>
        <div className="lock"></div>
        <div className="message p-3">
          <h1>Access to this page is restricted</h1>
          <p>Please check with the site admin if you believe this is a mistake.</p>
          <Link to='/'>Back to home</Link>
        </div>
      </div>
    </>
  )
}

export default Unauthorized