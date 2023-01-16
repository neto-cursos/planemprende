import { useEffect, useRef } from 'react'

export default function SetTimeOut({children, delay}) {
//   const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
//   useEffect(() => {
//     savedCallback.current = callback
//   }, [callback])

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return
    }

    // const id = setTimeout(() => savedCallback.current(), delay)
    const id = setTimeout(() => children, delay)
    return () => clearTimeout(id)
  }, [delay])
}