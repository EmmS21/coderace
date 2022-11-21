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

const NavBar = ({ selectedLanguage, setCurrLang }) => {
    const [open, setOpen] = useState(false);
    const {
        getQuestion, extractExample, getInput, 
        received, title, example, 
        problemStatement
    } = useContext(Context)
    // let title = getQuestion?.current[0].title;
    // let example =  getQuestion?.current[0].Example2.slice(3);
    // const problemStatement = getQuestion?.current[0].place;

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

    const languageMap = {
        70: "python",
        63: "javascript",
        62: "java"
    }

    const changeLanguageHandler = (e) => {
        selectedLanguage.current = e.target.value
        setCurrLang(languageMap[selectedLanguage.current])
    }

    // function extractExample(challenge) {
    //     const constraintsIdx = challenge.indexOf("Constraints")
    //     const cleanExample = challenge.slice(0,constraintsIdx)
    //     const exampleArr = cleanExample.slice(3).split(/\S+(?=: )/g) 
    //     exampleArr.shift()
    //     return exampleArr[0]
    // }

    // function getInput(exampleInput){
    //     const input = exampleInput.match(/= (.+)/)[1]
    //     return input
    // }

    // console.log('example', getInput(extractExample(example)))

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
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                        </IconButton>
                    </DrawerHeader>
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
                            { example.current }
                        </p>
                    </Drawer>
                    </Grid>
                    <Grid item xs>
                        <InputLabel id="demo-simple-select-label">
                            Select Language
                        </InputLabel>
                        <select
                            aria-label="Default select example"
                            onChange={changeLanguageHandler}
                        >   
                            <option selected>Select Language</option>
                            <option value="63">Javascript</option>
                            <option value="70">Python</option>
                            <option value="62">Java</option>
                        </select>
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
                            Current Score: 
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar;