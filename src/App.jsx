import React,{useEffect,useState} from 'react'
import  Header  from "./components/header/Header.jsx";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login,logout } from "./store/authSlice.js";
import authService from "./appwrite/auth.js";


function App() {
    const [loading,setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
      authService.getCurrentUser()
      .then((userData)=>{
           if(userData) dispatch(login({userData}));
           else dispatch(logout());    
      })
      .finally(()=>{
          setLoading(false)
      })
    }, [])
    
  return !loading? (
    <div className = "min-h-screen flex flex-wrap content-between">
         <div className="w-full block">
              <Header />
              <main className="bg-blue-100 min-h-[89vh]">
                <Outlet/>
              </main>
         </div>
    </div>
  ): null;
}

export default App
