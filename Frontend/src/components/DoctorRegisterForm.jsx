import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "../assets/css/DoctorRegister.module.css"; 
import doctorLogo from "../assets/images/doctor3.jfif"; 
import image from "../components/log1.jpeg"

const DoctorRegisterForm = () => {
  const [doctorName, setDoctorName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctorPhonenumber, setDoctorPhonenumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDoctor = {
        doctorName,
        email,
        password,
        doctorPhonenumber,
        specialization,
      };
      console.log("Sending doctor registration data:", newDoctor); // Log the data being sent
      const response = await axios.post(
        "http://localhost:7000/api/doctors/addDoctor",
        newDoctor
      );
      console.log("New doctor registered:", response.data);
      setSuccessMessage("Registration successful!");
    } catch (error) {
      console.error("Doctor registration failed:", error.message);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat", 

    height: '130vh',
    width: '96.7vw', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    }}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Form onSubmit={handleSubmit} className={`bg-light p-4 rounded ${styles.form}`}>
            <div className="text-center mb-4">
              <img src={doctorLogo} alt="Doctor Logo" className={styles.logoImg} />
              <h1>Doctor Registration</h1>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form.Group controlId="doctorName">
              <Form.Label>Doctor Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter doctor name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
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

            <Form.Group controlId="doctorPhonenumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={doctorPhonenumber}
                onChange={(e) => setDoctorPhonenumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="specialization">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
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

export default DoctorRegisterForm;
