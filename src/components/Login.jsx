import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice.js";
import { useDispatch } from "react-redux";
import  Button  from "./Button.jsx";
import  Input  from "./Input.jsx";
import authService from "../appwrite/auth.js"
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register, handleSubmit , formState: { errors }} = useForm()
  const [error,setError] = useState("")

  const login = async (data) => {
        setError("")
      try {
        const session = await authService.login(data)
        if(session){
          const userData = await authService.getCurrentUser()
          if(userData) dispatch(authLogin(userData))
            navigate("/")
        }
      } catch (error) {
        const message = error.response?.message || error.message || "Login failed";
        setError(message);
      }
  }
  return (
     <div className="flex items-center justify-center w-full">
       <div className={`mx-auto w-full max-w-xs border border-neutral-700 rounded-xl p-6`}>
          <h2 className="text-center text-2xl font-bold leading-tight">
                   Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base">
                  Don&apos;t have any account?&nbsp;
                  <Link 
                    to ="/signup"
                    className="hover:underline hover:text-blue-600"
                   >
                    Sign Up
                  </Link>
          </p> 
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit = {handleSubmit(login)} className='mt-8'>
               <div className='space-y-5'>
                  <Input
                   type="email" 
                   placeholder = "Enter your email."
                   { ...register("email",{
                         required: true,
                         validate:{
                          matchPattern: (value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 
                          "Email address must be a valid address"
                         }
                   })
                   }
                  />
                  {errors.email && ( <p className="text-red-500 text-xs mt-1"> {errors.email.message} </p> )}
                  <Input
                   placeholder = "Enter your password"
                   type = "password"
                   {
                    ...register("password",{required: true})
                   }
                  />
                  {errors.password && ( <p className="text-red-500 text-xs mt-1"> {errors.password.message} </p> )}
                  <Button
                  type="submit"
                  className="w-full  hover:bg-blue-500"
                  >
                    Sign in 
                  </Button>
               </div>
          </form>
       </div>
     </div>
  )
}

export default Login