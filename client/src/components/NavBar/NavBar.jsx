import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";
import ReorderIcon from "@material-ui/icons/Reorder";

export default function NavBar() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="divNav">
      <div className="leftSide">
        <div className="divLinks" id={showLinks ? "hidden" : " "}>
          <NavLink to="/">Welcome</NavLink>
          <NavLink to="/home" activeClassName="is-active">
            Home
          </NavLink>
          <NavLink to="/videogame" activeClassName="is-active">
            Create Videogame
          </NavLink>
        </div>
        <button onClick={() => setShowLinks(!showLinks)}>
          <ReorderIcon />
        </button>
      </div>
      <div className="rightSide">
        <SearchBar />
      </div>
    </div>
  );
}

//600 px
