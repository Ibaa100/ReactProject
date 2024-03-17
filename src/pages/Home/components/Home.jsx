import React from 'react'
import Categories from '../../Categories/components/Categories'
import './Home.css'
import Footer from '../../../components/Footer/Footer'
const Home = () => {
  return (
    <>
    <div className="bg-black w-100 compo hero d-flex justify-content-center align-items-center" >
      <div className="text-center text-white ">
        <h1 className='fs-2'>Capital Store</h1>
        <p className=' w-50 m-auto p-4 fs-4'>We hope you <span className='text-danger fw-bold'>enjoy</span> browsing our new collection with <span className="text-danger fw-bold">ease</span> and <span className="text-danger fw-bold">comfort</span>. </p>
        <a href="/products"className=' rounded-pill text-decoration-none bg-danger text-white px-4 py-2 fw-bold'>Shop Now</a>
      </div>
      </div>
    <Categories/>
    <Footer/>
    </>
  )
}

export default Home