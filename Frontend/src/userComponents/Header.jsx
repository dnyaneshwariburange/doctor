import React, { useContext } from "react";
import "../assets/Usercss/header.css";
import { NavLink } from "react-router-dom";
import CartContext from "./cartContext";

const Header = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="navHeader">
      <h1>Logo</h1>
      <div className="navLinks">
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart ({cart.length})</NavLink>
          </li>
          <li>
            <NavLink to="/home">Logout</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
