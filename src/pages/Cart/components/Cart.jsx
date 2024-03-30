import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { ShopingCartContext } from '../../../components/Context/ShopingCart';
import { CiSquareRemove } from "react-icons/ci";
import Products from './../../Products/components/Products';
import './Cart.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../components/Context/User';
import LoaderBtn from '../../../components/Loader/LoaderBtn';
import {  Zoom, toast } from 'react-toastify';
import Loader from '../../../components/Loader/Loader';

const Cart = () => {
  const navigate= useNavigate();
    const {cartItems,countItems,setCountItems, getProductsInCart    }=useContext(ShopingCartContext);
    const {userToken}=useContext(UserContext)
    const[loaderBtn,setLoaderBtn]=useState(false)
    const[loaderBtn1,setLoaderBtn1]=useState(false)
    const[loaderBtnInc,setLoaderBtnInc]=useState(false)
    const[loaderBtnDec,setLoaderBtnDec]=useState(false)
    const [quantity,setQuantity]=useState(0);
    const removeItem=async (id)=>{
      try{
        setLoaderBtn(true)
      const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,{
        productId: id


      },{
        headers: { Authorization: `Tariq__${userToken}` }
      });
      getProductsInCart();
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
    }finally{
      setLoaderBtn(false)
    }

  }
  const clearAll=async()=>{
    
    try{
      setLoaderBtn1(true)

      const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,null,{
      headers: { Authorization: `Tariq__${userToken}` }
    })
    getProductsInCart();
    toast.success('you are deleted all items successfully 👌', {
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
  }finally {
setLoaderBtn1(false);
  }
  }
  const increaseQuantity=async(id)=>{
   try {
    setLoaderBtnInc(true);
     const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,{
      productId: id
    },{
      headers: { Authorization: `Tariq__${userToken}` }
    })
    getProductsInCart();
    
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
  }finally{
setLoaderBtnInc(false)
  }
   
    }
 

  const decreaseQuantity=async(id)=>{
    try{
      setLoaderBtnDec(true)
    const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,{
      productId: id
    },{
      headers: { Authorization: `Tariq__${userToken}` }
    })
    getProductsInCart();
  }catch(error){
  }finally{
    setLoaderBtnDec(false)
  }
 
  }
   const subTotal=(price,quantity)=>(
     price*quantity
  )
  const handelOrder=(items)=>{
    navigate(`/order`)
  }
  return (
    <>
    
<h2 className='container text-center py-3'>Shopping Cart</h2>
<div className='container'>
  {cartItems.map((item,index)=>(
    <div  className='bg-white border border-danger shadow p-3 mb-5 bg-body rounded rounded py-4 px-3 m-3 row' key={item._id}>
  <div className="col-lg-4 col-md-4 col-12 d-flex">
    <img src={item.details.mainImage.secure_url} className=" rounded mainImage"/>
  </div>
  <div className="col-lg-8 col-md-8 col-12">
  <h4>{item.details.name}</h4>
<h5>Price : {item.details.finalPrice} $</h5>
<div className='d-flex justify-content-between align-items-center w-25 mt-3'>
  <button type="submit" className="bg-danger text-white border border-danger px-3 fw-bold rounded" onClick={()=>decreaseQuantity(item.productId)}disabled={loaderBtnDec?'disabled':''}>{loaderBtnDec?<LoaderBtn/>:'-'}</button>
<h2 className='px-4'>{item.quantity}</h2>
<button type="submit" className="bg-danger text-white  border border-danger px-3 fw-bold rounded" onClick={()=>increaseQuantity(item.productId)}disabled={loaderBtnInc?'disabled':''}>{loaderBtnInc?<LoaderBtn/>:'+'}</button>

  </div>
  <button type="submit" className="bg-danger text-white border border-danger fw-bold mt-4 rounded w-25" onClick={()=>removeItem(item.productId)} disabled={loaderBtn?'disabled':''}>{loaderBtn?<LoaderBtn/>:'Remove'} <CiSquareRemove size={30} />
</button>

<div className='d-flex justify-content-end fw-bold fs-5'>Sub Total price: {subTotal(item.details.finalPrice,item.quantity)}$</div>

  </div>
    </div>
    
    ))}
</div>
<p className='d-flex justify-content-center pb-2 fw-bold fs-4'>Total Price:{}</p>
<div className='container d-flex justify-content-center '><button type="submit" className="bg-danger text-white border border-danger fw-bold mb-5 py-2 rounded w-25" onClick={clearAll} disabled={loaderBtn1?'disabled':''} >{loaderBtn1?<LoaderBtn/>:countItems>0?'Clear All':'Your cart is empty '}</button></div>
<div className='container d-flex justify-content-center '><button type="submit" className="bg-danger text-white border border-danger fw-bold mb-5 py-2 rounded w-25" onClick={()=>handelOrder(cartItems)} disabled={loaderBtn1?'disabled':''}>{loaderBtn1?<LoaderBtn/>:countItems>0?'Check out':'Your cart is empty '}</button></div>
    </>
  )
}

export default Cart