import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

function timeOut(condition, timeDelay = 5000, setNavigate, changeSuccess, changeCondition) {
    const dispatch = useDispatch();
    const mostrarMensaje = () => {
        dispatch(changeSuccess(true));
        dispatch(changeCondition(false));
        // if (setNavigate != null)
        //     setNavigate(true);
    }

    useEffect(() => {
        if (condition === true) {
            const timer = setTimeout(() => mostrarMensaje(), timeDelay);
            return () => clearTimeout(timer);
        }
    }, [condition]);
}

const SetTimeOut=({ condition,  timeDelay, setNavigate = null, changeSuccess, changeCondition, children }) =>{
    timeOut(condition,timeDelay, setNavigate, changeSuccess,changeCondition);

    return (condition && <>{ children }</>);
}
export default SetTimeOut;