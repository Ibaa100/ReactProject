import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../../../components/Context/User'
import {  Zoom, toast } from 'react-toastify';
import Loader from '../../../components/Loader/Loader';

const InfoUser = () => {
  const {userToken}=useContext(UserContext)
  const [loader,setLoader]=useState(false)
  const [user,setUser]=useState({
    userName: '',
    image: '',
    email: '',
  });
  const getProfileInfo=async ()=>{
    try{
      setLoader(true)
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,{
      headers: { Authorization: `Tariq__${userToken}` }
    })
    setUser({
      userName: data.user.userName,
      image: data.user.image.secure_url,
      email: data.user.email

    })

  }catch(error){
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

  }finally {
    setLoader(false)
  }
  }
  useEffect(()=>{
    getProfileInfo();

  },[userToken])
  if(loader){
    return <Loader/>
  }
  return (
    <div className='container d-flex  align-items-center flex-column pt-5'>
    <img src={user.image} className='rounded-circle mt-5 border border-danger shadow-lg mb-5  ' width={"200px"} height={"200px"}/>
    <h2 className='pt-3'>{user.userName}</h2>
    <p className='fw-bold'>Lorem ipsum dolor sit amet consectetur.</p>
    <p className='fw-bold'>My Email : {user.email} </p>
    </div>
  )
}

export default InfoUser