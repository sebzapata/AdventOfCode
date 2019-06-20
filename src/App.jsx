import React from 'react';
import { NavigationHeader }from './components/navigationHeader'
import { DisplayPanel } from './components/displayPanel'
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <NavigationHeader />
      <DisplayPanel />
    </div>
  );
}

