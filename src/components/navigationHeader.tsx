import React from "react";
import classNames from "classnames";
import {store} from "../redux";

export const NavigationHeader = () => {

  const changeComponent = (component: string) => {
    store.dispatch({
      type: "CHANGE_COMPONENT",
      payload: {
        component: component,
      },
    });
  };

  const currentPath = window.location.pathname;

  const createLink = (pathname: string, text: string, currentPath: string) => {
    return (
      <h1 className={classNames("navigationHeader__link", {"navigationHeader__link--current": currentPath === pathname})} onClick={() => window.location.pathname = pathname}>{text}</h1>
    )
  };

  return (
    <div className="navigationHeader">
      {createLink("/", "Home", currentPath)}
      {createLink("/day1", "1", currentPath)}
      {createLink("/day1Animated", "1*", currentPath)}
      {createLink("/day2", "2", currentPath)}
      {createLink("/day3", "3", currentPath)}
      {createLink("/day4", "4", currentPath)}
      {createLink("/canvas", "Canvas", currentPath)}
      {createLink("/canvasText", "Canvas Text", currentPath)}
    </div>
  )

};
