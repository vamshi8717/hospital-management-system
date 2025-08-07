import express from "express";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointment } from "../controllers/appointmentController.js";


const router=express.Router();

router.post("/post",isPatientAuthenticated,postAppointment);
router.get("/getall",isAdminAuthenticated,getAllAppointments);
router.put("/update/:id",isAdminAuthenticated,updateAppointment);
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment);
export default router;