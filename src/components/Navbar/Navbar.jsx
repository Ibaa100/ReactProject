import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Register from '../../pages/Register/components/Register';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";

const Navbar = () => {
  const navigate=useNavigate();
  // Initialization for ES Users
  const handleRegisterButtonClick=()=>{
    navigate("/register")
}
const handleLoginButtonClick=()=>{
  navigate("/login")
}

  return (
    <>
   <div className="header-light bg-white sticky-top">
  <nav className="navbar bg-white  ">
    <div className="container">
    <form className="d-flex" role="search">
  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
  <button id="search-button" type="button" className="btn btn-danger btn-gradient">
  <FaSearch />
    </button>
</form> 
      <NavLink className="navbar-brand " to="/">
        <img src="../../logo.png" alt="Bootstrap" width={240} height={45} />
      </NavLink>

      <div className="d-grid  d-md-block">
  <button className="btn btn-danger me-md-2 reg" type="button" onClick={handleRegisterButtonClick}>Register</button>
  <button className="btn btn-outline-danger log" type="button" onClick={handleLoginButtonClick}>Login</button>
  <div className='d-flex icon d-none '>
  <FaRegUser className='  me-md-2' size={30}/>
  <MdNotificationsActive className='  me-md-2' size={30} />
  <IoIosSettings className='  me-md-2' size={30}/>

  </div>


</div>
    </div>
  </nav>
  <nav className="navbar navbar-expand-lg bg-white border-top border-danger shadow-sm">
  <div className="container">
    <NavLink className="navbar-brand " to="/">Capital shop</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item mx-4">
          <NavLink className="nav-link fw-bold active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item mx-2">
          <NavLink className="nav-link fw-bold" to="/about">About us</NavLink>
        </li> 
        
        <li className=" position-relative mx-2">
        <NavLink className="nav-link fw-bold" to="/products">Products <span className="position-absolute start-100 translate-middle badge rounded-pill text-bg-danger">New <span className="visually-hidden">unread </span></span></NavLink>
</li>
<li className="nav-item mx-2">
          <NavLink className="nav-link fw-bold" to="/categories">Categories </NavLink>
        </li> 
        
        <li className="nav-item mx-2">
          <NavLink className="nav-link fw-bold" to="/contact">contact us</NavLink>
        </li>
      </ul>

      <NavLink className="d-flex w-20 h-40 link-danger " to="/cart">
      <FaCartArrowDown size={30}/>
 
      </NavLink>
    </div>
  </div>
</nav>


</div>


    </>
  )
}

export default Navbar