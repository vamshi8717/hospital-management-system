import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.
    connect(process.env.MONGO_URI,{
        dbName: "Hospital_Management",
    })
    .then(()=>{
        console.log("connected to db");
    })
    .catch((err)=>{
        console.log(`eror occured connecting db ${err}`);
    });
};