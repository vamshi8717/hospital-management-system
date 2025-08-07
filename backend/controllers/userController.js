import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {User} from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegistered=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,dob,aadhar,role}=req.body;

    if(!firstName|| !lastName|| !email|| !phone|| !password|| !gender|| !dob || !aadhar || !role){
        return next(new ErrorHandler("Please fill full form",400));
    }
    let user=await User.findOne({email});

    if(user){
        return next(new ErrorHandler("User already exists",400));
    }

    user=await User.create({
        firstName,lastName,email,phone,password,gender,dob,aadhar,role,
    });

    generateToken(user,"USer successfully registered",200,res);
    

});


export const login=catchAsyncErrors(async(req,res,next)=>{
    const {email,password,confirmPassword,role}=req.body;
    if(!email|| !password|| !confirmPassword|| !role){
        return next(new ErrorHandler("Please fill all Details",400));

    }
    if(password!==confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password do not match",400));
    }

    const user=await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Inavlid email",400));
    
    }
    const crctPassword=await user.comparePassword(password);

    if(!crctPassword){
        return next(new ErrorHandler("Invalid Password",400));
    }
    if(role!==user.role){
        return next(new ErrorHandler("Role is different",400));
    
    };
    generateToken(user,"USer successfully logged in",200,res);
    
    
})


export const newAdminRegistered=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,password,gender,dob,aadhar}=req.body;

    if(!firstName|| !lastName|| !email|| !phone|| !password|| !gender|| !dob || !aadhar){
        return next(new ErrorHandler("Please fill full form",400));
    }
    let newAdmin=await User.findOne({email});

    if(newAdmin){
        return next(new ErrorHandler(`${newAdmin.role} already exits`,400));
    }

    newAdmin=await User.create({
        firstName,lastName,email,phone,password,gender,dob,aadhar,role:"Admin",
    });
    generateToken(newAdmin,"new admin registered successfully",200,res);
    
});

export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctors=await User.find({role:"Doctor"});

    res.status(200).json({
        success:true,
        message:"fetching all enrolled docs",
        doctors,
    });
});

export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const userDetails=await req.user;
    res.status(200).json({
        success:true,
        message:"fetching the user details",
        userDetails,
    });
    
});

export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{
    res.status(200)
    .cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"Admin Logged out Successfully",
    });
});

export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{
    res.status(200)
    .cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"Patient Logged out Successfully",
    });
});

export const addNewDoctor=catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Doc Avatar required",400));
    }
    const {docAvatar}=req.files;
    const allowedFormat=["image/png","image/jpeg","image/webp"];
    if(!allowedFormat.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File format Not Supported",400));
    }

    const{firstName,lastName,email,phone,password,gender,dob,aadhar,doctorDepartment}=req.body;
    if(!firstName|| !lastName|| !email|| !phone|| !password|| !gender|| !dob|| !aadhar|| !doctorDepartment){
        return next(new ErrorHandler("Please fill all the details of doctor",400));
    }

    const isRegisterd=await User.findOne({email});
    if(isRegisterd){
        return next(new ErrorHandler(`${isRegisterd.role} with this email already exists`,400));

    }

    const cloudinaryResponse=await cloudinary.uploader.upload(
        docAvatar.tempFilePath,
        //console.log("File Path:", docAvatar.tempFilePath)

    );
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error(
            "Cloudinary Error : ",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
    }

    const doctor=await User.create({
        firstName,lastName,email,phone,password,gender,dob,aadhar,doctorDepartment,role:"Doctor",
        docAvator:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url,
        },
    });

    res.status(200).json({
        success:true,
        message :"New Doctor is being created",
        doctor,
    });


});