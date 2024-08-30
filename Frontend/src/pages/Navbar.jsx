import { NavLink, useNavigate } from "react-router-dom";
import classes from "../assets/css/navbar.module.css";
import { useContext } from "react";
import AuthContext from "../authContext";

const Navbar = () => {
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={classes.navbar}>
      <h2>LOGO</h2>
      <ul className={classes.navLinks}>
          <>
          <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "nav active" : "nav")}
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
           <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "nav active" : "nav")}
                    to="/admin/register"
                  >
                    Admin Register
                  </NavLink>
                </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "nav active" : "nav")}
                to="/admin/login"
              >
                Admin Login
              </NavLink>
            </li>
            <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "nav active" : "nav")}
                    to="/user/register"
                  >
                    User Register
                  </NavLink>
                </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "nav active" : "nav")}
                to="/user/login"
              >
                User Login
              </NavLink>
            </li>
          </>
      </ul>
    </nav>
  );
};

export default Navbar;
