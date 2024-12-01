import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique:true,
    },
    email :{
        type:String,
        required:true,
        unique:true,
    },
    password :{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
    }


},{timestamp:true}) 

const User = mongoose.model("User", userSchema)

export default User;