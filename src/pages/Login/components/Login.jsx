import React, { useContext, useState } from 'react'
import './Login.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import {  Zoom, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoaderBtn from '../../../components/Loader/LoaderBtn';
import { UserContext } from '../../../components/Context/User';
const Login = () => {
  const {setUserToken}=useContext(UserContext)
  const[loader,setLoader]=useState(false);
 const navigate=useNavigate();
  const [user,setUser]=useState({
    email:'',
    password:''
  });
  const handelChange=(e)=>{
    const {name,value}=e.target;
    setUser(
      {
        ...user,
        [name]:value
      }
    )
  }
  const handelSubmit=async(e)=>{
    e.preventDefault();
    setLoader(true);
    try{
      const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,{
        email: user.email,
        password:user.password
      });
      if(data.message=='success'){
        toast.success('you are login successfully 👌', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
          });
          localStorage.setItem('userToken',data.token);
          localStorage.setItem('email',user.email);
          setUserToken(data.token);
          navigate('/');
          {
            const reg=document.querySelector('.reg');
            const log=document.querySelector('.log');
            const icon=document.querySelector('.icon');
            reg.classList.toggle('d-none');
            log.classList.toggle('d-none');
            icon.classList.toggle('d-none');
            
          }
    }
    }catch(error){
      if (error.response && error.response.data && error.response.data.message) {
      
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
          });
        }
          setUser(
            {
              email:'',
              password:'',
            }
          )
      
    }
    finally{
      setLoader(false);
    }
     
  }
  return (
    <div className="d-flex justify-content-center  align-items-center containerComponent">

    <section className="d-flex justify-content-center  ">
    <div className=" d-flex align-items-center  ">
      
            <div className="card shadow-lg p-3 mb-5 bg-light-subtle rounded " style={{borderRadius: 15}}>
              <div className="card-body pt-3 px-5">
                <h4 className=" text-center mb-4">Login </h4>
                <form onSubmit={ handelSubmit}>
                  <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="form5Example3cg">Your Email</label>
                    <input type="email" id="form5Example3cg" className="form-control form-control-lg" name="email" onChange={handelChange} value={user.email} />
                  </div>
                  <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="form5Example4cg">Password</label>
                    <input type="password" id="form5Example4cg" className="form-control form-control-lg" name="password" onChange={handelChange} value={user.password} />
                    <NavLink to="/sendcode" className="text-danger fw-bold">Forgret your password</NavLink><span className="text-danger fw-bold">?</span>
                  </div> 
                  <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-danger btn-lg  " disabled={loader?'disabled':''}>{loader?<LoaderBtn/>:'login'}</button>
                  </div>
                  <p className="text-center text-muted mt-2 mb-0">Don't Have an account? <NavLink to="/register" className="fw-bold text-body"><u>Register here</u></NavLink></p>
                </form>
              </div>
            </div>
  
    </div>
  </section>
  </div>
  )
}

export default Login