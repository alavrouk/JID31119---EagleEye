import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Navbar({ setActivePage }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Project Nightmare
        </Typography>
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
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;