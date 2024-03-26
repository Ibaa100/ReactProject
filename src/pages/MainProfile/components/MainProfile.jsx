import React from 'react'
import { FaClipboardUser } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaCarTunnel } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
const MainProfile = () => {
  return (
    <div className=' bg-black text-white side col-lg-2 col-md-4 col-6 p-2 py-3 d-flex flex-column justify-content-start profile' >
    <NavLink className=' nav-link py-3 text-white 'to= "/profile/"><FaClipboardUser size={40} className='px-2'/>My Profile</NavLink>
    <NavLink className='nav-link py-3 text-white' to="/profile/contact"><BsFillTelephoneFill size={40} className='px-2'/>Contact</NavLink>
    <NavLink className='nav-link py-3 text-white ' to="/profile/order"><FaCarTunnel size={40} className='px-2'/>My Orders</NavLink>
    </div>
  )
}

export default MainProfile