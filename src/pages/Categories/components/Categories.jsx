import axios from 'axios';
import './Categories.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { useEffect } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './Categories.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

const Categories = () => {
  const[categories,setCategories]=useState([]);
  const getCategories=async ()=>{
    const {data}=await axios.get(`https://ecommerce-node4.vercel.app/categories/active?page=1&limit=9`);
    setCategories(data.categories);
  }
  useEffect(()=>{
    getCategories();
  },[])
  return (
    <>
    <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {categories.map(category=>
      <SwiperSlide key={category.id} >
      <img src={category.image.secure_url}  />
      </SwiperSlide>
    )}
      </Swiper>
    
    </>
  )
}

export default Categories