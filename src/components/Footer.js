import * as React from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckIcon from '@mui/icons-material/Check';

const Footer = ({runCode}) => {
    return (
        <Box sx={{ width: 800 }}>
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction onClick={runCode} label="Run" icon={<PlayArrowIcon/>} />
          <BottomNavigationAction label="Submit" icon={<CheckIcon/>} />
        </BottomNavigation>
      </Box>
    );
}

export default Footer;