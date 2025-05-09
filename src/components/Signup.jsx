import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import  Button  from "./Button.jsx";
import  Input  from "./Input.jsx";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth.js"
import { login } from "../store/authSlice.js";
import { useDispatch } from "react-redux";
import Loading from "./Loading.jsx";

function Signup() {
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate()
     const [error,setError] = useState("")
     const {register,handleSubmit, formState: { errors }} = useForm()
     const dispatch = useDispatch()

     const create = async (data) => {
        setLoading(true)
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
          const message = error.response?.message || error.message || "Please enter a valid details";
          setError(message);
        } finally{
           setLoading(false);
        }
     }
  return (
    <div className="flex items-center justify-center">
        <div  className={`mx-auto w-full max-w-sm  border border-neutral-700 rounded-xl p-6`}>
           <h2 className="text-center text-2xl font-bold leading-tight">
                   Sign up to create account
           </h2>
           <p className="mb-5 text-center text-base ">
              Already have an account?&nbsp;
              <Link
              to = "/login"
              className="hover:underline hover:text-blue-600"
              >
                 Sign In
              </Link>
           </p>
           {error && <p  className="text-red-600 mt-8 text-center"> {error}</p>}

           <form onSubmit = {handleSubmit(create)}>
               <div className='space-y-5'>
                  <Input
                   type= "text"
                   placeholder= "Enter your full name"
                   {
                    ...register("fullName",{required: true})
                   }
                  />
                  <Input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email",{
                    required: true,
                    validate:{
                        matchPattern: (value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address"
                    }
                  })}
                  />
                   {errors.email && ( <p className="text-red-500 text-xs mt-1"> {errors.email.message} </p> )}
                  <Input
                   type= "password"
                   placeholder= "Enter your password"
                   {
                    ...register("password",{required: true})
                   }
                  />
                  <Button
                   type="submit"
                   className="w-full flex justify-center hover:bg-blue-500"
                  >
                    {loading? <Loading/> : "Signup"}
                  </Button>
               </div>

           </form>
        </div>
    </div>
  )
}

export default Signup