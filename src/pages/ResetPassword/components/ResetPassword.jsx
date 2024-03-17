import React, { useState } from 'react'
import './ResetPassword.css'
import LoaderBtn from '../../../components/Loader/LoaderBtn';
import axios from 'axios';
import { object, string } from 'yup';
import {  Zoom, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const ResetPassword = () => {
  const navigate=useNavigate();
  const [errors,setErrors]=useState([]);
  const[loader,setLoader]=useState(false);
  const[user,setUser]=useState({
    email: '',
    password:'',
    code:''
  })
  useEffect(() => {
    // Retrieve the item from local storage
    const storedItem = localStorage.getItem('email');

    // Update state with the retrieved item
    setUser({
      ...user,
      ['email']:storedItem
    });
  }, []);
  const handelChange=(e)=>{
    const{name,value}=e.target;
    setUser({
      ...user,
      [name]:value,
    }
    )
  }

  const validateData=async ()=>{
    const resetSchema=object({
      email:string().email().required('please enter email'),
      password:string().min(8).max(20).required('please enter password'),
      code:string().min(4).max(4).required('please enter your code'),
    });
    try{
      await resetSchema.validate(user,{abortEarly:false});
      return true;
    }catch(error){
      setErrors(error.errors);
      const validationErrors={};
      error.inner.forEach(
        err=>{
          validationErrors[err.path]=err.message;
          setErrors(validationErrors);
        }
      );
      return false;
    }
  }
  const handelSubmit=async(e)=>{
    
    e.preventDefault();
    setLoader(true);
try{
    if(validateData()){
    const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,{
      email: user.email,
      password:user.password,
      code:user.code
    });
    if(data.message=='success'){

      toast.success('you are reset password successfully 👌', {
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
  }
}catch(error){
    if(error.response.status===400)
    toast.error(error.response.data.message+" please check your email", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Zoom,
      });
  }finally{
    setLoader(false);
  }
    
}
  return (
    <div className="d-flex justify-content-center  align-items-center containerComponent">
    <section className="d-flex justify-content-center  align-items-center " >
      <div className=" d-flex align-items-center  ">
        
              <div className="card shadow-lg p-2 mb-3 bg-light-subtle rounded " style={{borderRadius: 15}}>
                <div className="card-body pt-2 px-5">
                  <h4 className=" text-center mb-3">Reset password</h4>
                  <form onSubmit={handelSubmit}>
                    <div className="form-outline my-4">
                    <label className="form-label" htmlFor="form3Example2cg">Your Email</label>
                      <input type="email" id="form3Example2cg" className="form-control form-control-lg" name="email" value={user.email} readOnly/>
                      <p className='text-danger'>{errors.email}</p>
                    </div>
                    <div className="form-outline my-4">
                    <label className="form-label" htmlFor="form3Example3cg">new password</label>
                      <input type="password" id="form3Example3cg" className="form-control form-control-lg" name="password" onChange={handelChange} value={user.password}/>
                      <p className='text-danger'>{errors.password}</p>
                    </div>
                    <div className="form-outline my-4">
                    <label className="form-label" htmlFor="form3Example4cg">code</label>
                      <input type="text" id="form3Example4cg" className="form-control form-control-lg" name="code" onChange={handelChange} vlaue={user.code}/>
                      <p className='text-danger'>{errors.code}</p>
                    </div>
                    
                    <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-danger btn-lg " disabled={loader?'disabled':''} >{loader?<LoaderBtn/>:'Reset'}</button>
                    </div>
                  </form>
                </div>
              </div>
    
      </div>
    </section>
    </div>
      )
}

export default ResetPassword