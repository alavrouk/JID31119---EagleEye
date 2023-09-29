import React from "react";
import { ComposableMap, Geographies, Geography, Line } from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers-counties.json";

export default function MapChart() {
  const [startPoint, setStartPoint] = React.useState(null);
  const [endPoint, setEndPoint] = React.useState(null);

  const handleMapClick = (geo) => {
    const coords = geo.geometry.coordinates[0][0];  // Get the first coordinate of the geography
    if (!startPoint) {
      setStartPoint(coords);
    } else if (!endPoint) {
      setEndPoint(coords);
    } else {
      setStartPoint(coords);
      setEndPoint(null);
    }
  };

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onClick={() => handleMapClick(geo)}
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
    </ComposableMap>
  );
}