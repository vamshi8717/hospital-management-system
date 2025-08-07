import mongoose  from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
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
    role:{
        type:String,
        required:true,
        enum:["Patient","Doctor","Admin"],
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"Must conatin atleast 6 characters"],
        select:false
    },
    doctorDepartment:{
        type:String,
    },
    docAvator:{
        public_id:String,
        url:String,
    },




});


userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
    
});

userSchema.methods.comparePassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
    
};

userSchema.methods.generateJsonWebToken=function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    } );
};

export const User=mongoose.model("User",userSchema);


