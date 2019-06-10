import React from "react";
import {Day1} from "./challenges/day1";
import {Day2} from "./challenges/day2";
import {store} from "./redux";

export const DisplayPanel = () => {

  const getComponent = () => {
    const state = store.getState();
    return state.component;
  };

  const renderOutput = (component) => {
    return (
      <div className="dynamic">
        {component}
      </div>
    )
  };
  
  switch (window.location.pathname) {
    case "/": {
      return (
        renderOutput()
      )
    }

    case "/day1": {
      return (
        renderOutput(<Day1/>)
      )
    }

    case "/day2": {
      return (
        renderOutput(<Day2/>)
      )
    }

    default:
      return (
        renderOutput()
      )
  }
};
