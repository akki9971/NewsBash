import React, { Component } from 'react';
import { MenuList, MenuItemsStyle } from '../Constants'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { Dashboard } from '@mui/icons-material';


export class NavBar extends Component {
    // constructor() {
    //     super();
    //     console.log('constructor');
    // }
    render() {
        
        return (
            <>
                <div className="app">
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                                <Dashboard sx={{pr:1}} />NewsBash
                            </IconButton>
                            <Box flexGrow={1} />
                            {MenuList?.map((Menu) => {
                                return <Link to={`/${Menu === 'general' ? '' : Menu}`} style={MenuItemsStyle} >{Menu === 'general' ? 'all' : Menu}</Link>
                            })
                            }
                            {/* <IconButton size="large" edge ="end" color="inherit" >
                        <MenuIcon />
                    </IconButton> */}
                        </Toolbar>
                    </AppBar>
                </div>
            </>
        )
}
}

export default NavBar
