import React, { useState, useEffect } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import { Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export default function MapChart() {
  const [markers] = useState([]);
  const [apiData, setApiData] = useState(0);
  const route = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [ 
        [-76.94776058821482, 38.975938932582004],
        [-80.88550077836578, 35.32765326022499],
        [-84.37884259420754, 33.75983997431495],
        [-95.44272103812588, 29.920348864226984],
        [-99.60395629376201, 19.60640752015661]
      ]
    }
  };

  const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/linearprogramming');
      const data = await response.json();
      setApiData(data); // Update the state with the fetched data
  };
  
  
  useEffect(() => {
    fetchData();
  }, []);

  
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
          >
            <Source type="geojson" data={route}>
              <Layer
                type="line"
                layout={{ "line-join": "round", "line-cap": "round" }}
                paint={{ "line-color": "yellow", "line-width": 1.5 }}
              />
            </Source>
          </Map>
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

      {/* New Grid item for displaying the API data */}
      {apiData && (
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
      )}
    </Grid>
  );
}
