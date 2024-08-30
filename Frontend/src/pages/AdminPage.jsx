import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar"; // Import the AdminNavbar component

const AdminPage = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
