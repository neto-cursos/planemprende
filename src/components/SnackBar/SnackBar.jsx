import React from 'react'

const SnackBar = ({ children, state, setCondition, condition, message, colorbg = 'bg-red-500', colortext = 'text-whitish', customTimeOut = 2000 }) => {

  console.log(children);
  const [snackBar, setSnackBar] = React.useState(state);
  
  const snackbarClose = () => {
    setCondition(false);
    setSnackBar(false);
  }
  React.useLayoutEffect(()=>{
    setCondition(true);
  },[])
  React.useEffect(() => {
    if (snackBar) {
      const timeout = setTimeout(() => snackbarClose(), customTimeOut);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [snackBar]);
  React.useEffect(() => {
    if (condition == false)
      console.log("condition invoked")
  }, [condition])

  return (
    // {children}
    snackBar && condition && <>{children}</>
    // <div className="flex justify-center text-center p-5 rounded-lg shadow bg-white" style={{ boxShadow: "0 0 0 max(100vh, 100vw) rgba(0, 0, 0, .3)" }}>

    //   </div>
    //     <div className={`rounded-md ${colorbg} ${colortext} fixed right-2 bottom-1 font-medium p-2 md:p-5`}>
    //   {"message"}
    // </div>
  )
}
export default SnackBar;