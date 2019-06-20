import React from "react";
import {store} from "../redux";
import classNames from "classnames";

export const NavigationHeader = () => {

  const changeComponent = (component) => {
    store.dispatch({
      type: "CHANGE_COMPONENT",
      payload: {
        component: component,
      },
    });
  };

  const currentPath = window.location.pathname;

  const createLink = (pathname, text, currentPath) => {
    return (
      <h1 className={classNames("navigationHeader__link", {"navigationHeader__link--current": currentPath === pathname})} onClick={() => window.location.pathname = pathname}>{text}</h1>
    )
  };

  return (
    <div className="navigationHeader">
      {createLink("/", "Home", currentPath)}
      {createLink("/day1", "1", currentPath)}
      {createLink("/day2", "2", currentPath)}
      {createLink("/day3", "3", currentPath)}
      {createLink("/canvas", "Canvas", currentPath)}
    </div>
  )

};
