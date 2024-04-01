import React from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { IoClose } from 'react-icons/io5';
import { FaClipboardUser } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaCarTunnel } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import './Root.css'
const Root = ({userName}) => {

  return (
    

    
<div className="d-flex flex-column content">
    <Navbar userName={userName} />
    <Outlet/>
    <Footer/>
    </div>
 
      )
}

export default Root