import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import classes from '../assets/css/DoctorPortfolio.module.css';

const DoctorPortfolio = ({ show, onHide, doctorProfile }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton className={classes['modal-header']}>
        <Modal.Title className={classes['modal-title']}>Doctor Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {doctorProfile && (
          <>
            <p className={classes['patient-info']}>Doctor Name: {doctorProfile.doctorName}</p>
            <p className={classes['patient-info']}>Phone Number: {doctorProfile.doctorPhonenumber}</p>
            <p className={classes['patient-info']}>Email: {doctorProfile.email}</p>
            <p className={classes['patient-info']}>Specialization: {doctorProfile.specialization}</p>
            
          </>
        )}
      </Modal.Body>
      <Modal.Footer className={classes['modal-footer']}>
        <Button variant="secondary" onClick={onHide} className={classes['btn-secondary']}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DoctorPortfolio;
