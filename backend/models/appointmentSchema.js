import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"firstname should contain atleast 3 letters"],
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"lastname should contain atleast 3 letters"],
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please provide a valid email"],
    },
    phone:{
        type:String,
        required:true,
        validate:[validator.isNumeric,"Please enter digits only"],
        minLength:[10,"Number should be exactly 10 digits"],
        maxLength:[10,"Number should be exactly 10 digits"],

    },
    aadhar:{
        type:String,
        required:true,
        validate:[validator.isNumeric,"Please enter digits only"],
        minLength:[12,"Aadhar Number should be exactly 12 digits"],
        maxLength:[12,"Aadhar Number should be exactly 12 digits"],

    },
    dob:{
        type:Date,
        required:[true,"DOB is mandatary"],
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female","Other"],
    },
    appointment_date:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },

    doctor:{
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },

    },
    hasVisited:{
        type:Boolean,
        default:false,
    },
    doctor_Id:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    patient_Id:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending",
    },
});

export const Appointment=mongoose.model("Appointment",appointmentSchema);