import React from 'react'
import Root from './routes/Root';
import  Home from './pages/Home/components/Home.jsx'
import Products from './pages/Products/components/Products.jsx';
import Categories from './pages/Categories/components/Categories.jsx';
import Login from './pages/Login/components/Login.jsx';
import Register from './pages/Register/components/Register.jsx';
import Contact from './pages/Contact/components/Contact.jsx';
import About from './pages/About/components/About.jsx'
import Cart from './pages/Cart/components/Cart.jsx'
import NotFound from './pages/NotFound/components/NotFound.jsx';
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const App = () => {
  const router = createBrowserRouter([
    {
    path: "/",
    element:<Root/>,
    errorElement:<NotFound/>,
    children:[
      {
        path: "/",
        element: <Categories/>
      },
    {
      path: "/home",
      element: <Categories/>
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
      path: "/products",
      element: <Products/>
    }, 
    {
      path: "/categories",
      element: <Categories/>
    }, 
    {
      path: "/cart",
      element: <Cart/>
    }, 
    {
      path:"*",
      element:<NotFound/>
    }
    ]
}]);
  
  return (
    <RouterProvider router={router} />
  )
}

export default App