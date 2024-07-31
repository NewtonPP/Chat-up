import { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { Link } from "react-router-dom";
import useSignup from "../../Hooks/useSignup";

const SignUp = ()=>{
    const [Inputs, SetInputs]= useState({
        FullName:"",
        UserName:"",
        Password:"",
        ConfirmPassword:"",
        gender:""
    })
    const {loading,signup}= useSignup();
    
    const HandleSubmit= async(e)=>{
        e.preventDefault();
        await signup(Inputs)
    }

    const HandleCheckBoxChange=(gender)=>{
        SetInputs({...Inputs,gender})
    }
    return (
        <>
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg
           bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
            Signup
            <span className="text-blue-500">ChatApp</span>
            </h1>

            <form onSubmit={HandleSubmit}>
                <div>
                <label className="label p-2">
                        <span className="text-base label-text">Full Name</span>
                    </label>
                    <input type= "text" placeholder="Mark John"className="w-full input inmput-bordered h-10"
                    value= {Inputs.FullName}
                    onChange={(e)=>SetInputs({...Inputs,FullName:e.target.value})}
                    />
                </div>

                <div>
                <label className="label p-2">
                        <span className="text-base label-text">Username</span>
                    </label>
                    <input type="text" placeholder="Mark122"className="w-full input inmput-bordered h-10"
                     value= {Inputs.UserName}
                     onChange={(e)=>SetInputs({...Inputs,UserName:e.target.value})}/>
                </div>

                <div>
                <label className="label p-2">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type= "password" placeholder="Minimum 6 characters"className="w-full input inmput-bordered h-10"
                     value= {Inputs.Password}
                     onChange={(e)=>SetInputs({...Inputs,Password:e.target.value})}/>
                </div>
                <div>
                <label className="label p-2">
                        <span className="text-base label-text">Confirm Password</span>
                    </label>
                    <input type= "password" placeholder="Minimum 6 characters"className="w-full input inmput-bordered h-10"
                     value= {Inputs.ConfirmPassword}
                     onChange={(e)=>SetInputs({...Inputs,ConfirmPassword:e.target.value})}/>
                </div>

                <GenderCheckBox onCheckboxChange={HandleCheckBoxChange} selectedGender={Inputs.gender}/>
                <Link to="/login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                Already have an account?
            </Link>
            <div>
                <button className="btn btn-block btn-sm mt-2 border border-slate-700" disabled = {loading}>
                    {loading ? <span className="loading loading-spinner"></span>:"Sign Up"}</button>
            </div>
            </form>
           </div>
        </div>
        </>
    )
}
export default SignUp;
