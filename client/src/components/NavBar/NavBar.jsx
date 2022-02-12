import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";
import ReorderIcon from '@material-ui/icons/Reorder';

export default function NavBar() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="divNav">
      <div className="leftSide" >
        <div className= "divLinks" id={showLinks ? "hidden" : " "}>
          <Link to="/">Welcome</Link>
          <Link to="/home">Home</Link>
          <Link to="/videogame">Create Videogame</Link>
        </div>
        <button onClick={()=>setShowLinks(!showLinks)}><ReorderIcon/></button>
      </div>
      <div className="rightSide">
        <SearchBar />
      </div>
    </div>
  );
}

//600 px
