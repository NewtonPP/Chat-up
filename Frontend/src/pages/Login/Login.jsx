import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../Hooks/useLogin";

function Login(){

    const [UserName, setUserName]= useState("");
    const [Password, setPassword]= useState("");

    const {Loading, login} = useLogin();

    const HandleSubmit = async(e)=>{
        e.preventDefault();
        await login(UserName,Password)
    }

    return (
        <>
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
           <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg
           bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
            Login
            <span className="text-blue-500">ChatApp</span>
            </h1>
            <form onSubmit={HandleSubmit}>
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Username</span>
                    </label>
                    <input type ="text" placeholder="Enter Username" className="w-full input input-bordered h-10"
                    value ={UserName}
                    onChange={(e)=>setUserName(e.target.value)}></input>
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type ="text" placeholder="Enter Password" className="w-full input input-bordered h-10"
                     value ={Password}
                     onChange={(e)=>setPassword(e.target.value)}></input>
                </div>

            <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                {"Don't"} have an account?
           </Link>
            <div>
                <button className="btn btn-block btn-sm mt-2"
                disabled={Loading}>
                   {Loading ? <span className="loading loading-spinner"></span>:"Login"}</button>
            </div>

            </form>
           </div>
        </div>
        </>
    )
}
export default Login;   