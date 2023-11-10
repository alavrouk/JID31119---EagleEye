import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AirfieldDB from './components/airfield_database/AirfieldDB';
import TrafficPlot from './components/traffic_plot/TrafficPlot';
import FileDrop from './components/filedrop/FileDrop';
import RoutePlanning from './components/route_planning/RoutePlanning';

function App() {
  const [activePage, setActivePage] = useState('home');

  const renderContent = () => {
    switch (activePage) {
      case 'airfield_database':
        return <AirfieldDB />;
      case 'traffic_plot':
        return <TrafficPlot />;
      case 'filedrop':
        return <FileDrop />;
      case 'route_planning':
        return <RoutePlanning />;
      default:
        return <AirfieldDB />;
    }
  };

  return (
    <div>
      <Navbar setActivePage={setActivePage} />
      {renderContent()}
    </div>
  );
}

export default App;
