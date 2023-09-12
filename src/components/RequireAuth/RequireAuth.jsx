import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from "react-router-dom";
import { isLoggedIn } from './../../utils/UtilsAuth';
//import { useAuth } from "../hooks/Auth";

const RequireAuth = ({ children }) => {
  //let { user } = isLoggedIn();
  let user = isLoggedIn();
  let location = useLocation();
  const {auth}=useSelector(state=>state.usuarios);
  if (!user&&!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }   
}

export default RequireAuth;
