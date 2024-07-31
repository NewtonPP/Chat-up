import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    FullName:{
        required:true,
        type: String,
    },
    UserName:{
        required:true,
        type:String,
        unique:true,
    },
    Password:{
        required:true,
        type:String,
        minlength:6,
    },
    gender:{
        type:String,
        required:true,
        enum:["male", "female"],
    },
    profilePic:{
        type: String,
        default:""
    },
}, {timestamps:true})

const UserModel = mongoose.model("User",UserSchema);

export default UserModel;