import React from 'react'
import logo from "../Image/Pawantyagi.jpg"

function Logo({width = '100px'}) {
  return (
    <div>
      <img src={logo} alt="" style={{width,borderRadius:"50%"}}/>
    </div>
  )
}

export default Logo