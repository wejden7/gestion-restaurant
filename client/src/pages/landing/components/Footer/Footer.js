import React from 'react'
import "./Footer.style.scss"
import {NavLink} from 'react-router-dom'
function Footer() {
  return (
    <div className='footer'>
      <NavLink>TecPro</NavLink>
      <NavLink>Docs</NavLink>
      <NavLink>Product</NavLink>
      <p>Copyright &copy; 2022 Atlassian</p>
    </div>
  )
}

export default Footer