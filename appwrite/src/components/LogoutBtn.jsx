import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import {logout} from '../store/authSlice'
import toast from 'react-hot-toast'
import { IoIosLogOut } from "react-icons/io";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            toast.success("Logout successfully")
        })
    }
  return (
    <Tippy placement='right' content={<span style={{color: 'white'}}>Logout</span>} >
    <div
    onClick={logoutHandler}
    className="flex items-center justify-center p-2 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer transition-colors duration-200"
  >
    <IoIosLogOut className="text-2xl" />
  </div>
  </Tippy>
 
  )
}

export default LogoutBtn