import React, { useState } from 'react';
import { Container, Box, Typography, FormControl, Select, MenuItem, Paper } from '@mui/material';
import airfields from './airfields.json';


function AirfieldDB() {
  // Initialize with Airfield A as the default selected airfield
  const defaultAirfield = airfields.find(airfield => airfield.name === "Airfield A") || null;
  const [selectedAirfield, setSelectedAirfield] = useState(defaultAirfield);

  const handleDropdownChange = (e) => {
    const selectedId = e.target.value;
    const selected = airfields.find(airfield => airfield.id === selectedId);
    setSelectedAirfield(selected);
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Airfield Database
        </Typography>

        <FormControl variant="outlined">
          {/* Set the Select's value to the ID of the selectedAirfield */}
          <Select value={selectedAirfield ? selectedAirfield.id : ""} onChange={handleDropdownChange}>
            <MenuItem value="" disabled>
              Select your database
            </MenuItem>
            {airfields.map((airfield, index) => (
              <MenuItem key={index} value={airfield.id}>
                {airfield.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedAirfield && (
          <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
            <Typography variant="h6">Base: {selectedAirfield.name}</Typography>
            <Typography variant="body1">FAA Identifier: {selectedAirfield.iden}</Typography>
            <Typography variant="body1">Time Zone: {selectedAirfield.tzone}</Typography>
            <Typography variant="body1">Location: {selectedAirfield.location}</Typography>
            <Typography variant="body1">Corrdinates (Lat/Long): {selectedAirfield.cor}</Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default AirfieldDB;