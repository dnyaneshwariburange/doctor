import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
