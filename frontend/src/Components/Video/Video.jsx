import React from 'react';
import './Video.css'; // Make sure you have the correct path to your CSS file
import lebrons from '../Assets/LEBRON JAMES.mp4'; // Remove curly braces around lebrons

const VideoSection = () => {
  return (
    <div className="container2-fluid">
      <div className="row">
        <div className="col-12 p-4">
          <div className="video-container">
            <div className="title-overlay">
              <h2 className="video-title">History</h2>
            </div>
            <video autoPlay loop muted>
              <source src={lebrons} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Video title and description */}
            <div className="col-12 video-info text-center">
              <h1 className="hero-title">LEBRON JAMES<br />OF THE GAME</h1>
              <p className="video-description">
                LeBron James, a distinguished icon of the basketball world, has redefined excellence on and off the court.
                Elevate your performance<br /> and style with Nike inspired by LeBron's unparalleled journey. Ready to step into greatness?
              </p>
              {/* Pill-shaped buttons */}
              <div className="row">
                <div className="col-12 video-buttons">
                  <div className="pill-button">Check It Out</div>
                  <div className="pill-button">
                    Watch<i className="fas fa-play"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
