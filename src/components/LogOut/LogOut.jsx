import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn, logOut } from './../../utils/UtilsAuth';
import { logOutSession } from './../../redux/actions/userActions';
import { getauth, logout, updateAuth, updateLoading } from './../../redux/reducers/userSlice';
import ResetAllReducers from '../../services/ResetAllReducers';
//import { useAuth } from "../hooks/Auth";

//({children})
const LogOut = ({ children }) => {
  const navigate = useNavigate();
  //let { user } = isLoggedIn();
  const { loading } = useSelector(state => state.usuarios);
  //const usuarios = useSelector(state => state.usuarios);
  const auth = useSelector(getauth);
  // console.log("auth logout");
  // console.log(auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLogOut, setIsLogOut] = useState(false);
  // const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (auth === true) {
      dispatch(logOutSession());
      sessionStorage.clear();
      logOut();
      //window.location.reload();
      //navigate(`/login`);
    }
    return setIsLogOut(true)
  }, []);
//hubo un problema con el deslogueo debido a que los datos guardados en el session storage se guardan
//en formato string y es necesarios hacer el json parse para que detecte el tipo, boolean, number, etc

  return isLogOut && <><ResetAllReducers/><Navigate to="/login" state={{ from: location }} replace /></>;
  //return !auth && isAuth && <Navigate to="/login" state={{ from: location }} replace />;
  //return <></>
}

export default LogOut;