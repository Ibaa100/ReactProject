import React from 'react'
import { Navigate } from 'react-router-dom';
const ProtectedRoutes = ({children}) => {
    const token=localStorage.getItem('userToken');
    if(token){
        return children;
    }
  return <Navigate to="/login"/>
}

export default ProtectedRoutes