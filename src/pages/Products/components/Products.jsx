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
import ReactPaginate from 'react-paginate';
import {BsChevronRight,BsChevronLeft} from "react-icons/bs"
import {  Zoom, toast } from 'react-toastify';
import './Products.css'
const Products = () => {
  const navigate=useNavigate();
  const { name, id } = useParams();
  const [products, setProducts] = useState([]);
  const [loader, setLodaer] = useState(true);
  const [error, setError] = useState(false);
  const [counter,setCounter]=useState(0);
  const [number,setNumber]=useState(0);
  const getAll = async (page) => {
    console.log(page)
    const skip = (page - 1) * 3;

    try {
      
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=1&limit=10&skip=${skip}`

      );
     
      const numberOfPages=Math.ceil(data.products.length/3);
      setNumber(numberOfPages);
      setProducts(data.products);
    } catch (error) {
      toast.error(error.response.data.message+" failed to load data", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
        });
    } finally {
      setLodaer(false);
      setError(true);
    }
  };
  const getOne = async (page) => {
    console.log(page)
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/category/${id}`
      );
      const numberOfPages=Math.ceil(data.products.length/3);
      setNumber(numberOfPages);
      setProducts(data.products);
    } catch (error) {
    } finally {
      setLodaer(false);
    }
  };
  const getResult = (page=0) => {
    if (id) {
      getOne(page);
    }
    if (id === undefined) {
      getAll(page);
    }
  };
  const handelIncrease=()=>{
    setCounter(counter+1);
  }
  const handelDecrease=()=>{
    if(counter>0)
    setCounter(counter-1);
  }
  const handeltodetials=(id)=>{
    navigate(`/products/${id}`)
  }
  useEffect(() => {
    getResult();
  }, [id]);
  if (loader) {
    return <Loader />;
  }
const handlePageClick=(e)=>{
  console.log(e)
}
let paginationNumbers=[];
paginationNumbers[0]=<li className="page-item disabled" key={0}>
<a className="page-link"><span  className="w-10 d-flex align-items-center justify-content-center bg-body-lightGray rounded text-danger py-1">
      <BsChevronLeft/>
    </span></a>
</li>

for(let i = 1; i <= number; i++) {
  let tag = 
    <li className="page-item mx-1" key={i}>
      <button className="page-link" onClick={() => getResult(i)}>
        {i}
      </button>
    </li>
  ;
  paginationNumbers.push(tag);
}
paginationNumbers.push(
  <li className="page-item mx-1" key={number + 1}>
    <a className="page-link" href="#">
      <span className="w-10 d-flex align-items-center justify-content-center bg-body-lightGray rounded text-danger py-1">
        <BsChevronRight />
      </span>
    </a>
  </li>
);
  return (
    <>
    <div className="d-flex align-items-center flex-column ">
       {name ? (
          <h1 className="fs-3 fw-semibold my-3 ">Products of {name}</h1>
        ) : (
          <h1 className="fs-3 fw-semibold my-3 ">All Products</h1>
        )}
        <div className="row d-flex  container  justify-content-between flex-wrap ">
          {products.length > 0 ? (products.map((product)=>(
            <div className="col-md-3 shadow p-3 bg-body-white rounded mx-4 mb-4 d-flex justify-content-center align-items-center flex-column  rounded border cardProduct" key={product._id}>
 <img src={product.mainImage.secure_url} alt="" className="card-image-top image-fluid img-card rounded"/>
                    <div className="card-body d-flex flex-column justify-content-center  ">
                      <h6 className="card-title text-center fw-bold">
                        {product.name}
                      </h6>
                          <div className="text-danger  me-2 text-center">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStarHalfAlt />
                          <FaRegStar />
                          </div>
      
<h5 className="mb-1 me-1 d-flex flex-row justify-content-center ">{product.finalPrice}$</h5>
<button
                            className="btn btn-danger mt-2 "
                            type="button"
                            onClick={()=>handeltodetials(product._id)}
                          >
                            Detials
                          </button>
                          </div>
                    </div>

          ))):            <div className="fs-4 fw-semibold my-4 ">No products</div>
}
</div>
</div>
<nav aria-label="Page navigation example  ">
  <ul className="pagination justify-content-center ">
    
    {paginationNumbers.map((item)=>(
      item
    ))}
    
  {/* <li className="page-item mx-1"><a className="page-link" href="#">1</a></li>
  <li className="page-item mx-1"><a className="page-link" href="#">2</a></li>
  <li className="page-item mx-1"><a className="page-link" href="#">3</a></li> */}
 
  </ul>
</nav>


{/* <ReactPaginate 
        breakLabel="..."
        nextLabel={
          <span className="w-10 d-flex align-items-center justify-content-center bg-body-lightGray rounded text-danger py-1">
            <BsChevronRight />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel={
          <span  className="w-10 d-flex align-items-center justify-content-center bg-body-lightGray rounded text-danger py-1">
            <BsChevronLeft/>
          </span>
        }
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        containerClassName="pagination justify-content-center"
        pageClassName=" d-block btn-danger  w-10 h-10  rounded"
        pageLinkClassName="page-link  d-block btn-danger  w-10 h-10  rounded  "
        previousClassName="page-item"
        previousLinkClassName="page-link "
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active "
      /> */}
         
    </>
  );
};

export default Products;
