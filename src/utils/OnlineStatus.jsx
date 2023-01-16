import React from 'react'
import useNavigatorOnline from "use-navigator-online";

function useOnlineAlerter(ref,setRef,initialValue=false) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleCheckOnline(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!");
          setRef(initialValue);
        }
      }
      // Bind the event listener
      document.addEventListener("onLine", handleCheckOnline);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("onLine", handleCheckOnline);
      };
    }, [ref]);
  }

const OnlineStatus = () => {
  
    return (
    <div>OnlineStatus</div>
    
  )
}

export default OnlineStatus



  
  /**
   * Component that alerts if you click outside of it
   */
//   export default function OutsideAlerter(props) {
//     const wrapperRef = useRef(null);
//     useOutsideAlerter(wrapperRef,props.setCondition,props.initialValue);
    
//     return props.condition&&<div ref={wrapperRef}>{props.children}</div>;}