import React, { useState } from "react";
import ReorderIcon from "@material-ui/icons/Reorder";
import "../App.css";

function NavBar() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="Navbar" id="navbar">
      <div className="leftSide">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <a href="/dataA">SPOT Market Data</a>
          <a href="/dataB">Future Market Data</a>
        </div>
        <button onClick={() => setShowLinks(!showLinks)}>
          <ReorderIcon />
        </button>
      </div>
      <div className="rightSide">
        <p>Choose your data type</p>
      </div>
    </div>
  );
}

export default NavBar;
