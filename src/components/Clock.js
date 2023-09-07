import React, { useContext } from "react";
import Countdown from "react-countdown";
import Context from "../context/Context";
export default function Clock () {
    const { setCompletedModal } = useContext(Context);
    return (
        <Countdown 
            date={Date.now() + 1500000}
            zeroPadDays={1} 
            onComplete={()=> setCompletedModal(true)}
            />
    )
}
