import React from "react";
import Countdown from "react-countdown";

const Clock = () => {
    return (
        <Countdown 
            date={Date.now() + 1500000}
            zeroPadDays={1} 
            onComplete={()=> console.log('we will update state to trigger modal')}
            />
    )
}

export default Clock;