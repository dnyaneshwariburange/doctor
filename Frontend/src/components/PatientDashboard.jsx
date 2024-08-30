import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentModal from './AppointmentsModal';
import DoctorPortfolio from './DoctorPortfolio';
import { Table, Button, Modal } from 'react-bootstrap';
import image from "../components/dash2.webp"

const PatientHomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [deleteId, setDeleteId] = useState(null); 
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState(null); // State to hold doctor's profile
  const [showDoctorPortfolio, setShowDoctorPortfolio] = useState(false); // State to control doctor portfolio modal

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('patientAuthToken');
      const patientId = localStorage.getItem('patientId');
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.get(`http://localhost:7000/api/appointments/appointmentsByPatient?patientId=${patientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data);
    } catch (error) {
      console.log('Error in fetching appointments:', error.message);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('patientAuthToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      await axios.delete(`http://localhost:7000/api/appointments/appointment/${appointmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAppointments();
      setShowDeleteConfirmation(false); // Close the confirmation modal after deletion
    } catch (error) {
      console.log('Error deleting appointment:', error.message);
    }
  };

  const openDeleteConfirmation = (appointmentId) => {
    setDeleteId(appointmentId);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const openDoctorPortfolio = async (doctorId) => {
    try {
      const token = localStorage.getItem('patientAuthToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await axios.get(`http://localhost:7000/api/doctors/getDoctor/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctorProfile(response.data);
      setShowDoctorPortfolio(true);
    } catch (error) {
      console.error('Error fetching doctor details:', error.message);
    }
  };

  const closeDoctorPortfolio = () => {
    setShowDoctorPortfolio(false);
  };

  return (
    <div style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat", 

    height: '100vh',
    width: '96.7vw', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    }}>

    <div className="container mt-4">
      <Button variant="dark" className="my-2" onClick={() => setShowModal(true)}>Add Appointment</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Doctor Name</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment._id}>
              <td>{index + 1}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => openDoctorPortfolio(appointment.doctorId._id)}
                >
                  {appointment.doctorId.doctorName}
                </button>
              </td>
              <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
              <td>{appointment.status}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => openDeleteConfirmation(appointment._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      
      <Modal show={showDeleteConfirmation} onHide={closeDeleteConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this appointment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDeleteAppointment(deleteId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <AppointmentModal show={showModal} onHide={() => setShowModal(false)} fetchAppointments={fetchAppointments} />

      
      <DoctorPortfolio
        show={showDoctorPortfolio}
        onHide={closeDoctorPortfolio}
        doctorProfile={doctorProfile}
      />
    </div>
    </div>
  );
};

export default PatientHomePage;
