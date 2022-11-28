import React, { useContext } from 'react'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Context from "../context/Context";


export default function Output () {
    const testPassed = true;
    const { resp, expectedOutput } = useContext(Context);

    //handle checking the test and seeing if they pass or not
    //maybe add a loading animation while checking the tests
    //style outputs a little bit more probably
  return (
    <div className="output-wrapper">
        <h4>Output Terminal</h4>
        <p> Output: <pre>  <code> { resp.current } </code> </pre> </p>
        
        {
        testPassed ?
        <p className="passed-text"> <strong> { expectedOutput.current  }  </strong></p> 
         :  
        <div className="failed-text"> 
            <p className="failed"><strong>Failed Test <ThumbDownOffAltIcon/> </strong></p>
            <p> Expected output:<pre>  <code> "Hello World" </code> </pre> </p>
        </div>
        }

    </div>
  )
}

