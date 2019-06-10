import React from 'react';
import { NavigationHeader }from './NavigationHeader'
import { DisplayPanel } from './DisplayPanel'
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <NavigationHeader />
      <DisplayPanel />
    </div>
  );
}

