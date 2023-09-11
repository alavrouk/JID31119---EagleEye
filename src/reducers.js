import keplerGlReducer from 'kepler.gl/reducers';

const reducers = combineReducers({
    // mount keplerGl reducer
    keplerGl: keplerGlReducer,
    app: handleActions({
      // empty
    }, initialAppState),
    routing: routerReducer
  });
  