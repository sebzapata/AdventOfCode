import React from "react";
import { NavLink } from 'react-router-dom'

export const NavigationHeader = () => {
  return (
    <div className="header">
      <NavLink exact to="">Home</NavLink>
      <NavLink exact to="/day1">1</NavLink>
      <NavLink exact to="/day2">2</NavLink>
    </div>
  )
};
