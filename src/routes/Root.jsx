import React from 'react'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
const Root = ({userName}) => {
  return (
    <>
    <Navbar userName={userName}/>
    <Outlet/>
    </>
  )
}

export default Root