import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const Output = () => {
    const testPassed = true;

    //handle checking the test and seeing if they pass or not
    //maybe add a loading animation while checking the tests
    //style outputs a little bit more probably
  return (
    <div className="output-wrapper">
        <h4>  Output Terminal </h4>
        <p> Output: <pre>  <code> "Bye World"</code> </pre> </p>
        
        {
        testPassed ?
        <p className="passed-text"> <strong>Test passed! <TaskAltIcon/> </strong></p> 
         :  
        <div className="failed-text"> 
            <p className="failed"><strong>Failed Test <ThumbDownOffAltIcon/> </strong></p>
            <p> Expected output:<pre>  <code> "Hello World" </code> </pre> </p>
        </div>
        }

    </div>
  )
}

export default Output