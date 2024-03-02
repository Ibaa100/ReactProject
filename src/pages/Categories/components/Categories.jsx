import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import './Categories.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {EffectCoverflow, Navigation, Pagination, A11y } from 'swiper/modules';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const Categories = () => {
  const[categories,setCategories]=useState([]);
  const getCategories=async ()=>{
    const {data}=await axios.get(`http://ecommerce-node4.vercel.app/categories/active?page=1&limit=9`);
    setCategories(data.categories);
  }
  useEffect(()=>{
    getCategories();
  },[])
  return (
    <>
     {categories.map(category=>
      <div key={category.id} >
      <img src={category.image.secure_url} className='swiper-img' />
      </div>
    )}
     {/* <Swiper  
      modules={[EffectCoverflow,Navigation, Pagination, A11y]} 
      effect={'coverflow'}
       coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      spaceBetween={10}
      slidesPerView={4}
      pagination={{ clickable: true }}
      centeredSlides={true}
      loop={true}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        clickable: true,
      }}
      >
      {categories.map(category=>
      <SwiperSlide key={category.id} >
      <img src={category.image.secure_url} className='swiper-img' />
      </SwiperSlide>
    )}
<div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
          <FaArrowAltCircleLeft size={5}/>
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next slider-arrow">
          <FaArrowAltCircleRight size={5}/>
          </div>
        </div>

    </Swiper>
   */}
    
    </>
  )
}

export default Categories