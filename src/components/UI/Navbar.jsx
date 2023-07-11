import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/constants";

const Navbar = () => {
    const user = false
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{backgroundColor: '#357a38'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Notes Keeper
                    </Typography>
                    <Grid>
                        {user ? (<Button color="inherit" variant={"outlined"}
                                         style={{backgroundColor: '#357a38'}}>Выйти</Button>) : (
                           <NavLink to={LOGIN_ROUTE} <Button color="inherit" variant={"outlined"}
                                    style={{backgroundColor: '#357a38'}}>Login</Button> </NavLink>)}


                    </Grid>

                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default Navbar