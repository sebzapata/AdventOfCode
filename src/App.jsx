import React from 'react';
import { NavigationHeader }from './components/NavigationHeader'
import { DisplayPanel } from './components/DisplayPanel'
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <NavigationHeader />
      <DisplayPanel />
    </div>
  );
}

