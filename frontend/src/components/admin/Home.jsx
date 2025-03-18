

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css"; // Import external CSS

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="home-title">Order Food Easily by Scanning QR Code</h2>
      <Carousel autoPlay infiniteLoop showThumbs={false} showArrows={true}>
        <div>
          <img src="https://source.unsplash.com/800x400/?restaurant,food" alt="Food Order" />
          <p className="legend">Scan QR and Order</p>
        </div>
        <div>
          <img src="https://source.unsplash.com/800x400/?fastfood,menu" alt="Fast Food" />
          <p className="legend">Select Your Meal</p>
        </div>
        <div>
          <img src="https://source.unsplash.com/800x400/?dining,food-delivery" alt="Dining" />
          <p className="legend">Enjoy Your Food</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
