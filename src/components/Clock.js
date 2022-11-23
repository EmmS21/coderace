import React from "react";
import Countdown from "react-countdown";

const Clock = ({setIsComplete}) => {
    return (
        <Countdown 
            date={Date.now() + 1500000}
            zeroPadDays={1} 
            onComplete={()=> setIsComplete(true)}
            />
    )
}

export default Clock;