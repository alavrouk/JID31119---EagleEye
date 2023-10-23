import React, { useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';
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
      <Grid item xs={8} style={{ height: '100%' }}> {/* Updated style to give a height to the Grid item */}
        <Card style={{ height: '100%' }}> {/* Updated style to give a height to the Card */}
          <CardHeader title="Route Planning" />
          <CardContent style={{ height: 'calc(100% - 72px)' }}> {/* Updated style to give a height to the CardContent */}
            <MapGL
              {...viewport}
              mapboxAccessToken={"pk.eyJ1IjoiYnl0ZXdvcmQiLCJhIjoiY2xvM2ZoeTYyMXV3ejJzcWg0ZW9kYTIzeiJ9.7w-A4w54wrYZxIlH6KAiNw"}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              onViewportChange={(nextViewport) => setViewport(nextViewport)}
              onClick={onMapClick}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  latitude={marker.latitude}
                  longitude={marker.longitude}
                >
                  <div style={{ color: "#FF5733" }}>•</div>
                </Marker>
              ))}
            </MapGL>
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
