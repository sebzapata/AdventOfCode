import React from "react";
import { BouncingBall } from "../challenges/canvasAnimation";
import { CanvasText } from "../challenges/canvasText";
import {Day1} from "../challenges/day1";
import {Day2} from "../challenges/day2";
import {Day4} from "../challenges/day4";
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
      <div id="dynamic" className="dynamic">
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

    case "/day4": {
      return (
        renderOutput(<Day4/>)
      )
    }

    case "/canvas": {
      return (
        renderOutput(<Canvas/>)
      )
    }

    case "/canvasText": {
      return (
        renderOutput(<CanvasText/>)
      )
    }

    default:
      return (
        renderOutput(null)
      )
  }
};
