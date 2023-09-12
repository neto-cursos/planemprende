import React, { useState, useEffect } from "react";


const CtrlTime = ({functionSave}) => {
    // const [data, setData] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(
        localStorage.getItem("lastUpdated") || Date.now()
    );
    
    // const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            functionSave();
            setLastUpdated(new Date().toISOString());
        }, 60000);
        
        return () => {
            clearInterval(interval);
            
        };
    }, [lastUpdated]);
    
    useEffect(()=>{
        window.addEventListener("beforeunload", handleBeforeUnload);
        return ()=>{
            window.removeEventListener("beforeunload", handleBeforeUnload);
        }
    },[]);
    
    function handleBeforeUnload(e) {
        const now = Date.now();        
      if (lastUpdated && (now - lastUpdated) >= 0.5 * 60 * 1000) {
        console.log("yay");
        e.preventDefault();
        e.returnValue = '';
      }
        // e.preventDefault();
        // // setShowModal(true);
        // e.returnValue = 'Estás seguro? aún no grabaste tu canvas';
        // console.log("no before unload");
        // if (lastUpdated) {
        //     e.preventDefault();
        //     setShowModal(true);
        // }
    }

    // function handleManualUpdate() {
    //     setData(/* call API to get updated data */);
    //     setLastUpdated(new Date().toISOString());
    //     localStorage.setItem("lastUpdated", new Date().toISOString());
    // }

    // function handleModalUpdate() {
    //     handleManualUpdate();
    //     setShowModal(false);
    // }

    // function handleModalCancel() {
    //     setShowModal(false);
    // }
    return (
        <p className="text-sm text-gray-500 mt-2">
            último guardado:{" "}
            {lastUpdated ? new Date(lastUpdated).toLocaleString() : "never"}
        </p>
    );
}

export default CtrlTime