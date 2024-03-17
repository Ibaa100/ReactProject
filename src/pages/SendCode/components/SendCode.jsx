import React, { useState } from 'react';
import './SendCode.css';
import {  Zoom, toast } from 'react-toastify';
import axios from 'axios';
import LoaderBtn from '../../../components/Loader/LoaderBtn';
import { useNavigate } from 'react-router-dom';

const SendCode = () => {
  const [loader,setLoader]=useState(false);
  const [email,setEmail]=useState('');
  const navigate=useNavigate();
  const handelChange=(e)=>{
    setEmail(e.target.value)
    console.log(e.target.value);
  }

  const handelSubmit=async(e)=>{
    e.preventDefault();
    setLoader(true);
    try{
    const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,{
      email:email
    });
    if(data.message==='success'){
      localStorage.setItem('email',email);
      toast.success('please check your email to get code 👌', {
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
        navigate('/resetpassword')
    }

    }catch(error){
      console.log(error.response.data.message)
          toast.error(error.response.data.message, {
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
              <h4 className=" text-center mb-3">Send Code</h4>
              <form onSubmit={handelSubmit}>
                <div className="form-outline my-4">
                <label className="form-label" htmlFor="form3Example2cg" >Your Email</label>
                  <input type="email" id="form3Example2cg" className="form-control form-control-lg"   name="email" onChange={handelChange} value={email} />
                  <p className='text-danger'></p>
                </div>
                
                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-danger btn-lg " disable={loader?'disabled':''} >{loader?<LoaderBtn/>:'send code'}</button>
                </div>
              </form>
            </div>
          </div>

  </div>
</section>
</div>
 )
}

export default SendCode