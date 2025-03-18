
import React, { useState } from 'react'
import {
  TextField, Button, Container, Typography, Box,
  Fab,
  Tooltip, FormControl, IconButton, Input, InputAdornment, InputLabel, 
  
} from "@mui/material";
import Modal from 'react-bootstrap/Modal';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import p1 from '../../assets/pic1.webp'
import p2 from '../../assets/pic2.webp'
import p3 from '../../assets/pic3.webp'
import p4 from '../../assets/pic4.webp'
import p5 from '../../assets/pic5.webp'
import p6 from '../../assets/pic6.webp'

import { useNavigate } from 'react-router-dom';


function UserHomePage() {

  const navigate = useNavigate();

 
  return (
    <>
      <div>
        {/* <div className='text-light w-100 sticky-top' style={{ height: '60px', backgroundColor: 'midnightblue' }}>
          <div className='container w-100 h-100'>
            <div className='w-100 h-100 d-flex justify-content-between align-items-center'>
              <div>
                <h3>The Place Drive In</h3>
              </div>
              
            </div>
          </div>
        </div> */}

        <div className="home-container" style={{height:'300px'}}>
         
          <Carousel autoPlay infiniteLoop showThumbs={false} showArrows={true}  >
            <div >
              <img src={p1} alt="Food Order" style={{ height: "300px", width: "100%", objectFit: "cover" }}/>
              {/* <p className="legend">A modern restaurant scene with a customer walking in and noticing a QR code placed on the table. The environment has a blue and white theme, with eleg</p> */}
            </div>
            <div>
              <img src={p2} alt="Fast Food" style={{ height: "300px", width: "100%", objectFit: "cover" }} />
              {/* <p className="legend">A customer using their smartphone to scan a QR code placed on the restaurant table. The screen displays a digital menu. The restaurant environment mai</p> */}
            </div>
            <div>
              <img src={p3} alt="Dining" style={{ height: "300px", width: "100%", objectFit: "cover" }} />
              {/* <p className="legend">A customer browsing a digital menu on their smartphone in a modern restaurant. The screen shows various food items with images and prices. The setting</p> */}
            </div>
            <div>
              <img src={p4} alt="Dining" style={{ height: "300px", width: "100%", objectFit: "cover" }}/>
              {/* <p className="legend">A customer confirming their food order on a smartphone screen in a modern restaurant. The screen displays a summary of selected dishes with a 'Confirm</p> */}
            </div>
           
            <div>
              <img src={p6} alt="Dining" style={{ height: "300px", width: "100%", objectFit: "cover" }}/>
              {/* <p className="legend">A customer enjoying their meal in a modern restaurant with a blue and white theme. The table is set with delicious food, and the customer looks satisf</p> */}
            </div>
          </Carousel>
        </div>
      
      </div>

    </>
  )
}

export default UserHomePage;
