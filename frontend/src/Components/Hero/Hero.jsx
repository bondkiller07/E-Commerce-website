import React from 'react'
import './Hero.css'
//import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image_1 from '../Assets/RM_Nike Fear Of God 1.png'

const Hero = () => {
  return (
    <div className='hero'>
         <div className="hero-left">
          <h2>NEW ARRIVALS ONLY</h2>
          <div>
            <div className="hand-hand-icon">
              <p>NEW</p>
              <img src="" alt="" />
            </div>
            <p>Collections</p>
            <p> for Everyone</p>
          </div>
          <div className="hero-latest-btn">
            <div>Latest Collections</div>
            <img src={arrow_icon} alt="" />
          </div>
         </div>
         <div className="hero-right">
          <img src={hero_image_1} alt="" />
         </div>
    </div>
  )
}

export default Hero