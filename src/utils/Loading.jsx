import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function timeOut(success,setSuccess,timeDelay=5000,setNavigate,changeSuccess) {
    const dispatch=useDispatch();
    const mostrarMensaje = () => {
        dispatch(changeSuccess(false));
        setNavigate(true);
      }
    
    useEffect(() => {
    if (success === true) {
        setShowSuccessMsg(true);
        const timer = setTimeout(() => mostrarMensaje(), timeDelay);
        return () => clearTimeout(timer);
      }
  }, [success]);
}


export default function Loading({condition,success,setSuccess,timeDelay,setNavigate,changeSuccess,children}) {
  timeOut(success,setSuccess,timeDelay,setNavigate,changeSuccess);
  return condition&&{children}
}