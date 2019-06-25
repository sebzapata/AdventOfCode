import React from "react";
import {Day1} from "../challenges/day1";
import {Day2} from "../challenges/day2";
import {store} from "../redux";
import {Day3} from "../challenges/day3";
import {Canvas} from "../challenges/canvas";

export const DisplayPanel = () => {

  const getComponent = () => {
    const state = store.getState();
    return state.component;
  };

  const renderOutput = (component: React.ReactNode) => {
    return (
      <div className="dynamic">
        {component}
      </div>
    )
  };
  
  switch (window.location.pathname) {
    case "/": {
      return (
        renderOutput(null)
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

    case "/day3": {
      return (
        renderOutput(<Day3/>)
      )
    }
    case "/canvas": {
      return (
        renderOutput(<Canvas/>)
      )
    }

    default:
      return (
        renderOutput(null)
      )
  }
};
