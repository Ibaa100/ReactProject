import React from 'react'
import { NavLink } from 'react-router-dom'
const ErrorLoad = () => {
  return (
    <>
    <div className="d-flex align-items-center justify-content-center vh-100">
  <div className="text-center">
    <h1 className="display-1 fw-bold">404</h1>
    <p className="fs-3"> <span className="text-danger">Opps!</span> Error to load data.</p>
    <p className="lead">
      The data you’re looking for doesn’t exist.
    </p>
    <NavLink to="/home" className="btn btn-danger">Go Home</NavLink>
  </div>
</div>
    </>
  )
}

export default ErrorLoad