import mongoose from 'mongoose';

const userSchema = new mongoose.userSchema({
    username :{
        type:string,
        required:true,
        unique:true,
    },
    email :{
        type:string,
        required:true,
        unique:true,
    },
    password :{
        type:string,
        required:true,
    },


},{timestamp:true}) 

const User = mongoose.model(User, userSchema)

export default User;