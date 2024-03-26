import React, { useContext,useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../../../components/Context/User'
import {  Zoom, toast } from 'react-toastify';
import { FaWindowClose } from "react-icons/fa";
import Loader from '../../../components/Loader/Loader';

const MyOrder = () => {
  const { userToken } = useContext(UserContext);
  const[orders,setOrders]=useState([]);
  const [loader,setLoader]=useState(false);
    const getOrders=async ()=>{
    try{
      setLoader(true)
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/order`,{
      headers: { Authorization: `Tariq__${userToken}` }
    })
    setOrders(data.orders)
    

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
    getOrders();

  },[userToken]);
  const deleteOrder=async (id)=>{
   try{
      await axios.patch(
      `${import.meta.env.VITE_API_URL}/order/cancel/${id}`,{},{
        headers: { Authorization: `Tariq__${userToken}` }
      }
    );
    toast.success('you are deleted item successfully 👌', {
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
  }

  }
  if(loader){
    return <Loader/>
  }
  return (
    <div className='d-flex flex-column align-items-center  '>

      {orders.map((item,index)=>(
        <div key={item._id} className='rounded border border-danger my-2 w-75  shadow mb-5'>
                <FaWindowClose className='text-start px-2 ' size={40} onClick={()=>deleteOrder(item._id)} />

          <h6 className='text-center'>Order {index+1}</h6>
        <p className='fw-bold text-center'>To {item.address}</p>
        <div className='d-flex justify-content-center flex-wrap'>{
        item.products.map((product)=>(
          <div className='px-3' key={product._id}>
            <img src={product.productId.mainImage.secure_url} alt="" className='rounded-circle border border-danger' width={"90px"} height={"90px"}/>
            <p className='bg-danger text-white fw-bold rounded  px-1'>quantity: {product.quantity}</p>
            <p className='bg-danger text-white fw-bold rounded  px-1'>price: {product.finalPrice}$</p>
          </div>
        ))
}</div>
<p className='text-end fw-bold px-3'>Total Price : {item.finalPrice}$</p>
<p className='text-end fw-bold px-3'>Status : {item.status}</p>
        </div>
      ))}
    </div>
  )
}

export default MyOrder