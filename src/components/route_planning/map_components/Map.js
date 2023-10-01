import React from "react";
import { ComposableMap, Geographies, Geography, Line, Marker, ZoomableGroup } from "react-simple-maps";
import { Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers-counties.json";

export default function MapChart() {
  const [startPoint, setStartPoint] = React.useState(null);
  const [endPoint, setEndPoint] = React.useState(null);
  const [markers, setMarkers] = React.useState([]);

  const handleMapClick = (geo) => {
    const coords = geo.geometry.coordinates[0][0];
    
    // Create a new marker
    const newMarker = {
      markerOffset: -15,
      name: `${coords[1].toFixed(2)}, ${coords[0].toFixed(2)}`, // format as "lat, long"
      coordinates: coords
    };
  
    if (!startPoint) {
      setStartPoint(coords);
      setMarkers([newMarker]);
    } else if (!endPoint) {
      setEndPoint(coords);
      setMarkers(prevMarkers => [...prevMarkers, newMarker]);
    } else {
      setStartPoint(coords);
      setEndPoint(null);
      setMarkers([newMarker]);
    }
  };

  return (
      <Grid container spacing={3} style={{ marginTop: '1%' }}>
          {/* Map Card */}
          <Grid item xs={8}> {/* or adjust the grid size as required */}
              <Card>
                  <CardHeader title="Route Planning" />
                  <CardContent>
                    <ComposableMap projection="geoAlbersUsa">
                      <ZoomableGroup>
                          <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                              geographies.map((geo) => (
                                <Geography
                                  key={geo.rsmKey}
                                  geography={geo}
                                  onClick={() => handleMapClick(geo)}
                                  style={{
                                    default: { outline: 'none' },
                                    hover: { outline: 'none' },
                                    pressed: { outline: 'none' },
                                  }}
                                />
                              ))
                            }
                          </Geographies>
                        
                        {startPoint && endPoint && (
                          <Line
                            from={startPoint}
                            to={endPoint}
                            stroke="#FF5733"
                            strokeWidth={2}
                          />
                        )}

                        {markers.map((marker, index) => (
                          <Marker key={index} coordinates={marker.coordinates}>
                            <circle r={6} fill="#FF5733" />
                            <text
                              textAnchor="middle"
                              y={marker.markerOffset}
                              style={{
                                fontFamily: "system-ui",
                                fill: "#5D5A6D",
                                fontSize: "10px"
                              }}
                            >
                              {marker.name}
                            </text>
                          </Marker>
                        ))}            
                    </ZoomableGroup>
                    </ComposableMap>
                </CardContent>
            </Card>
        </Grid>

        {/* Table Card */}
        <Grid item xs={4}> {/* or adjust the grid size as required */}
            <Card>
                <CardHeader title="Start & End Points" />
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Point Type</TableCell>
                                <TableCell>Latitude</TableCell>
                                <TableCell>Longitude</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {startPoint && (
                                <TableRow>
                                    <TableCell>Start Point</TableCell>
                                    <TableCell>{startPoint[1].toFixed(2)}</TableCell>
                                    <TableCell>{startPoint[0].toFixed(2)}</TableCell>
                                </TableRow>
                            )}
                            {endPoint && (
                                <TableRow>
                                    <TableCell>End Point</TableCell>
                                    <TableCell>{endPoint[1].toFixed(2)}</TableCell>
                                    <TableCell>{endPoint[0].toFixed(2)}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
);
}