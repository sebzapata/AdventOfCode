import React from "react";
import { Route } from 'react-router'
import {Day1} from "./challenges/day1";
import {Day2} from "./challenges/day2";

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
        render={() => <Day1/>}
      />
      <Route
        exact
        path="/day2"
        render={() => <Day2/>}
      />
    </div>
  )
};
