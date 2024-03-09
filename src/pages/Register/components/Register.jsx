import React, { useState } from 'react'
import './Register.css'
import { NavLink, Navigate } from 'react-router-dom';
import axios from 'axios';
import { object, string } from 'yup';
import {  Zoom, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader/Loader';
import LoaderBtn from '../../../components/Loader/LoaderBtn';
const Register = () => {
  const navigate=useNavigate();
  const [user,setUser]=useState({
    userName:'',
    email:'',
    password:'',
    image:'',
  });
  const [errors,setErrors]=useState([]);
  const [loader,setLoader]=useState(false);
const handelChange=(e)=>{
  const {name,value}=e.target;
  setUser({
    ...user,
    [name]: value,
   } );
}
const handelImageChange=(e)=>{
  const{name,files}=e.target;
  setUser(
    {
      ...user,
      [name]:files[0]
    }
  )
}
const validateData=async()=>{
  const registerSchema=object({
    userName: string().min(4).max(10).required('please enter userName'),
    email: string().email().required('please enter email'),
    password:string().min(8).max(20).required('please enter password'),
    image:string().required(),
});
try{
  await registerSchema.validate(user,{abortEarly:false});
  return true;

}catch(error){
  setErrors(error.errors);
  const validationErrors={};
  error.inner.forEach(err=>{
    validationErrors[err.path]=err.message;
    setErrors(validationErrors);
  });
  setLoader(false);
}
}
const handelSubmit=async(e)=>{
  e.preventDefault();
  setLoader(true);
  try{
    if(await validateData()){
      const formData=new FormData();
      formData.append('userName',user.userName);
      formData.append('email',user.email);
      formData.append('password',user.password);
      formData.append('image',user.image);
      const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,formData);
      if(data.message=='success'){

          toast.success('you are created account successfully 👌', {
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
    if(error.response.status===409){
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
        userName: '',
        email:'',
        password:'',
        image: '',
      }
    );
    setLoader(false);
  }

  
}
  return (
<section className="d-flex justify-content-center pt-2">
  <div className=" d-flex align-items-center  ">
    
          <div className="card shadow-lg p-2 mb-3 bg-light-subtle rounded " style={{borderRadius: 15}}>
            <div className="card-body pt-2 px-5">
              <h4 className=" text-center mb-3">Create an account</h4>
              <form onSubmit={handelSubmit}>
                <div className="form-outline mb-2">
                <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                  <input type="text" id="form3Example1cg" className="form-control form-control-lg" name="userName" onChange={handelChange} value={user.userName} />
                <p className='text-danger'>{errors.userName}</p>
                </div>
                <div className="form-outline mb-2">
                <label className="form-label" htmlFor="form3Example2cg">Your Email</label>
                  <input type="email" id="form3Example2cg" className="form-control form-control-lg" name="email" onChange={handelChange} value={user.email}/>
                  <p className='text-danger'>{errors.email}</p>
                </div>
                <div className="form-outline mb-2">
                <label className="form-label" htmlFor="form3Example3cg">Password</label>
                  <input type="password" id="form3Example3cg" className="form-control form-control-lg" name="password"onChange={handelChange} value={user.password}/>
                  <p className='text-danger'>{errors.password}</p>

                </div>
                <div className="form-outline mb-2">
                <label className="form-label" htmlFor="form3Example4cdg">Your image</label>
                  <input type="file" id="form3Example4cdg" className="form-control form-control-lg" name="image" onChange={handelImageChange}/>
                  <p className='text-danger'>{errors.image}</p>

                </div>
                <div className="form-check d-flex justify-content-center mb-2">
                  <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example5g" />
                  <label className="form-check-label" htmlFor="form2Example5g">
                    I agree all statements in <NavLink href="#!" className="text-body"><u>Terms of service</u></NavLink>
                  </label>
                </div>
                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-danger btn-lg " disabled={loader?'disabled':''} >{loader?<LoaderBtn/>:'Register'}</button>
                </div>
                <p className="text-center text-muted mt-2 mb-0">Have already an account? <NavLink to="/login" className="fw-bold text-body"><u>Login here</u></NavLink></p>
              </form>
            </div>
          </div>

  </div>
</section>
 )
}

export default Register