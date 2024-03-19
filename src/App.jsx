import React, { useState } from 'react'
import Root from './routes/Root';
import  Home from './pages/Home/components/Home.jsx'
import Products from './pages/Products/components/Products.jsx';
import Categories from './pages/Categories/components/Categories.jsx';
import Login from './pages/Login/components/Login.jsx';
import Register from './pages/Register/components/Register.jsx';
import Contact from './pages/Contact/components/Contact.jsx';
import About from './pages/About/components/About.jsx'
import Cart from './pages/Cart/components/Cart.jsx'
import NotFound from './components/NotFound.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import SendCode from './pages/SendCode/components/SendCode';
import ResetPassword from './pages/ResetPassword/components/ResetPassword.jsx';
import Detials from './pages/Detials/components/Detials.jsx';
import UserContextProvider from './components/Context/User.jsx';
const App = () => {
  const[userName,setUserName]=useState([])
  const router = createBrowserRouter([
    {
    path: "/",
    element:<Root userName={userName}/>,
    errorElement:<NotFound/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
    {
      path:"/about",
      element:<About/>
    },
  
    {
      path: "/contact",
      element: <Contact/>
    },
    {
      path:'/products',
      element: <Products/>
    },
    {
      path: '/products/:name/:id',
      element: <Products/>
    }, 
    
    {
      path: "/categories",
      element: <Categories/>
    }, 
    {
      path: "/cart",
      element: <ProtectedRoutes>
        <Cart/>
        </ProtectedRoutes>
    }, 
    {
      path: "/register",
      element:
      
       <Register/>
    }, 
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/sendcode",
      element: <SendCode/>
    },
    {
      path: "/resetpassword",
      element: <ResetPassword/>
    },
    {
      path: "/products/:id",
      element: <Detials/>
    },
    {
      path:"*",
      element:<NotFound/>
    }
    ]
}]);
  
  return (
    <>
    <UserContextProvider>
      <RouterProvider router={router} />
      </UserContextProvider>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition: Zoom
/>
</>
  )
}

export default App