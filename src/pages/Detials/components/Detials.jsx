import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../../components/Loader/Loader";
import ErrorLoad from "../../../components/ErrorLoad";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {  Zoom, toast } from 'react-toastify';
import axios from "axios";
import { FaStar } from "react-icons/fa";
import './Detials.css'
import { ShopingCartContext } from "../../../components/Context/ShopingCart";
import StarRate from "../../StarComponent/components/StarRate";
const Detials = () => {
    const navigate=useNavigate();
    const{setCountItems,countItems}=useContext(ShopingCartContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loader, setLodaer] = useState(true);
    const [loaderBtn, setLodaerBtn] = useState(false);
    const [inCart, setInCart]=useState(false)
    const[avgRating,setAvgRating]=useState(0);
    const getOneProduct=async ()=>{
       try {const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(data.product);
        setAvgRating(Math.ceil(data.avgRating));
        console.log(data)
    }catch(error){

    }finally{
        setLodaer(false)
    }
     
    }
   
    useEffect(()=>{
        getOneProduct();
    },[]);

 // Render loading state if product is still null
 if (loader) {
    return <Loader />;
}

// Destructure product and mainImage from state
const { mainImage,subImages,name,price,finalPrice,description,reviews,stock } = product;
const mainImg=document.getElementById('MainImage');
const handel=(image)=>{
    mainImg.src=image
}
const handelMain=(image)=>{
    mainImg.src=image
}

const addToCart=async(id)=>{
    const userToken = localStorage.getItem('userToken');
    if(userToken){
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}/cart`, 
            {
                productId: id 
            }, {
                headers: { Authorization: `Tariq__${userToken}` }
            });
                    toast.success('Item added to cart successfully', {
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
    setCountItems(countItems+1)
    navigate('/cart')

        }catch(error){
            if(error.response.status==409){
                setInCart(true)
            }
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

        }finally {

        }
    }else {
        toast.error('please log in into your account ', {
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
        setCountItems(countItems+1)
        navigate('/cart')
    }
          
        
}

return (
    <>
    <div className="container sproduct  pt-4 ">
        <div className="row mb-5 ">
            <div className="col-lg-5 col-md-6 col-12">
                <img src={mainImage && mainImage.secure_url} alt="" id="MainImage" className="img-fluid w-100 rounded shadow p-3 mb-3 bg-body-white " onClick={()=>handelMain(mainImage.secure_url)}/>
                <div className="small-img-group">
                { subImages.map((image) => (
                    <div className="small-img-col" key={image.public_id}>
                        <img src={image.secure_url}  width="100%" className="small-img rounded" onClick={()=>handel(image.secure_url)}/>
                    </div>
                ))}
                </div>
            </div>
            <div className="col-lg-7 col-md-6 col-12"> 
            <h2 className="pt-4 pb-2">{name}</h2>
            {[...Array(5)].map((_,index)=>{
                return <span key={index} className={`${index+1<=avgRating?'selected':''} fs-5 fw-bold mx-1`} 
                >&#9733;</span>
            })}
            <h6 className="text-success fw-bold">Free shipping</h6>
            <h4><span className="text-danger fw-bold">{stock}</span> pieces in a stock</h4>
            <div className="d-flex flex-row align-items-center mb-1 " >
                        <span className="fw-bold fs-6">price:</span>  {finalPrice!==price?<span className="text-danger px-2">
                            <span className="text-decoration-line-through">{price}$</span>
                          </span>:''
                         
} 
<h4 className="mb-1 me-1">{product.finalPrice}$</h4>
</div>
            <select >
                <option value="">select size</option>
            <option value="XL">XL</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="S">S</option>
            <option value="XS">XS</option>
            </select>
            <br />
            
                          <h4 className="mt-1 mb-2">About : </h4>
                          <span className="mb-2">{description}</span>
                          <br />
                          <button
                            className="btn btn-danger btn-sm px-4 py-2 fw-bold mb-4 mt-3"
                            type="submit"

                            onClick={()=>addToCart(product._id)}
                            disabled={inCart?'disabled':''}>{inCart?'in Cart':'Add to cart'}
                          </button>
            </div>
           
        </div>
        <div className="row border border-danger rounded p-3">

       <StarRate id={id} />
       <div>
        {
            product.reviews.map((item,index)=>(
                <div key={item._id}  className="rounded border border-danger  w-100 my-4 p-2 shadow">
                    <div className="d-flex justify-content-start align-items-center">
                        <img src={item.createdBy.image.secure_url} alt="" width={"70px"} height={"70px"} className="  rounded-circle text-start"/>
                        <span className="px-3 fw-bold"><span className="text-danger">{item.createdBy.userName}</span> commented on this product : </span>
                    </div>
                    <p className=" comment">{item.comment}</p>
                    </div>
            ))
        }
       </div>
       </div>

    </div>

        
         {/* Check if mainImage exists before accessing properties */}
    </>
);
}

export default Detials