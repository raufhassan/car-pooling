import React from "react";
import './header.css'

const Header = ({image}) => {
  return (
    // <header>
      <div
        style={{backgroundImage:`url(${require(`../../assets/${image}.png`)})`}}
        className="p-5 bg-image header-img"
      >
      </div>
    // </header>
  );
};


export default Header;