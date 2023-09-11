import { KeplerGl } from 'kepler.gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

const config = {
    version: 'v1',
    config: {
      visState: {
        layers: [],
      },
      mapStyle: {
        styleType: 'light',
        topLayerGroups: {},
        visibleLayerGroups: {},
      },
    },
  };

  function KeplerMap() {
    return (
        <div style={{position: 'absolute', width: '100%', height: '100%'}}>
          <AutoSizer>
            {({height, width}) => (
              <KeplerGl
                mapboxApiAccessToken="pk.eyJ1IjoiYWxhdnJvdWsiLCJhIjoiY2xtZjdqdDRkMGc0ajNmcGZlYTd6cDF6NiJ9.XdgEuZm9wrY8Y37jDwOOyQ"
                id="map"
                width={width}
                height={height}
              />
            )}
          </AutoSizer>
        </div>
      );
  }

  export default KeplerMap;
