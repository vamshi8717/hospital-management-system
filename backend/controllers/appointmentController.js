import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {Appointment} from "../models/appointmentSchema.js";
import {User} from "../models/userSchema.js";

export const postAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,aadhar,dob,gender,appointment_date,department,doctor_firstName,doctor_lastName,hasVisited,address}=req.body;

    if(  !firstName || !lastName || !email || !phone || !aadhar || !dob || !gender || !appointment_date || !department || !doctor_firstName || !doctor_lastName || !address){
        return next(new ErrorHandler("Please fill full form",400));
    };

    const isConflict=await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"Doctor",
        doctorDepartment:department,
    });

    if(isConflict.length===0){
        return next(new ErrorHandler("No such doctor available",400));
    }
    if(isConflict.length>1){
        return next(new ErrorHandler("Too many doctor with same name conatct thrgh email"));
    }

    const doctor_Id=isConflict[0]._id;
    const patient_Id=req.user._id;

    const appointment=await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        aadhar,
        dob,
        gender,
        appointment_date,
        department,
        doctor:{
            firstName:doctor_firstName,
            lastName:doctor_lastName,
        },
        hasVisited,
        address,
        doctor_Id,
        patient_Id,
    });
    res.status(200).json({
        success:true,
        message:"Appointment booked successfully",
        appointment,
    });
});


export const getAllAppointments=catchAsyncErrors(async(req,res,next)=>{
    const allAppointments=await Appointment.find();
    res.status(200).json({
        success:true,
        message:"fetching all appointments...",
        allAppointments,
    });
});


export const updateAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not found",404));

    }
    appointment=await Appointment.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        message:"Your appointmnet is being updated",
        appointment,
    });
});

export const deleteAppointment=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    let appointment=await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not found",404));

    }
    await appointment.deleteOne();
    res.status(200).json({
        success:true,
        message:"Your appointment is deleted",
        appointment,
    })
})