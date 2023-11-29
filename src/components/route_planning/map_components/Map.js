import React, { useState, useEffect } from 'react';
import Map, { Marker, Source, Popup, Layer } from 'react-map-gl';
import { Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, CardActions } from '@mui/material';
import arrowhead from './arrowhead.png'

export default function MapChart() {
  const [markers, setMarkers] = useState([
    { latitude: 38.7965, longitude: -76.8836, name: 'Joint Base Andrews' },
    { latitude: 29.5263, longitude: -98.2776, name: 'Randolph Air Force Base' },
    { latitude: 37.0835, longitude: -76.3592, name: 'Joint Base Langley Eustis' },
    { latitude: 30.4636, longitude: -86.5533, name: 'Eglin Air Force Base' },
    { latitude: 36.2406, longitude: -115.0543, name: 'Nellis Air Force Base' },
    // Add more markers as needed
  ]);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [supplies, setSupplies] = useState({});
  const [arrows, setArrows] = useState([]);

  const getPointOnLine = (start, end, fraction) => {
    return {
      latitude: start.latitude + (end.latitude - start.latitude) * fraction,
      longitude: start.longitude + (end.longitude - start.longitude) * fraction
    };
  };

  // Function to add an arrow between two waypoints
  const addArrow = (startWaypoint, endWaypoint, number) => {
    // Calculate the midpoint for placing the number
    const midLatitude = (startWaypoint.latitude + endWaypoint.latitude) / 2;
    const midLongitude = (startWaypoint.longitude + endWaypoint.longitude) / 2;

    const angle = calculateAngle(startWaypoint, endWaypoint);

    // Calculate a point along the line for the arrowhead
    // For example, 0.9 will place it at 90% of the way from start to end
    const arrowPosition = getPointOnLine(startWaypoint, endWaypoint, 0.995);
  
    // Define a new arrow object including the arrow position
    const newArrow = {
      start: startWaypoint,
      end: endWaypoint,
      number: number,
      midPoint: { latitude: midLatitude, longitude: midLongitude },
      arrowPoint: arrowPosition,
      angle: angle
    };
  
    // Add the new arrow to the state
    setArrows(prevArrows => [...prevArrows, newArrow]);
};

const calculateAngle = (start, end) => {
  const dy = end.latitude - start.latitude;
  const dx = end.longitude - start.longitude;
  const theta = Math.atan2(dy, dx); // range (-PI, PI]
  return (theta * 180 / Math.PI)  - 45; // Convert to degrees
};

  const fetchData = async () => {
    const response = await fetch('http://localhost:8000/api/linearprogramming');
    const data = await response.json();
    setApiData(data);
  };

  const handleSupplyChange = (name, value) => {
    setSupplies(prevSupplies => ({
      ...prevSupplies,
      [name]: value
    }));
  };

  const handleApiCall = async () => {
    const payload = {
      supplies: supplies,
      // ... any other data you need to send
    };
    console.log(supplies)
    try {
      const response = await fetch('http://localhost:8000/api/linearprogramming', {
        method: 'POST', // or 'GET', depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data) {
        // Assuming the API response has waypoints and a number
        const nums = data["Solution Vector (First 10 Elements)"]
        console.log(nums)
        for (let i = 0; i < nums.length; i++) {
          if (nums[i] !== 0) {
            console.log("cum")
            addArrow(markers[Math.floor(i/5)], markers[i%5], nums[i])
          }
        }
      }
      console.log(data)
      // Handle response data
    } catch (error) {
      // Handle error
      console.error('Error making API call:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container spacing={3} style={{ marginTop: '1%', height: 'calc(100vh - 64px)' }}>
      {/* Map Grid Item */}
      <Grid item xs={8} style={{ height: '100%' }}>
        <Card style={{ height: '100%' }}>
          <CardHeader title="Route Planning" />
          <CardContent style={{ height: 'calc(100% - 72px)' }}>
            <Map
              mapboxAccessToken="pk.eyJ1IjoiYnl0ZXdvcmQiLCJhIjoiY2xvM2ZoeTYyMXV3ejJzcWg0ZW9kYTIzeiJ9.7w-A4w54wrYZxIlH6KAiNw"
              initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/dark-v11"
            >
              {arrows.map((arrow, index) => (
                <>
                  <Source
                    id={`arrow-line-${index}`}
                    type="geojson"
                    data={{
                      type: 'Feature',
                      properties: {},
                      geometry: {
                        type: 'LineString',
                        coordinates: [
                          [arrow.start.longitude, arrow.start.latitude],
                          [arrow.end.longitude, arrow.end.latitude]
                        ]
                      }
                    }}
                  />
                  <Layer
                    id={`arrow-line-layer-${index}`}
                    type="line"
                    source={`arrow-line-${index}`}
                    layout={{
                      'line-cap': 'round',
                      'line-join': 'round'
                    }}
                    paint={{
                      'line-color': 'white', // Line color
                      'line-width': 3 // Line width
                    }}
                  />
                  <Marker
                    longitude={arrow.midPoint.longitude}
                    latitude={arrow.midPoint.latitude}
                    offsetLeft={0} // Adjust as needed
                    offsetTop={0} // Adjust as needed
                  >
                  <div style={{ color: 'red', fontSize: '23px' }}>
                    {arrow.number}
                  </div>
                </Marker>
                <Marker
                  longitude={arrow.arrowPoint.longitude }
                  latitude={arrow.arrowPoint.latitude }
                  offsetLeft={100} // Adjust based on the size of the arrowhead icon
                  offsetTop={100}
                >
                  <div style={{ transform: `rotate(${arrow.angle}deg)`, zIndex: 1 }}>
                    <img src={arrowhead} alt="arrowhead" />
                  </div>
                </Marker>
                  {/* Add more layers or elements for arrowheads and numbers */}
                </>
              ))}
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  longitude={marker.longitude}
                  latitude={marker.latitude}
                >
                  <div
                    onMouseEnter={() => setHoveredMarker(marker)}
                    onMouseLeave={() => setHoveredMarker(null)}
                    style={{ zIndex: 2, cursor: 'pointer', fontSize: '24px' }}
                  >
                    📍
                    {hoveredMarker && hoveredMarker.name === marker.name && (
                      <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'white',
                        padding: '5px',
                        borderRadius: '5px',
                        boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
                        whiteSpace: 'nowrap',
                        zIndex: 2
                      }}>
                        {marker.name}
                      </div>
                    )}
                  </div>
                </Marker>
              ))}
            </Map>
          </CardContent>
        </Card>
      </Grid>
  
      {/* Table Card Grid Item */}
      <Grid item xs={4}>
        <Card>
          <CardHeader title="Markers" />
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Marker</TableCell>
                  <TableCell>Latitude</TableCell>
                  <TableCell>Longitude</TableCell>
                  <TableCell>Supply</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {markers.map((marker, index) => (
                  <TableRow key={index}>
                    <TableCell>{marker.name}</TableCell>
                    <TableCell>{marker.latitude.toFixed(2)}</TableCell>
                    <TableCell>{marker.longitude.toFixed(2)}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={supplies[marker.name] || ''}
                        onChange={(e) => handleSupplyChange(marker.name, e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardActions>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleApiCall}
              style={{ margin: '0 auto', display: 'block' }} // Center the button
            >
              Submit Supplies
            </Button>
          </CardActions>
        </Card>
      </Grid>

      {/* {apiData && (
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Linear Programming Results" />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(apiData).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{Array.isArray(value) ? value.join(', ') : value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      )} */}
    </Grid>
  );
}
