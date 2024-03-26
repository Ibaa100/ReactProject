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
import ReactPaginate from "react-paginate";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { Zoom, toast } from "react-toastify";
import "./Products.css";
import { FaClipboardUser } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaCarTunnel } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";

const Products = () => {
  const navigate = useNavigate();
  const { name, id } = useParams();
  const [products, setProducts] = useState([]);
  const [loader, setLodaer] = useState(true);
  const [error, setError] = useState(false);
  const [counter, setCounter] = useState(0);
  const [number, setNumber] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [sortInput, setSortInput] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const getAll = async (page) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/products?page=${page}&limit=3&search=${searchInput}&sort=${sortInput}&price[gte]=${minPrice}&price[lte]=${maxPrice}`
      );
      const numberOfPages = Math.ceil(data.total / 3);
      setNumber(numberOfPages);
      setProducts(data.products);
    } catch (error) {
      toast.error(error.response.data.message + " failed to load data", {
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
  const getOne = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/category/${id}`
      );
      setProducts(data.products);
    } catch (error) {
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
    } finally {
      setLodaer(false);
    }
  };
  const getResult = (page = 1) => {
    if (id) {
      getOne();
    }
    if (id === undefined) {
      getAll(page);
    }
  };

  const handeltodetials = (id) => {
    navigate(`/products/${id}`);
  };
  const getOriginal = () => {
    setSearchInput("");
    setSortInput("");
    setMinPrice(0);
    setMaxPrice(1000);
  };
  useEffect(() => {
    getResult();
  }, [id, sortInput]);
  if (loader) {
    return <Loader />;
  }

  let paginationNumbers = [];
  paginationNumbers[0] = (
    <li className="page-item disabled" key={0}>
      <a className="page-link">
        <span className="w-10 d-flex align-items-center justify-content-center bg-body-lightGray rounded text-danger py-1">
          <BsChevronLeft />
        </span>
      </a>
    </li>
  );

  for (let i = 1; i <= number; i++) {
    let tag = (
      <li className="page-item mx-1" key={i}>
        <button className="page-link" onClick={() => getResult(i)}>
          {i}
        </button>
      </li>
    );
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
      <div className="d-flex flex-column">
        
            {name ? (
              <div className="d-flex flex-column  justify-content-center align-items-center">
              <h1 className="fs-3 fw-semibold my-3 ">Products of {name}</h1>
              <div className="row d-flex  justify-content-between flex-wrap ">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    className="col-md-3 shadow p-3 bg-body-white rounded mx-4 mb-4 d-flex justify-content-center align-items-center flex-column  rounded border cardProduct"
                    key={product._id}
                  >
                    <img
                      src={product.mainImage.secure_url}
                      alt=""
                      className="card-image-top image-fluid img-card rounded"
                    />
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

                      <h5 className="mb-1 me-1 d-flex flex-row justify-content-center ">
                        {product.finalPrice}$
                      </h5>
                      <button
                        className="btn btn-danger mt-2 "
                        type="button"
                        onClick={() => handeltodetials(product._id)}
                      >
                        Detials
                      </button>
                    </div>
                  </div>
                  
                ))
              ) : (
                <div className="fs-4 fw-semibold my-4 ">No products</div>
              )}
            </div>
            <nav aria-label="Page navigation example  ">
            <ul className="pagination justify-content-center ">
              {paginationNumbers.map((item) => item)}
            </ul>
          </nav>
            </div>
            ) : (
              <> 
              <div className="d-flex">
              <div className="bg-black text-white side col-lg-2 col-md-4 col-6 p-2 py-3 d-flex flex-column justify-content-start ">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              id="search-button"
              type="button"
              className="btn btn-danger btn-gradient"
              onClick={() => getResult()}
            >
              <FaSearch />
            </button>
          </form>
          <div className="my-4 px-2">
            <h5>Sort By </h5>
            <div className="form-check">
              <input
                className="form-check-input "
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                defaultChecked
                onClick={() => setSortInput("name")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                name <FaArrowAltCircleUp className="text-white" />
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onClick={() => setSortInput("-name")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                name <FaArrowAltCircleDown className="text-white" />
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                onClick={() => setSortInput("finalPrice")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault3">
                price <FaArrowAltCircleUp className="text-white" />
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
                onClick={() => setSortInput("-finalPrice")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault4">
                price <FaArrowAltCircleDown className="text-white" />{" "}
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault5"
                onClick={() => setSortInput("discount")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault5">
                discount <FaArrowAltCircleUp className="text-white" />
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault6"
                onClick={() => setSortInput("-discount")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault6">
                discount <FaArrowAltCircleDown className="text-white" />{" "}
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault7"
                onClick={() => setSortInput("stock")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault7">
                in stock <FaArrowAltCircleUp className="text-white" />
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault8"
                onClick={() => setSortInput("-stock")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault8">
                in stock <FaArrowAltCircleDown className="text-white" />{" "}
              </label>
            </div>
          </div>
          <div className="my-3 px-2 d-flex flex-column ">
            <h5 className="text-start">Range of price </h5>

            <div className="input-group my-2">
              <span className="input-group-text col-4" id="basic-addon1">
                Min
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="price "
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="input-group my-2">
              <span className="input-group-text col-4" id="basic-addon1">
                Max
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="price "
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <button
              id="search-button"
              type="button"
              className="btn btn-danger btn-gradient"
              onClick={() => getResult()}
            >
              <AiFillCaretLeft />
              <AiFillCaretRight />
            </button>
          </div>
          <button
            id="search-button"
            type="button"
            className="btn btn-danger w-50 m-auto"
            onClick={getOriginal}
          >
            Reset
            <GrPowerReset />
          </button>
        </div>
        <div className="  col-lg-10 col-md-8 col-6 d-flex flex-column justify-content-center align-items-center">
        <h1 className="fs-3 fw-semibold my-3  ">All Products</h1>

              <div className="row d-flex  justify-content-between flex-wrap ">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    className="col-md-3 shadow p-3 bg-body-white rounded mx-4 mb-4 d-flex justify-content-center align-items-center flex-column  rounded border cardProduct"
                    key={product._id}
                  >
                    <img
                      src={product.mainImage.secure_url}
                      alt=""
                      className="card-image-top image-fluid img-card rounded"
                    />
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

                      <h5 className="mb-1 me-1 d-flex flex-row justify-content-center ">
                        {product.finalPrice}$
                      </h5>
                      <button
                        className="btn btn-danger mt-2 "
                        type="button"
                        onClick={() => handeltodetials(product._id)}
                      >
                        Detials
                      </button>
                    </div>
                  </div>
                  
                ))
              ) : (
                <div className="fs-4 fw-semibold my-4 ">No products</div>
              )}
            </div>
              
            <nav aria-label="Page navigation example  ">
            <ul className="pagination justify-content-center ">
              {paginationNumbers.map((item) => item)}
            </ul>
          </nav>
           
            </div>
            </div>
             
           
              </>
            )}

           
          </div>
        
    </>
  );
};

export default Products;
