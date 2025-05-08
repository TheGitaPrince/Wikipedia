import React from 'react'
import Container  from "../container/Container.jsx";
import { Link } from "react-router-dom";
import authService from '../../appwrite/auth.js'
import { logout } from "../../store/authSlice.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../../public/images.png";

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
     <header className="md:h-20 h-16 w-full bg-white text-black sticky z-10 top-0 shadow">
        <nav className="flex items-center justify-between h-full w-full md:px-8 px-5 ">
              <Link to="/" className="md:h-10 h-6" >
                  <img 
                  className="w-full h-full object-contain"
                  src={logo} alt="logo" />
              </Link>
              <ul className='flex ml-auto'>
                    {
                      navItems.map((item)=>item.active?(
                        <li key={item.name}>
                             <button
                             className='inline-bock md:px-6 px-3 md:py-2 py-1 md:text-lg  duration-300 hover:bg-blue-100 rounded-full'
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
                        className="inline-bock md:px-6 px-3 md:py-2 py-1 md:text-lg duration-300 hover:bg-blue-100 rounded-full"
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