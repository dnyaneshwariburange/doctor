import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, DropdownButton, Dropdown } from 'react-bootstrap';
import image from "../components/dash2.webp"
 

const DoctorHome = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('doctorAuthToken');
      const doctorId = localStorage.getItem('doctorId');
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.get(`http://localhost:7000/api/appointments/appointmentsByDoctor?doctorId=${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('Error in fetching appointments:', error.message);
    }
  };

  const handleStatusChange = async (appointmentId, status) => {
    try {
      const token = localStorage.getItem('doctorAuthToken');
      if (!token) {
        throw new Error("No authentication token found");
      }
      await axios.put(
        `http://localhost:7000/api/appointments/appointment/${appointmentId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchAppointments();
    } catch (error) {
      console.log('Error updating appointment status:', error.message);
    }
  };

  const handleStatusSelect = async (status, appointmentId) => {
    setSelectedStatus(status);
    await handleStatusChange(appointmentId, status);
  };

  return (
  
    <div style={{ backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat", 

    height: '100vh',
    width: '96.7vw', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    }}>
  


    <div className="container mt-4">
      <h2>Doctor Dashboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Patient Name</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment._id}>
              <td>{index + 1}</td>
              <td>{appointment.patientId.patientName}</td>
              <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
              <td>{appointment.status}</td>
              <td>
                <DropdownButton
                  id={`dropdown-${appointment._id}`}
                  title={appointment.status || 'Change Status'}
                  onSelect={(status) => handleStatusSelect(status, appointment._id)}
                  className="status-dropdown" 
                >
                  <Dropdown.Item eventKey="Accept">Accept</Dropdown.Item>
                  <Dropdown.Item eventKey="Reject">Reject</Dropdown.Item>
                  <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  );
};

export default DoctorHome;
