import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, Box, IconButton, ButtonBase } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ReceiptIcon from '@mui/icons-material/Receipt'; 

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (page) => {
    console.log(`Navigate to ${page}`);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#424242' }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#ccc' }}>
          Riversys
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mr: 10 }}>
          <ButtonBase onClick={() => handleNavigation('purchase-order')} sx={{ display: 'flex', alignItems: 'center', color: '#ccc' }}>
            <DescriptionIcon sx={{ mr: 0.5 }} />
            <Typography variant="body1">
              Purchase Order
            </Typography>
          </ButtonBase>
          <ButtonBase onClick={() => handleNavigation('dashboard')} sx={{ display: 'flex', alignItems: 'center', color: '#ccc' }}>
            <DashboardIcon sx={{ mr: 0.5 }} />
            <Typography variant="body1">
              Dashboard
            </Typography>
          </ButtonBase>
          <ButtonBase onClick={() => handleNavigation('reports')} sx={{ display: 'flex', alignItems: 'center', color: '#ccc' }}>
            <DescriptionIcon sx={{ mr: 0.5 }} />
            <Typography variant="body1">
              Reports
            </Typography>
          </ButtonBase>
          <ButtonBase onClick={() => handleNavigation('rfq')} sx={{ display: 'flex', alignItems: 'center', color: '#ccc' }}>
            <ListAltIcon sx={{ mr: 0.5 }} />
            <Typography variant="body1">
              RFQ
            </Typography>
          </ButtonBase>
          <ButtonBase onClick={() => handleNavigation('invoice')} sx={{ display: 'flex', alignItems: 'center', color: '#ccc' }}>
            <ReceiptIcon sx={{ mr: 0.5 }} />
            <Typography variant="body1">
              Invoice
            </Typography>
          </ButtonBase>
        </Box>
        <Avatar
          sx={{
            bgcolor: 'white',
            color: 'black',  
            ml: 2,
            cursor: 'pointer'
          }}
          onClick={handleClick}
        >
          AV
        </Avatar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ mt: '10px' }} 
        >
          <MenuItem onClick={handleClose}>View Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;


