import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

const ProtectedRouteAdminPannel = ({ children }) => {
  const isAuthenticated = Cookies.get('LoginUser'); 
//   console.log(isAuthenticated);
  return isAuthenticated === undefined || isAuthenticated == null ? (
    <Navigate to="/" replace /> 
  ) : (
    children 
  );
};
export default ProtectedRouteAdminPannel;
