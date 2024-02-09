// Carousel.js

import React from 'react';
import './Crousel.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import image_2 from '../Assets/img (2).jpg';
import image_3 from '../Assets/img (3).jpg';
import image_4 from '../Assets/img (4).jpg';
import image_5 from '../Assets/img (5).jpg';
import image_7 from '../Assets/img (7).jpg';

const Carousel = () => {
  return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="5000">
          <img src={image_5} className="d-block w-100" alt="..." />
          <div className="carousel-caption text-start bottom-1 start-0 d-none d-md-block">
            <h6>Experience the Difference</h6>
            <h2>Nike Downshifter</h2>
            <p>Elevate your performance and style with the Nike Downshifter.</p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <img src={image_3} className="d-block w-100" alt="..." />
          <div className="carousel-caption text-start bottom-1 start-0 d-none d-md-block">
            <h6>Another Slide Title</h6>
            <h2>Another Slide Heading</h2>
            <p>Some additional description for this slide.</p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <img src={image_4} className="d-block w-100" alt="..." />
          <div className="carousel-caption text-start bottom-1 start-0 d-none d-md-block">
            <h6>Another Slide Title</h6>
            <h2>Another Slide Heading</h2>
            <p>Some additional description for this slide.</p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <img src={image_2} className="d-block w-100" alt="..." />
          <div className="carousel-caption text-start bottom-1 start-0 d-none d-md-block">
            <h6>Another Slide Title</h6>
            <h2>Another Slide Heading</h2>
            <p>Some additional description for this slide.</p>
          </div>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <img src={image_7} className="d-block w-100" alt="..." />
          <div className="carousel-caption text-start bottom-1 start-0 d-none d-md-block">
            <h6>Another Slide Title</h6>
            <h2>Another Slide Heading</h2>
            <p>Some additional description for this slide.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
