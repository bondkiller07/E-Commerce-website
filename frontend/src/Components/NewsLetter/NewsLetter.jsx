import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers On Your Emails</h1>
        <p>Subscribe to our NewsLetter and Stay Updated</p>
        <div>
            <input type="email" placeholder='Email' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter