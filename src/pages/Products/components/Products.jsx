import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../../components/Loader/Loader";
import ErrorLoad from "../../../components/ErrorLoad";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

import axios from "axios";
import { FaStar } from "react-icons/fa";

const Products = () => {
  const { name, id } = useParams();
  const [products, setProducts] = useState([]);
  const [loader, setLodaer] = useState(true);
  const [error, setError] = useState(false);
  const [counter,setCounter]=useState(0);
  const getAll = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=1&limit=10`
      );
      setProducts(data.products);
    } catch (error) {
    } finally {
      setLodaer(false);
      setError(true);
    }
  };
  const getOne = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/category/${id}`
      );
      setProducts(data.products);
    } catch (error) {
    } finally {
      setLodaer(false);
    }
  };
  const getResult = () => {
    if (id) {
      getOne();
    }
    if (id === undefined) {
      getAll();
    }
  };
  const handelIncrease=()=>{
    setCounter(counter+1);
  }
  const handelDecrease=()=>{
    if(counter>0)
    setCounter(counter-1);
  }
  useEffect(() => {
    getResult();
  }, [id]);
  if (loader) {
    return <Loader />;
  }

  
  return (
    <>
      <div className="d-flex align-items-center flex-column ">
        {name ? (
          <h1 className="fs-3 fw-semibold my-4 ">Products of {name}</h1>
        ) : (
          <h1 className="fs-3 fw-semibold my-4 ">All Products</h1>
        )}
        <div>
          <div className="d-flex align-items-center flex-column ">
            {products.length>0?(products.map((product) => (
              <div className="col-sm-4 col-md-6 col-xl-8 my-2" key={product._id}>
                <div className="card shadow p-3  bg-body-white rounded border rounded-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div className="bg-image hover-zoom ripple rounded ripple-surface">
                          <img
                            src={product.mainImage.secure_url}
                            className="w-100 h-10"
                          />
                          <a href="#!">
                            <div className="hover-overlay">
                              <div
                                className="mask"
                                style={{
                                  backgroundColor: "rgba(253, 253, 253, 0.15)",
                                }}
                              />
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <h5>{product.name}</h5>
                        <div className="d-flex flex-column">
                          <div className="text-danger mb-1 me-2">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStarHalfAlt />
                          <FaRegStar />

                          </div>
                          <span className="border py-1 px-2 text-danger">{product.stock} pieces in a stock</span>
                        </div>
                        <div className="mt-1 mb-0 text-muted small">
                          <span>{product.description}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-3 col-lg-3 col-xl-3 border-sm-start-none border-start">
                        <div className="d-flex flex-row align-items-center mb-1">
                        <h4 className="mb-1 me-1">{product.finalPrice}$</h4>
                          {product.finalPrice!==product.price?<span className="text-danger">
                            <s>{product.price}$</s>
                          </span>:''
                         
}
                        </div>
                        <h6 className="text-success">Free shipping</h6>
                        <div className="d-flex flex-column mt-4">
                          <button
                            className="btn btn-danger btn-sm"
                            type="button"
                          >
                            Details
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm mt-2"
                            type="button"
                          >
                            Add to cart
                          </button>
                        </div>
                        <div className="d-flex flex-row mt-4 ">      
                        <button className="border text-center col-3 me-3 btn-danger btn" onClick={handelIncrease}>+</button>  
                                        <span className="border d-flex justify-content-center align-items-center col-4 me-3">{counter}</span>
                                        <button className="border text-center col-3 me-2 btn-danger btn" onClick={handelDecrease}>-</button>
</div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))):(
              <div className="fs-4 fw-semibold my-4">No products</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
