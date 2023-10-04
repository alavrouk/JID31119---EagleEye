import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import logo from './Logo.png';

function Navbar({ setActivePage }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Project Nightmare Logo" style={{ marginRight: '0px', width: '275px', height: 'auto' }} />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Button color="inherit" onClick={() => setActivePage('airfield_database')}>
            Airfield Database
          </Button>
          <Button color="inherit" onClick={() => setActivePage('traffic_plot')}>
            Traffic Plot
          </Button>
          <Button color="inherit" onClick={() => setActivePage('filedrop')}>
            File Drop
          </Button>
          <Button color="inherit" onClick={() => setActivePage('route_planning')}>
            Route Planning
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
