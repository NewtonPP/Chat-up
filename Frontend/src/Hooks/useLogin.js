import { useState } from "react"
import { useAuthContext} from "../context/AuthContext";
import toast from "react-hot-toast";


const useLogin = () => {    
   const [Loading, setLoading]=useState(false); 
   const {setAuthUser}= useAuthContext();
  

 const login = async (UserName, Password)=>{
    setLoading(true);
    try {
        const res = await fetch("/api/auth/login",{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({UserName, Password})
        })
       const data = await res.json();
       if(data.error){
        throw new Error(data.error)
       }
       localStorage.setItem("chat-user",JSON.stringify(data))
       setAuthUser(data);
    } catch (error) {
        toast.error(error.message)
    }
    finally{
        setLoading(false);
    }
   }
   return {Loading, login}

}

export default useLogin
