import * as React from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckIcon from '@mui/icons-material/Check';

const Footer = ({runCode, runSubmit, disableRun, passedTest}) => {
    return (
        <Box sx={{ width: 800 }}>
        <BottomNavigation
          showLabels
        >
          { disableRun && passedTest < 1?
              <BottomNavigationAction onClick={runSubmit} label="Submit" icon={<CheckIcon/>} /> :
            <BottomNavigationAction onClick={runCode} label="Run" icon={<PlayArrowIcon/>} /> 
          }
        </BottomNavigation>
      </Box>
    );
}

export default Footer;