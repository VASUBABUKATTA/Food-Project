
import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import foodLogo from '../../assets/pic13.webp'

import { Link, Outlet, useNavigate } from 'react-router-dom';

// Material-UI Components
import {
  Box,
  Button,
  Typography,
  TextField,
  Container,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  createTheme,
  Drawer,
} from '@mui/material';

// Material-UI Icons
import {
  HomeOutlined as HomeOutlinedIcon,
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  TuneOutlined as TuneOutlinedIcon,
  ArrowBackIosTwoTone as ArrowBackIosTwoToneIcon,
  Category,
  PriceChange,
  Restaurant,
  RestaurantMenu,
  Settings,
  StoreTwoTone,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Dashboard,
  ArrowBackIosTwoTone,
  People,
  Logout,
} from '@mui/icons-material';


import Availability from './Availability';
import Dashboard1 from '../admin/Dashboard';
// Toolpad Core
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import MenuItems from './Menu Items';

import CounterRegistrationApis from '../Api_Services/CounterRegistrationApis.jsx'

import NewMenuItems from './NewMenuItems.jsx';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import Cookies from "js-cookie";


const DemoPageContent =({ pathname }) => {
  const [counters1, setCounters1] = useState([])
  // const [categoryName, setCounterCategory] = useState(counters[0].Categorys);
  const [state, setState] = useState(false);

  const [counterId, setCounterId] = useState('')
  const [counterName, setCounterName] = useState('')
  const [pathname1, setPathName1] = useState('');

  // console.log(pathname);


  const fetchData1 = async () => {
    try {
      const response = await CounterRegistrationApis.fetchAllRegisteredCounterDetails();
      if (response.status === 200 && Array.isArray(response.data)) {
        setCounters1(response.data);
        // Set default values from the first counter
        setCounterId(response.data[0].ID);
        setCounterName(response.data[0].COUNTERNAME)
      } else {
        // console.error("API response is not an array:", response.data);
        setCounters1([]); // Default to empty array to prevent errors
      }
    } catch (error) {
      // console.error("API call failed:", error);
      setCounters1([]); // Set default value to avoid issues
    }
  };

  useEffect(() => {
    fetchData1();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/logout") {
      confirmAlert({
        title: "Confirm Logout",
        message: "Are you sure you want to log out from the application?",
        buttons: [
          {
            label: "Ok",
            onClick: () => {
              Cookies.remove("LoginUser");
              navigate("/"); // Redirect after logout

              toast.success("Logout Successful!", {
                position: "top-right",
                autoClose: 3000, // Closes after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });

              // Perform logout logic (clear local storage, session, etc.)
              localStorage.clear();
              sessionStorage.clear();

            }
          },
          {
            label: "Cancel",
            onClick: () => {
              setPathName1(pathname1);

            }
          }
        ]
      });
    }
    else {
      setPathName1(pathname)
    }
  }, [pathname]);



  const fetchData = async () => {
    try {
      const response = await CounterRegistrationApis.fetchAllRegisteredCounterDetails();
      if (response.status === 200 && Array.isArray(response.data)) {
        setCounters1(response.data);

      } else {
        // console.error("API response is not an array:", response.data);
        setCounters1([]); // Default to empty array to prevent errors
      }
    } catch (error) {
      // console.error("API call failed:", error);
      setCounters1([]); // Set default value to avoid issues
    }
  };

  useEffect(() => {
    fetchData();
  });

  useEffect(() => {
    if (pathname.startsWith("/")) {
      const parts = pathname.split("/");
      const id = parts[1];
      const foundCounter = counters1.find(
        (counter) => counter.ID === id
      );
      if (foundCounter) {
        setCounterCategory(foundCounter.Categorys);
        setState(true);
      }
    }

    if (pathname == "/") {
      console.log("hi");
      fetchData1()
    }

    if (
      pathname.startsWith("/nestead/sidenav/counters/all/Profiles") ||
      pathname.startsWith("/nestead/sidenav/counters/Availability") ||
      pathname.startsWith("/nestead/sidenav/settingsPannel")

    ) {
      setState(false);
    }
    else if (pathname == "/logout") {

    } else {
      const parts = pathname.split("/");
      const id = parts[1];
      // console.log(id);
      setCounterId(id);
      const counterName1 = counters1.findIndex((index) => index.ID == id);
      // console.log(counterName1);

      setCounterName(counters1[counterName1]?.COUNTERNAME);
      setState(true)
    }
    console.log(pathname);

  }, [pathname]);



  const renderContent = (pathname) => {

    console.log(pathname);
  
    switch (pathname) {
      case '/nestead/sidenav/settingsPannel':
        return <MenuItems />
      case '/nestead/sidenav/counters/Availability':
        return <Availability />
      case '/nestead/sidenav/counters/all/Profiles':
        return <Dashboard1 />
      case '/':
        return  <NewMenuItems counterId={counterId} counterName={counterName} />
      default:
        return  <NewMenuItems counterId={counterId} counterName={counterName} />
    }
  };
  

  return (
    // <Box className='mt-2'>

    //   {pathname1 == "/nestead/sidenav/settingsPannel" ? (<><MenuItems /></>) : (<></>)}
    //   {pathname1 == "/nestead/sidenav/counters/Availability" ? (<><Availability /></>) : (<></>)}
    //   {pathname1 == "/nestead/sidenav/counters/all/Profiles" ? (<><Dashboard1 /></>) : (<></>)}

    //   {state ? (<>
    //     {/* <Menu counterId ={counterId}/> */}
    //     <NewMenuItems counterId={counterId} counterName={counterName} />
    //   </>) : <></>}
    // </Box>
    <Box className='mt-2'>
    {renderContent(pathname1)} {/* This will now correctly render the content */}
  </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
  const { window } = props;
  const [counters1, setCounters1] = useState([])
  const router = useDemoRouter('/counters');




  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  const fetchData = async () => {
    try {
      const response = await CounterRegistrationApis.fetchAllRegisteredCounterDetails();
      if (response.status === 200 && Array.isArray(response.data)) {
        setCounters1(response.data);
        // console.log("hi")
      } else {
        console.error("API response is not an array:", response.data);
        setCounters1([]); // Default to empty array to prevent errors
      }
    } catch (error) {
      // console.error("API call failed:", error);
      setCounters1([]); // Set default value to avoid issues
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleLogout = () => {
    console.log('logout')
  }

  // Ensure children is always an array to prevent .map() errors
  const NAVIGATION1 = [
    { kind: 'header', title: <Typography sx={{ color: '#ffffff' }}>Menu</Typography> },
    {
      segment: "/abc",
      title: "Counters",
      icon: <Restaurant sx={{ color: '#ffffff !important', }} />,
      children: Array.isArray(counters1) ? counters1.map((counter) => ({
        segment: counter.ID,
        title: (
          <Button
            variant='contained'
            sx={{
              color: '#ffffff',
              fontWeight: 'bold',
              border: '2px solid black',
              borderRadius: '8px',
              width: '200px',
              // overflow:'auto'
            }} >
            <div style={counter.AVAILABLE == 0 ? { filter: "blur(0px)", color: 'black', opacity: "0.2", transition: "0.3s ease-in-out", } : {}} >
              {truncateText(counter.COUNTERNAME, 10)}</div>

          </Button>
        )
      })) : []
    },
    { segment: 'nestead/sidenav/counters/all/Profiles', title: 'Counter Profiles', icon: <StoreTwoTone sx={{ color: '#ffffff !important' }} /> },
    { segment: 'nestead/sidenav/counters/Availability', title: 'Counters Availability', icon: <RestaurantMenu sx={{ color: "#ffffff !important" }} /> },
    { segment: 'nestead/sidenav/settingsPannel', title: 'Settings', icon: <Settings sx={{ color: '#ffffff !important' }} /> },
    { segment: 'logout', title: 'Logout', icon: <Box onclick={handleLogout}><Logout sx={{ color: '#ffffff !important' }} /> </Box> }
  ];


  const demoTheme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    // colorSchemes: { light: true, dark: true },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      background: {
        paper: "#191970",
      },

    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#191970",
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: "#ffffff", // Ensures primary text is white
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: '#ffffff'
          }
        }
      },

    },
  });




  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION1}
      branding={{
        logo: <Link to='/nestead/sidenav' > <img src={foodLogo} style={{ borderRadius: '50%', textDecoration: 'none' }} alt="MUI logo" /></Link>,
        title: <Link to='/nestead/sidenav' style={{ textDecoration: 'none' }}> <Typography variant='h5' sx={{ color: '#ffffff', fontWeight: 'bold' }}>The Place Drive In</Typography></Link>,
        // homeUrl: '/toolpad/core/introduction',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
      // sx={{
      //   display: { xs: 'block', sm: 'block', md: 'flex' }, 
      // }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

DashboardLayoutBranding.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutBranding;


