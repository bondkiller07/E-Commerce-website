import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo-1(1).svg'
import navProfile from '../../assets/nav-profile_1.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={ navlogo } className='nav-logo' alt="" />
        <img src={ navProfile } className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar