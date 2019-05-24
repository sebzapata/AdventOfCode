import React from "react";
import { Route } from 'react-router'
import {Day1} from "./challenges/day1";

export const DisplayPanel = () => {
  return (
    <div className="dynamic">
      <Route
        exact
        path="/"
      />
      <Route
        exact
        path="/day1"
        render={(props) => <Day1/>}
      />
    </div>
  )
};
