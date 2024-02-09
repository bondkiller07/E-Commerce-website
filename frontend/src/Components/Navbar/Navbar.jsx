// Navbar.js

import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import logo from '../Assets/logo(3).png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_dropdown(2).png';


const Navbar = () => {
  const [menu, setMenu] = useState('Shop');
  const { getTotalCartItems } = useContext(ShopContext);
  const [name, setName] = useState('');
  const menuRef = useRef();
  const dropdownRef = useRef();
  
  

  useEffect(() => {
    const loggedInName = localStorage.getItem('name');
    console.log('Logged In Name:', loggedInName);
  
    if (loggedInName) {
      setName(loggedInName);
    }
  }, []);  

  const dropdownToggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    dropdownRef.current.classList.toggle('profile-dropdown-visible');
    e.target.classList.toggle('open');
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt='' />
        <p>ShoeSavy</p>
      </div>
      <img className='nav-dropdown' onClick={dropdownToggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className='nav-menu'>
        <li onClick={() => setMenu('Shop')}>
          <Link style={{ textDecoration: 'none' }} to='/'>Home</Link>
          {menu === 'Shop' ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu('Men')}>
          <Link style={{ textDecoration: 'none' }} to='/Men'>Men</Link>
          {menu === 'Men' ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu('Women')}>
          <Link style={{ textDecoration: 'none' }} to='/Women'>Women</Link>
          {menu === 'Women' ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu('kids')}>
          <Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>
          {menu === 'kids' ? <hr /> : <></>}
        </li>
      </ul>
      <div className='nav-login-cart'>
        {localStorage.getItem('auth-token') ? (
          <div className='profile-dropdown'>
            <button onClick={dropdownToggle}>{name || 'My Profile'}</button>
            <div ref={dropdownRef} className='profile-dropdown-content'>
              <Link to='/profile'>My Profile</Link>
              <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to='/login'>
            <button>Login</button>
          </Link>
        )}
        <Link to='/cart'>
          <img src={cart_icon} alt='' />
        </Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
