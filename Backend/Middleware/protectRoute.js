import jwt from "jsonwebtoken";
import UserModel from "../Model/auth.model.js";
import generateTokensAndCookies from "../utils/generateTokensAndCookies.js";

export const protectRoute = async(req, res, next)=>{
    try{
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({
            error:"Unauthorized - No token Provided"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({
            error:"Unauthorized - Invalid Token"
        })
    }
    const user = await UserModel.findById(decoded.UserId).select("-password")

    if(!user){
        return res.status(400).json({
            error:"User not found "
        });
    }
    req.user = user;

    next();

}
catch(error){
console.log("Error in protectRoute Middleware: ", error.message);
res.status(500).json({
    error:"Internal Server error"
})
}
}
