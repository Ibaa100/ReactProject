import React from 'react'
import './Footer.css'
import { FaLocationDot } from "react-icons/fa6";
import { IoMailUnread } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";

import { NavLink } from 'react-router-dom'
const Footer = () => {
  return (
    <div className="bg-black mt-5 mainFooter d-flex justify-content-between align-items-center flex-column">
  <div className="container d-flex ">
  <div className="col-4 d-flex flex-column justify-content-start align-items-center pt-4">
    <img src="../../logoFooter.jpg" alt="" className='rounded-circle' width={"50px"} height={"50px"}/>
    <span className='text-white fw-bold'>Big Bug Shop</span>
   <div className='pt-3 d-flex flex-column colorAbout'>
   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi perferendis quae ipsa molestias incidunt debitis labore? Possimus, eos quibusdam! Sit, doloribus! Fugit, culpa. Delectus consequuntur officia assumenda eos tempore, non iusto magni unde explicabo labore.
   </div>
       
    
  </div>
  <div className="col-4 d-flex flex-column justify-content-start align-items-center pt-4">
    <h4 className='text-white pt-4'>
      Quick Links
    </h4>
    <div className='pt-3 d-flex flex-column'>

    <NavLink className="text-decoration-none text-white text-center pb-2 listitem" to="/">Home</NavLink>
     
     <NavLink className="text-decoration-none text-white text-center  pb-2 listitem" to="/about">About Us</NavLink>

     <NavLink className="text-decoration-none text-white text-center  pb-2 listitem" to="">Products</NavLink>
   
     <NavLink className="text-decoration-none text-white text-center  pb-2 listitem" to="/profile">Profile</NavLink>
     </div>
     </div>
     <div className="col-4 d-flex flex-column justify-content-start align-items-center pt-4">
    <h4 className='text-white pt-4'>
      Our Information
    </h4>
    <div className='pt-3 d-flex flex-column '>

    <span className=" text-white text-center pb-2 listitem" ><FaLocationDot className='text-white px-1' size={25}/> Hebron - Palestine</span>
     
     <span className=" text-white text-center  pb-2 listitem" > <BsFillTelephoneFill className="text-white px-1" size={25}/> +972454565544</span>

     <span className=" text-white text-center  pb-2 listitem" ><IoMailUnread className='text-white px-1' size={25}/> BigBug@gmail.com</span>
   
     </div>
     </div>
</div>
<span className='text-white'>Copy right <span className='text-danger'> &#169; </span>2024, All reserved of BigBug</span>
    </div>
  
  )
}

export default Footer