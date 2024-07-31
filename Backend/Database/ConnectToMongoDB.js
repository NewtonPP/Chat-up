import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const ConnectToMongo= async ()=>{
try{
   
await mongoose.connect(process.env.MONGODB_URI)
console.log("Successfully connected to MongoDB")
}
catch(error){
    res.status(400).json({error:"Internal Server error", error});
}
}

export default ConnectToMongo;