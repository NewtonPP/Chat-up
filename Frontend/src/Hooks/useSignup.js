import {useState} from"react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext";
export const useSignup=()=>{
    const [loading, setLoading]=useState(false);
    const {setAuthUser}= useAuthContext();

    const signup = async ({FullName, UserName, Password, ConfirmPassword, gender})=>{
        const success = handleInputErrors({FullName, UserName, Password, ConfirmPassword, gender})
        if(!success)return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup",{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({
                    FullName,UserName,Password,ConfirmPassword,gender
                })  
                
            })
            const data = await res.json();  
            if(data.error){ 
                throw new Error(data.error)
            } 
            //LocalStorage
            localStorage.setItem("chat-user", JSON.stringify(data))

            //Context
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading,signup}
}
export default useSignup;

function handleInputErrors({FullName, UserName, Password, ConfirmPassword, gender}){
    if(!FullName || !UserName || !Password || !ConfirmPassword || !gender){
        toast.error("Please fill all the fields")
        return false;
    }
    if(Password!= ConfirmPassword){
        toast.error("Passwords do not match")
    }
    if(Password.length<6){
        toast.error("Password must be atleast 6 characters")
        return false;
    }
    return true;
}
