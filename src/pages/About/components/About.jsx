import React from 'react'
import './About.css'
import { FaShopify } from "react-icons/fa";

const About = () => {
  return (
    <div className='d-flex flex-column'>
      <h3 className='text-center py-4 mt-5'>About <span className='text-danger fw-bold'>BIGBUG</span> Shop</h3>
      <div className="d-flex flex-column container">
        <div className="d-flex">
        <div className="bg-image col-lg-8 col-md-6 position-relative " >
          <img src="../../../women2.jpg" alt="" width={"90%"} height={"500px"} className='rounded  ' />
          <div className="overlay position-absolute top-0 left-0  ">
            <p className='fw-bold text-white'>Women clothes</p>
          </div>
        </div>
        <p className=' col-lg-4 col-md-6  fs-5 fw-bold text-center itemCenter'>At <span className='text-danger '>BIGBUG</span> Store, we are passionate about providing high-quality products and excellent customer service to our valued customers.</p>
        </div>
        <div className="d-flex justify-centent-between align-items-center">
        <p className='col-lg-8 col-md-6 fs-5 fw-bold text-center '> We are always looking for new ways to improve our products and services.</p>

        <div className="bg-image col-lg-4 col-md-6  d-flex  position-relative" >
          <img src="../../../wmoen1.jpg" alt="" width={"80%"} height={"350px"} className='rounded  ' />
          <div className="overlay2 position-absolute top-0 left-0  ">
            <p className='fw-bold text-white'>Women clothes</p>
          </div>
          </div>
          </div>
        <div className="d-flex">
        <div className="bg-image col-lg-8 col-md-6  position-relative" >
          <img src="../../../man1.jpg" alt="" width={"90%"} height={"500px"} className='rounded ' />
          <div className="overlay position-absolute top-0 left-0 ">
            <p className='fw-bold text-white'>Man clothes</p>
          </div>
        </div>
        <p className=' col-lg-4 col-md-6 fs-5 fw-bold text-center itemCenter'>We are a <span className='text-danger'>fast-growing</span>  company, but we have never lost sight of our core values. We believe in collaboration, innovation, and customer satisfaction.</p>
        </div>
        <div className="d-flex">
        <div className='col-lg-8 col-md-6 fs-5 fw-bold text-start itemCenter2'> <p>Our company is guided by the following core values:</p>
        <ul>
            <li><FaShopify /> Customer satisfaction</li>
            <li><FaShopify /> Product quality and reliability</li>
            <li><FaShopify /> Integrity and transparency</li>
            <li><FaShopify /> Continuous improvement and innovation</li>
        </ul></div>

        <div className="bg-image col-lg-4 col-md-6  d-flex position-relative" >
          <img src="../../../man2.jpg" alt="" width={"80%"} height={"350px"} className='rounded ' />
          <div className="overlay2  position-absolute top-0 end-0 ">
            <p className='fw-bold text-white'>Man clothes</p>
          </div>
          </div>
          </div>
      </div>
    </div>
  )
}

export default About