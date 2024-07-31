import bcrypt from "bcryptjs";
import UserModel from "../Model/auth.model.js";
import generateTokensAndCookies from "../utils/generateTokensAndCookies.js";
export const SignUp = async (req,res)=>{
try{
   
   const {FullName,UserName,Password,ConfirmPassword, gender} = req.body;
   
  
    //UserName Handling
   const FindUser = await UserModel.findOne({UserName})
   console.log(FindUser)
      if(FindUser){
         return res.status(401).json({error:"The UserName already exists"})
      }
   //Password Handling  
   if(Password != ConfirmPassword){ 
      return res.status(400).json({error:"The passwords do not match"})
   }
      const salt = await bcrypt.genSalt(10);
      const HashedPass = await bcrypt.hash(Password,salt)
      
      const BoyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${UserName}`;
      const GirlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${UserName};`
     

   const NewUser = new UserModel({
      FullName,
      UserName,
      Password:HashedPass,
      gender,
      profilePic: gender =="male" ? BoyProfilePic : GirlProfilePic,
   })

   if (NewUser){
      await generateTokensAndCookies(NewUser._id, res);
      await NewUser.save();
      res.status(201).json({
      _id:NewUser._id,
      FullName:NewUser.FullName,
      UserName:NewUser.UserName,
      profilePic:NewUser.profilePic,
      })
   }
   else{
      res.status(400).json({error:"Invalid User data"})
   }
      
   


}catch(error){
   console.log("Error in signup controller", error.message);
res.status(401).json({error:"Internal Server Error"})
}
}

export const Login= async (req,res)=>{
   try{
      const {UserName, Password} = req.body;
const findUser = await UserModel.findOne({UserName});
const isPasswordCorrect = await bcrypt.compare(Password, findUser?.Password || "");

if(!findUser || !isPasswordCorrect){
   return res.status(400).json({error:"Invalid username or password"});
}


      generateTokensAndCookies(findUser._id, res);

      res.status(200).json({
         _id: findUser._id,
         FullName:findUser.FullName,
         UserName,
         profilePic:findUser.profilePic
         
})
   }
   catch(error){
      console.log("Error in Login controller", error.message);
      res.status(401).json({error:"Internal Server Error"})
   }
}
export const Logout =  (req,res)=>{
try{
    res.cookie("jwt","",{maxAge:0});
   res.status(200).json({message:"Logged Out Successfully"})
}
catch(error){
   console.log("Error in Logout controller", error.message);
   res.status(401).json({error:"Internal Server Error"})
}
}


export default {SignUp, Login, Logout};