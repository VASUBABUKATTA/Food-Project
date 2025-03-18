import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

const ProtectedRouteCounterPannel = ({ children }) => {
  const isAuthenticated = Cookies.get('LoginUserCounter'); 
//   console.log(isAuthenticated);
  return isAuthenticated === undefined || isAuthenticated == null ? (
    <Navigate to="/CounterPannel/Login" replace /> 
  ) : (
    children 
  );
};
export default ProtectedRouteCounterPannel;
