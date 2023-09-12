import React from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers-counties.json"

export default function MapChart() {
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  )
}

