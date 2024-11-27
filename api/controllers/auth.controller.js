import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs';

export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password:hashedPassword}); // to save in a data base we created a new User
    try{
        await newUser.save()  //await is key to make file save with any error interuption, it keep on one process unitl it save
        res.status(201).json("User Created Successfully")
    } catch(error){
        //res.status(500).json(error.message)  // to catch error and to inform in insomania ui
        next(error);
    }
};