// DescriptionBox.jsx
import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        {/* Corrected class name here */}
        <div className="descriptionbox-nav-box fade">Review (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>An e-commerce website is an online platform that facilitates 
          the buying and selling of goods or services over the internet. 
          It allows businesses to showcase their products or services to a 
          global audience and enables consumers to browse, compare, and make 
          purchases conveniently through the website.</p>
        <p>E-commerce websites typically include features such as product 
          listings, shopping carts, secure payment gateways, and order processing systems.</p> 
        <p>ShoeSavy is a premier online destination for shoe enthusiasts and 
          fashion-forward individuals seeking the perfect blend of style, 
          comfort, and quality. Our website offers an extensive collection of 
          footwear, curated to cater to diverse tastes and preferences. 
          As you step into the world of ShoeSavy, you'll discover a seamless and 
          enjoyable shopping experience designed to elevate your shoe game.</p>
      </div>
    </div>
  );
}

export default DescriptionBox;
