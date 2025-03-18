
import React, { useEffect, useState } from 'react'
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
import './Home.css';
import Cards from './CardData';
import Footer from '../admin/Footer.jsx';
// import Fab from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';


import p14 from '../../assets/pic13.webp';
import p13 from '../../assets/pic13.webp';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";


function HomePage() {

  useEffect(()=>{
    Cookies.remove("LoginUser");
  },[])

  const navigate = useNavigate();

  const [sate, setState] = useState(false)

  const handleClose =()=>{setState(false)}

  const scrollToCards = () => {
    const element = document.getElementById("cards-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenLoginForm = () => { setState(true); }


    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
      console.log(credentials)
        e.preventDefault();
        if (credentials.username === "admin" && credentials.password === "admin@123") {
          toast.success("Login Successfull!", {
            position: "top-right",
            autoClose: 5000, // Closes after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          Cookies.remove("LoginUser");
          Cookies.set("LoginUser", "verified");
            navigate("/nestead/sidenav");
        } else {
          toast.error("Invalid Credentials!", {
            position: "top-right",
            autoClose: 5000, // Closes after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
    };


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div>
        <div className='text-light w-100 sticky-top' style={{ height: '60px', backgroundColor: 'midnightblue' }}>
          <div className='container w-100 h-100'>
            <div className='w-100 h-100 d-flex justify-content-between align-items-center'>
              <div>
                <h3>The Place Drive In</h3>
              </div>
              <div>
                <Button variant='outlined' sx={{ fontWeight: 'bold', fontSize: '2', width: '100px', color: 'white', border: '2px solid black', borderRadius: '8px 8px 8px 8px', }} onClick={handleOpenLoginForm}>Login</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="home-container">
          {/* <h2 className="home-title">Order Food Easily by Scanning QR Code</h2>s */}
          <Carousel autoPlay infiniteLoop showThumbs={false} showArrows={true}>
            <div>
              <img src={p1} alt="Food Order" />
              <p className="legend">A modern restaurant scene with a customer walking in and noticing a QR code placed on the table. The environment has a blue and white theme, with eleg</p>
            </div>
            <div>
              <img src={p2} alt="Fast Food" />
              <p className="legend">A customer using their smartphone to scan a QR code placed on the restaurant table. The screen displays a digital menu. The restaurant environment mai</p>
            </div>
            <div>
              <img src={p3} alt="Dining" />
              <p className="legend">A customer browsing a digital menu on their smartphone in a modern restaurant. The screen shows various food items with images and prices. The setting</p>
            </div>
            <div>
              <img src={p4} alt="Dining" />
              <p className="legend">A customer confirming their food order on a smartphone screen in a modern restaurant. The screen displays a summary of selected dishes with a 'Confirm</p>
            </div>
            {/* <div>
            <img src={p5} alt="Dining" />
            <p className="legend">A waiter bringing the ordered food to a customer's table in a modern restaurant. The setting follows a blue and white theme with stylish decor and war</p>
          </div> */}
            <div>
              <img src={p6} alt="Dining" />
              <p className="legend">A customer enjoying their meal in a modern restaurant with a blue and white theme. The table is set with delicious food, and the customer looks satisf</p>
            </div>
          </Carousel>
        </div>
        {/* Cards Section with ID for Scrolling */}
        <div id="cards-section">
          <Cards />
        </div>

        <div>
          <Footer />
        </div>

        {/* Floating Explore Button */}
        <Tooltip title="Explore" arrow>
          <Fab
            color="primary"
            aria-label="explore"
            onClick={scrollToCards}
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              backgroundColor: "midnightblue",
              color: "white",
              "&:hover": { backgroundColor: "darkblue" }
            }}
          >
            <ExploreIcon />
          </Fab>
        </Tooltip>
        <>
          {sate ? (<>
            <Modal show={sate} onHide={handleClose} style={{marginTop:'35px',}} backdrop="static" keyboard={false}>
              <Modal.Body style={{backgroundColor:'midnightblue'}}>
                <div className='container-fluid adminLoginPage mb-4' >
                  {/* <div className='d-flex justify-content-center'>
                    <img src={p13} className='rounded' style={{ height: '3rem', marginTop: '4rem' }} alt='Admin' />
                  </div> */}
                  <div className='d-flex justify-content-center '>
                    <form onSubmit={handleSubmit}>
                      <div className='card mt-3 p-4' style={{ width: '22rem' }}>
                        <h2 className='text-center mb-2 fw-bold'>
                          Admin Login <img src={p14} alt='logo' className='rounded ms-2' style={{ height: '35px' }} />
                        </h2>
                        <TextField
                          id="standard-basic"
                          label="User Name"
                          variant="standard"
                          name='username'
                          className=''
                          value={credentials.username}
                          onChange={onChange}
                          required
                        />
                        <div className="">
                          <FormControl
                            variant="standard"
                            className='w-100 mt-2'
                          >
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                              id="standard-adornment-password"
                              type={showPassword ? 'text' : 'password'}
                              name='password'
                              value={credentials.password}
                              onChange={onChange}
                              required
                              // endAdornment={
                              //   <InputAdornment position="end">
                              //     <IconButton
                              //       aria-label="toggle password visibility"
                              //       onClick={handleClickShowPassword}
                              //       onMouseDown={handleMouseDownPassword}
                              //       edge="end"
                              //       style={{ marginRight: '-12px' }}
                              //     >
                              //       {showPassword ? <VisibilityOff /> : <Visibility />}
                              //     </IconButton>
                              //   </InputAdornment>
                              // }
                            />
                          </FormControl>

                        </div>
                        <div className='d-flex text-center justify-content-center align-items-center'>
                        <button type='button' className='btn btn-danger px-4 mt-4 me-4' onClick={handleClose}>cancel</button>
                        <button type='submit' className='btn btn-primary px-4 mt-4 '>Login</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </>) : (<></>)}
        </>
      </div>

    </>
  )
}

export default HomePage;
