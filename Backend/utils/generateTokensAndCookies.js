import jwt  from "jsonwebtoken";


const generateTokensAndCookies= (UserId, res)=>{
    const Tokens = jwt.sign({UserId}, process.env.JWT_SECRET,{
        expiresIn:"15d",
    })
    res.cookie("jwt",Tokens,{
        maxAge:15*24*60*60*1000,
            httpOnly:true,//Prevents XSS attacks
            sameSite:"strict", //CSRF attacks cross site forgery attack
            secure: process.env.NODE_ENV !=="development"
    })
}

export default generateTokensAndCookies;
