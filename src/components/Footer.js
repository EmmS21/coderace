import * as React from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckIcon from '@mui/icons-material/Check';
import Context from "../context/Context";


const Footer = ({runCode, runSubmit }) => {
  const { passedTest } = React.useContext(Context)
  console.log('passedTest is now', passedTest.current)
    return (
        <Box sx={{ width: 500, height: '10%' }}>
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction onClick={ passedTest.current > 0 ? runSubmit : runCode } label= {  passedTest.current > 0 ? "Submit" : "Run"  } icon={ passedTest.current > 0 ? <CheckIcon/> : <PlayArrowIcon/> } /> :
        </BottomNavigation>
      </Box>
    );
}

export default Footer;