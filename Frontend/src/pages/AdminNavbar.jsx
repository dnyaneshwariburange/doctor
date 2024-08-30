import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../authContext";
import classes from "../assets/css/navbar.module.css";

const AdminNavbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav className={classes.navbar}>
      <h2>Admin Panel</h2>
      <ul className={classes.navLinks}>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
            to="/admin/products"
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
            to="/admin/users"
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink className="nav" onClick={logout} to="/home">
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
