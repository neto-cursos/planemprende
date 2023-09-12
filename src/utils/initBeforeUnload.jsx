export function initBeforeUnload(){
    useEffect(()=>{
        window.addEventListener("beforeunload", handleBeforeUnload);
        return ()=>{
            window.removeEventListener("beforeunload", handleBeforeUnload);
        }
    },[])
    return true;
}

function handleBeforeUnload(e) {
  const now = Date.now();
  if (lastUpdated && (now - lastUpdated) >= 0.5 * 60 * 1000) {
    e.preventDefault();
    e.returnValue = '';
  }
}