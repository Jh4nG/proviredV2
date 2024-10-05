import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

function useTimeOutSession() {
    const [state, setState] = useState(false)
    const [count, setCount] = useState(0);
    const [remaining, setRemaining] = useState(0)
    
    const onIdle = () => {
        setState(true)
    }
    
    const onActive = () => {
        setState(false)
    }
    
    const onAction = () => {
        setCount(count + 1)
    }
    
    const { getRemainingTime } = useIdleTimer({
        onIdle,
        onActive,
        onAction,
        timeout: 300_000,
        // timeout: 10_000,
        throttle: 500,
        crossTab: true,
    })

    useEffect(() => {        
        const interval = setInterval(() => {
          setRemaining(Math.ceil(getRemainingTime() / 1000))
        }, 500)
    
        return () => {
          clearInterval(interval)
        }
    })

    return {state}
}
    

export default useTimeOutSession;