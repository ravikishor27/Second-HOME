import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION_ID).then(()=>{
    console.log("Connected to MONGODB")
}).catch((err)=>{
    console.log(err)
});

const api= express();

api.listen(3000,()=>{
    console.log("Server is Successfully running in port 3000")
});