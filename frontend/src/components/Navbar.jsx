// Navbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import eTAPLogo from '../assets/etap.png';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useUser } from '../contexts/UserContext';

import { useNavigate } from 'react-router-dom';

const Navbar = ({ handleDrawerToggle, title }) => {
    const { userInfo } = useUser();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        console.log("Logged out");
    };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'rgb(0, 176, 185)', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 6 }}
        >
          <MenuIcon />
        </IconButton>
        <img src={eTAPLogo} alt="Logo" style={{ height: '40px', marginRight: '40px' }} />
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'white', marginLeft: '30px' }}
          onClick={() => navigate('/board')} 
        >
          {title}
        </Typography>
        <Button 
          color="inherit"
        //   aria-label="account of current user"
        //   aria-controls="menu-appbar"
        //   aria-haspopup="true"
          sx={{ textTransform: 'none' }}
          onClick={handleMenu}>
            <AccountCircle sx={{ marginRight: '10px' }}/>
            {userInfo.user_name}
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
