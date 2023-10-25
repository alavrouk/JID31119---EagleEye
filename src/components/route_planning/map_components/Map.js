import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import { Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export default function MapChart() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 37.8,
    longitude: -122.4,
    zoom: 8
  });

  const [markers, setMarkers] = useState([]);

  const onMapClick = (event) => {
    const newMarker = {
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
      name: `${event.lngLat[1].toFixed(2)}, ${event.lngLat[0].toFixed(2)}`
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };
  


  return (
    <Grid container spacing={3} style={{ marginTop: '1%', height: 'calc(100vh - 64px)' }}> {/* Updated style to give a height to the Grid container */}
      {/* Map Card */}
      <Grid item xs={8} style={{ height: '100%' }}>
        <Card style={{ height: '100%' }}>
          <CardHeader title="Route Planning" />
          <CardContent style={{ height: 'calc(100% - 72px)' }}>
          <Map
            //parameterize!!!!!!!! should not be in cleartext
            mapboxAccessToken="pk.eyJ1IjoiYnl0ZXdvcmQiLCJhIjoiY2xvM2ZoeTYyMXV3ejJzcWg0ZW9kYTIzeiJ9.7w-A4w54wrYZxIlH6KAiNw"
            initialViewState={{
              longitude: -122.4,
              latitude: 37.8,
              zoom: 14
            }}
            style={{width: 1750, height: 1000}}
            mapStyle="mapbox://styles/mapbox/dark-v11"
          />
          </CardContent>
        </Card>
      </Grid>

      {/* Table Card */}
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
                </TableRow>
              </TableHead>
              <TableBody>
                {markers.map((marker, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{marker.latitude.toFixed(2)}</TableCell>
                    <TableCell>{marker.longitude.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
