import React from 'react'
import './Profile.css'

import { Outlet } from 'react-router-dom';
import MainProfile from '../../MainProfile/components/MainProfile';
const Profile = () => {
  return (
    <>
    <div className='d-flex flex-row'>
     <MainProfile/>
    <div className=' col-lg-10 col-md-8 col-6 '><Outlet/></div>

    </div>
    </>
  )
}

export default Profile