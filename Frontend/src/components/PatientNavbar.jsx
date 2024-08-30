// src/components/PatientNavbar.jsx
import React from 'react';
import "../assets/css/custom.css";
import { Link, useNavigate } from 'react-router-dom';

const PatientNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('authToken');
    localStorage.removeItem('patientName');

    navigate('/patient/login');
  };

  const patientName = localStorage.getItem('patientName');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark m-0">
      <div className="container-fluid p-0 m-0">
        <Link className="navbar-brand" to="/patienthome">Patient Dashboard</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <span className="nav-link">Welcome, {patientName}</span>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger nav-link" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PatientNavbar;
