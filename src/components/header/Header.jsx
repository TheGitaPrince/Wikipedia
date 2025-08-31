import React from 'react'
import Container  from "../container/Container.jsx";
import { Link } from "react-router-dom";
import authService from '../../appwrite/auth.js'
import { logout } from "../../store/authSlice.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SiWikipedia } from "react-icons/si";

function Header() {
       const authStatus = useSelector((state)=> state.auth.status)
       const navigate = useNavigate()
       const dispatch = useDispatch()

       const logoutHandler = ()=>{
          authService.logout().then(()=>{
            dispatch(logout())
          })
       }

       const navItems = [
        {
          name: "Home",
          slug: "/",
          active: true
        },
        {
          name: "Login",
          slug: "/login",
          active: !authStatus
        },
        {
          name: "Signup",
          slug: "/signup",
          active: !authStatus
        },
        {
          name: "Posts",
          slug: "/all-posts",
          active: authStatus
        },
        {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus
        }
       ]

  return (
     <header className="md:h-20 h-20 w-full bg-blue-950/80 text-blue-50/50 sticky z-10 top-0 shadow">
        <nav className="flex items-center justify-between h-full w-full md:px-10 px-5 ">
              <Link to="/" className="text-blue-100/100 flex justify-center items-center flex-col" >
                  <SiWikipedia className="size-7 md:size-10"/>
                  <span className="font-medium">wikipedia</span>
              </Link>
              <ul className='flex ml-auto'>
                    {
                      navItems.map((item)=>item.active?(
                        <li key={item.name}>
                             <button
                             className='inline-bock md:px-6 px-2 md:py-2 py-1 md:text-lg font-serif  duration-300 hover:bg-blue-950/50 rounded-full'
                             onClick={()=>navigate(item.slug)}
                             >
                               {item.name} 
                             </button>
                        </li>
                      ): null)
                    }
                    {
                      authStatus && (
                        <button
                        className="inline-bock md:px-6 px-3 md:py-2 py-1 md:text-lg duration-300 hover:bg-blue-950/50 rounded-full"
                        onClick ={ logoutHandler }
                        >
                            Logout
                        </button>
                      )
                    }
              </ul>
        </nav>
     </header>
  )
}

export default Header