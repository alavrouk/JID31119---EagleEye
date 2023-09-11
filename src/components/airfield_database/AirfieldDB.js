import React, { useState } from 'react';
import { Container, Box, Typography, FormControl, Select, MenuItem, Paper } from '@mui/material';


function AirfieldDB() {
    const [selectedAirfield, setSelectedAirfield] = useState(null);

    const airfields = [
        { id: 'A', name: "Airfield A", info: "This is airfield A." },
        { id: 'B', name: "Airfield B", info: "This is airfield B." },
        { id: 'C', name: "Airfield C", info: "This is airfield C." },
        { id: 'D', name: "Airfield D", info: "This is airfield D." },
        { id: 'E', name: "Airfield E", info: "This is airfield E." },
    ];

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
              <Select defaultValue="" onChange={handleDropdownChange}>
                <MenuItem value="" disabled>
                  Select an Airfield
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
                <Typography variant="h6">You have selected: {selectedAirfield.name}</Typography>
                <Typography variant="body1">Information: {selectedAirfield.info}</Typography>
              </Paper>
            )}
          </Box>
        </Container>
      );
}

export default AirfieldDB;