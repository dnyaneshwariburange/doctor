import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import styles from '../assets/css/PatientLoginForm.module.css'; 
import doctorLogo from '../assets/images/doctor3.jfif'; 

import image from "../components/log1.jpeg"

const DoctorLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const doctorData = { email, password };
      const response = await axios.post(
        "http://localhost:7000/api/doctors/authenticateDoctor",
        doctorData
      );
      console.log("Doctor login successful:", response.data);

      localStorage.setItem("doctorAuthToken", response.data.accessedToken);
      localStorage.setItem("doctorName", response.data.doctorName);
      localStorage.setItem("doctorId", response.data.doctorID);
      console.log(response.data);

      navigate("/doctorhome");
    } catch (error) {
      console.error("Doctor login failed:", error.message);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
<div style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat", 

height: '100vh',
width: '96.7vw', 
backgroundSize: 'cover', 
backgroundPosition: 'center',
}}>

    <div className="d-flex flex-column min-vh-100">
      <div className="container-fluid flex-fill">
        <div className="row justify-content-center">
          <div className={`col-md-6 ${styles.box}`}>
            <Form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.logo}>
                <img src={doctorLogo} alt="Doctor Logo" className={styles.logoImg} />
              </div>
              <h1>DOCTOR LOGIN</h1>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className={styles.input}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className={styles.input}
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading} className={styles.log}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <p className={styles.anchor}>Forgot password?</p>
            </Form>
          </div>
        </div>
      </div>

    </div>
    </div>
  );
};

export default DoctorLoginForm;
