import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <Link style={{ textDecoration: "none", color: "#2978b5" }} to={"/"}>
        LET'S EXPLORE
      </Link>
    </header>
  );
};

export default Navbar;
