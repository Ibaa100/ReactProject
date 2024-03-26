import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { AiOutlineInstagram } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../components/Context/User';
const Contact = () => {
  const email=localStorage.getItem('email')
  const {userName}=useContext(UserContext)

  return (
    <>
    <h2 className='text-center px-4 w-100 pt-5'>Contact With Me</h2>

    <div className="d-flex justify-content-center flex-wrap">
      <NavLink className='px-4 text-center py-5 mt-5 text-decoration-none text-black '>
      <FaWhatsapp size={60}  className='text-danger'/>
      <p className='pt-3 fw-bold'>0599438649</p>
      </NavLink>
      <NavLink className='px-4 text-center py-5 mt-5 text-decoration-none text-black '>
      <MdAttachEmail  size={60} className='text-danger'/>
      <p className='pt-3 fw-bold'>{email}</p>
      </NavLink>
      <NavLink className='px-4 text-center py-5 mt-5 text-decoration-none text-black '>
      <AiOutlineInstagram  size={60} className='text-danger'/>
      <p className='pt-3 fw-bold'>{userName}</p>
      </NavLink>
    </div>
    </>
  )
}

export default Contact