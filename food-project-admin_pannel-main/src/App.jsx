import React from 'react'
import HomePage from './components/admin/AdminHomePage'
import { Route, Routes } from 'react-router-dom'
import B from './components/admin/B';
import Dashboard from './components/admin/Dashboard';
import Availability from './components/admin/Availability';
import MenuItems from './components/admin/Menu Items';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import UserHomePage from './components/userPannel/UserHomePage';
import CounterPanelLogin from './components/CounterPannel/CounterPnnelLogin';
// import Menu from './components/CounterPannel/MenuItems';
import LandingPage from './components/CounterPannel/LandingPage';
import Settings from './components/CounterPannel/Settings';

import Dashboard1 from './components/CounterPannel/Dashboard';
import Menu from './components/CounterPannel/MenuItems';
import Availability1 from './components/CounterPannel/Availability';
import CounterMenuItems from './components/CounterPannel/CounterMenuItems';
import "react-confirm-alert/src/react-confirm-alert.css";
import QrCode from './components/userPannel/QrCode';
import UserDashboard from './components/userPannel/UserDashboard';
import ProtectedRouteAdminPannel from './components/admin/ProtectRouteAdminPannel';
import ProtectedRouteCounterPannel from './components/CounterPannel/ProtectRouteCounterPannel';

function App() {
  return (
    <div>
      <Routes>
        {/* Admin Routes : */}
        <Route path='/' element={<HomePage />} />
        <Route path='/logout' element={<HomePage />} />

        {/* Neasted Routing */}
        <Route path="/nestead/sidenav" element={ <ProtectedRouteAdminPannel><B /></ProtectedRouteAdminPannel> }>
          <Route index element={<B />} />
          <Route path="counters/all/Profiles" element={<Dashboard />} />
          <Route path="counters/Availability" element={<Availability />} />
          <Route path="settingsPannel" element={<MenuItems />} />
        </Route>

        {/* CounterPannel Routes */}
        <Route path='/CounterPannel/MenuItems' element={<ProtectedRouteCounterPannel> <LandingPage /> </ProtectedRouteCounterPannel>} >
          <Route index element={<LandingPage />} />
          <Route path='dashboard' element={<Dashboard1 />} />
          <Route path='menuAvailability' element={<Availability1 />} />
          <Route path='menu' element={<CounterMenuItems />} />
          <Route path="settings" element={<Settings />} />
       </Route>



        {/* User Pannel Routes */}
        <Route path='/userPannel' element={<UserDashboard />} />
        <Route path='/CounterPannel/Login' element={<CounterPanelLogin />} />
        <Route path='/userPannel/QRCode' element={<QrCode />} />
        {/* <Route path='/CounterPannel/MenuItems' element={<Menu />} /> */}

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          marginLeft: window.innerWidth < 600 ? "100px" : "",
          width: window.innerWidth < 600 ? "80%" : "300px",  // Smaller width on mobile
          fontSize: window.innerWidth < 600 ? "12px" : "16px", // Smaller font on mobile
        }} />
    </div>
  )
}

export default App