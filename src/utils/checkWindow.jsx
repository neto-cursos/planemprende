import React, { useRef, useEffect } from "react";
export function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

// function checkWindowSize(ref,setRef) {
//     React.useEffect(() => {
//         function handleWindowResize() {
//             setWindowSize(getWindowSize());
//         }
//         window.addEventListener('resize', handleWindowResize);
//         return () => {
//             window.removeEventListener('resize', handleWindowResize);
//         };
//     }, []);
//   }
  