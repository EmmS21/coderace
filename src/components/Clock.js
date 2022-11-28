import React, { useContext } from "react";
import Countdown from "react-countdown";
import Context from "../context/Context";
// 1500000
// 10000
export default function Clock ({setIsComplete}) {
    const { setCompletedModal } = useContext(Context);
    return (
        <Countdown 
            date={Date.now() + 1500000}
            zeroPadDays={1} 
            onComplete={()=> setCompletedModal(true)}
            />
    )
}
