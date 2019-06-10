import React from "react";
import {store} from "./redux";

export const NavigationHeader = () => {

  const changeComponent = (component) => {
    store.dispatch({
      type: "CHANGE_COMPONENT",
      payload: {
        component: component,
      },
    });
  };

  return (
    <div className="header">
      <button onClick={() => window.location.pathname = ""}>Home</button>
      <button onClick={() => window.location.pathname = "/day1"}>1</button>
      <button onClick={() => window.location.pathname = "/day2"}>2</button>
    </div>
  )
};
