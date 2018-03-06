import React from "react";
import "./Hamburger.css";

function animate(x) {
  x.classList.toggle("change");
}

function Hamburger() {
  return (
    <div className="Hamburger" onClick={e => animate(e.target)}>
      <div className="bar1" />
      <div className="bar2" />
      <div className="bar3" />
    </div>
  );
}

export default Hamburger;
