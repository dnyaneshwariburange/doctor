import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "../assets/css/PatientRegister.module.css"; 
import userLogo from "../assets/images/patient.webp"; 
// import Footer from '../components/Footer';
import image from "../components/log1.jpeg"
const PatientRegisterForm = () => {
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [patientPhonenumber, setPatientPhonenumber] = useState("");
  const [DOB, setDOB] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPatient = {
        patientName,
        email,
        password,
        patientPhonenumber,
        DOB,
        bloodGroup,
      };
      const response = await axios.post(
        "http://localhost:7000/api/patients/addPatient",
        newPatient
      );
      console.log("New patient registered:", response.data);
      setSuccessMessage("Registration successful!");
      // Optionally, handle success feedback or redirect to login page
    } catch (error) {
      console.error("Patient registration failed:", error.message);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat", 

    height: '140vh',
    width: '96.7vw', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    }}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Form onSubmit={handleSubmit} className={`bg-light p-4 rounded ${styles.form}`}>
            <div className="text-center mb-4">
              <img src={userLogo} alt="User Logo" className={styles.logo} />
              <h1>Patient Registration</h1>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form.Group controlId="patientName">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="patientPhonenumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={patientPhonenumber}
                onChange={(e) => setPatientPhonenumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="DOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date of birth"
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="bloodGroup">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blood group"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-50 mt-3">
              Register
            </Button>
          </Form>
        </div>
      </div>
    
    </div>
    </div>
  );
};

export default PatientRegisterForm;
