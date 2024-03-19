import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../../components/Loader/Loader";
import ErrorLoad from "../../../components/ErrorLoad";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import './Detials.css'
const Detials = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loader, setLodaer] = useState(true);

    const getOneProduct=async ()=>{
       try {const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        console.log(data)
        setProduct(data.product);
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
const { _id, mainImage,subImages,name,price,finalPrice,description,reviews,stock } = product;
const mainImg=document.getElementById('MainImage');
const handel=(image)=>{
    mainImg.src=image
}
const handelMain=(image)=>{
    mainImg.src=image
}
return (
    <>
    <div className="container sproduct my-5 pt-2 ">
        <div className="row ">
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
                            type="button"
                          >
                            Add to cart
                          </button>
            </div>
           
        </div>
    </div>

        
         {/* Check if mainImage exists before accessing properties */}
    </>
);
}

export default Detials