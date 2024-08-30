import express from "express";
import { 
    addAppointment, 
    getAllAppointments, 
    getAppointmentByPatientId, 
    getAppointmentByDoctorId,
    updateAppointment,
    partialUpdateAppointment,
    deleteAppointment
} from "../controller/appointmentControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/appointment', addAppointment);
router.get('/allAppointments', getAllAppointments);
router.get('/appointmentsByPatient',auth, getAppointmentByPatientId);
router.get('/appointmentsByDoctor', getAppointmentByDoctorId);
router.put('/appointment/:id', updateAppointment);
router.patch('/appointment/:id', partialUpdateAppointment);
router.delete('/appointment/:id', deleteAppointment);

export default router;
