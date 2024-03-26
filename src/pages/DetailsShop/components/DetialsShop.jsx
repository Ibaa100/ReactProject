import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { LiaCcAmazonPay } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";

const DetialsShop = () => {
  return (
    <div className='d-flex flex-wrap justify-content-center align-items-center text-center bg-black text-white py-5' >
        <div className='d-flex flex-column px-5 align-items-center border-end border-white '>
        <TbTruckDelivery size={60} className=''/>
<h3>Fast & Free Delivery </h3>
        </div>
        <div className='d-flex flex-column px-5 align-items-center border-end border-white'>
        <LiaCcAmazonPay size={60}/>
<h3>Secure Payment </h3>
        </div>
        <div className='d-flex flex-column px-5 align-items-center '>
        <BiSupport size={60}/>
<h3>Online Support </h3>
        </div>
        
    </div>
  )
}

export default DetialsShop