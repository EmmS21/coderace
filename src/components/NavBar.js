import React, { useState, useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Clock from "./Clock";
import Grid from "@mui/material/Grid";
import Drawer  from "@mui/material/Drawer";
import { styled } from "@mui/material/styles"
import InputLabel from '@mui/material/InputLabel';
import Context from "../context/Context"

const NavBar = ({ selectedLanguage }) => {
    const [open, setOpen] = useState(false);
    const {
        getQuestion, extractExample, getInput, 
        received, title, problemStatement,
        exampleOneInput, exampleOneOutput, currentScore
    } = useContext(Context)

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      }));
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    }; 

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar>
                <Grid container spacing={4}>
                    <Grid item xs>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="opan drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(open && { display: 'none'}) }}
                            >
                                <MenuIcon/>
                            </IconButton>
                            </Toolbar>
                    <Drawer
                        sx={{
                        width:200,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 200,
                            boxSizing: 'border-box',
                        },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                    <Button 
                        onClick={handleDrawerClose}
                        size="medium"
                    >Close
                    </Button>
                        <h5>
                            Title: {title.current}
                        </h5>
                        <p>
                            <strong>
                                Question:
                            </strong>
                            { problemStatement.current }
                        </p>
                        <p>
                            <strong>
                                Example: 
                            </strong>
                            <br></br>
                            Input: <strong>{ exampleOneInput.current }</strong>
                            <br></br>
                            Output: <strong>{ exampleOneOutput.current }</strong> 
                        </p>
                    </Drawer>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6" component="div" sx={{ margin: "ml" }}>
                            Highest Score: 
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 3 }}>
                            Time Remaining: <Clock/>
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Current Score: { currentScore.current }
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar;