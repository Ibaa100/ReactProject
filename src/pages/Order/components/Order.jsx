import React, { useContext, useState } from 'react'
import { ShopingCartContext } from '../../../components/Context/ShopingCart'
import { UserContext } from '../../../components/Context/User';
import axios from 'axios';
import {Zoom, toast } from 'react-toastify';
const Order = () => {
    const {userToken}=useContext(UserContext);
    const{cartItems}=useContext(ShopingCartContext)
    const [order , setOrder]=useState({
        couponName: '',
        address: '',
        phone:'',
    });
    const handelChange=(e)=>{
        const{name,value}=e.target;
        setOrder(
            {
                ...order,
                [name]:value
            }
        )
       
    }
    const handelSubmit=async (e)=>{
        e.preventDefault();
        try{
        var {data}=await axios.post(`${import.meta.env.VITE_API_URL}/order`,{
          couponName: order.couponName,
          address: order.address,
          phone: order.phone
        },{
          headers: { Authorization: `Tariq__${userToken}` }

    });
    toast.success('pleaze wait for checkout your order by admin 👌', {
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
      setOrder({
        couponName:'',
        address:'',
        phone:''
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
  }

    }
  return (
    <>
    <h2 className="text-center pt-4">Our Order</h2>
    
    <div className='container shadow py-5 mb-5 bg-body-white rounded '>
        <div className='  d-flex justify-content-between  flex-wrap'>
 {cartItems.map((item)=>(
    <div  className='d-flex flex-column mb-3  align-items-center col-lg-3 col-md-4 col-sm-6 col-12 position-relative ' key={item.productId}>
        <img src={item.details.mainImage.secure_url} className='rounded-circle border border-danger ' width={'200px'} height={'200px'}/>
        <h4 className='text-center'>{item.details.name}</h4>
        <span className='fw-bold position-absolute top-50 bg-danger rounded text-white px-2'>quantity: {item.quantity}</span>
        </div>
))}
        </div>
    </div>
    <section className="d-flex justify-content-center  ">
    <div className=" d-flex align-items-center  ">
      
            <div className="card shadow-lg p-3 mb-5 bg-light-subtle rounded  border border-danger" style={{borderRadius: 15}}>
              <div className="card-body pt-3 px-5">
                <h4 className=" text-center mb-4">Create Order </h4>
                <form onSubmit={handelSubmit}>
                  <div className="form-outline mb-2">
                  <label className="form-label fw-bold" htmlFor="form5Example3cg">Coupoun Name</label>
                    <input type="text" id="form5Example3cg" className="form-control form-control-lg border border-danger " name="couponName" onChange={handelChange} value={order.couponName}/>
                  </div>
                  <div className="form-outline mb-2">
                  <label className="form-label fw-bold" htmlFor="form5Example4cg">Address</label>
                    <input type="text" id="form5Example4cg" className="form-control form-control-lg border border-danger" name="address"  onChange={handelChange} value={order.address}/>
                  </div> 
                  <div className="form-outline mb-2">
                  <label className="form-label fw-bold" htmlFor="form5Example4cg">Phone</label>
                    <input type="text" id="form5Example4cg" className="form-control form-control-lg border border-danger" name="phone" onChange={handelChange} value={order.phone} />
                  </div> 
                  <div className="d-flex justify-content-center my-4">
                  <button type="submit" className="btn btn-danger btn-lg  " >Send Order</button>
                  </div>
                </form>
              </div>
            </div>
  
    </div>
  </section>
    </>
    
  )
}

export default Order