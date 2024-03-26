import React, { useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Register from "../../pages/Register/components/Register";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { UserContext } from "../Context/User";
import { FiLogOut } from "react-icons/fi";
import { ShopingCartContext } from "../Context/ShopingCart";
import { TiArrowSortedDown } from "react-icons/ti";

import Profile from "../../pages/profile/components/Profile";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Contact from "./../../pages/Contact/components/Contact";

const Navbar = () => {
  const { userName, userToken, setUserToken, setUserName } =
    useContext(UserContext);
  const { countItems, setCountItems } = useContext(ShopingCartContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Initialization for ES Users
  const handleRegisterButtonClick = () => {
    navigate("/register");
  };
  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("email");
    setUserName(null);
    setUserToken(null);
    navigate("/");
  };

  return (
    <>
      <div className="header-light bg-white sticky-top w-20">
        <nav className="navbar bg-white  ">
          <div className="container">
            {userName ? (
              <>
                {" "}
                <div className="d-flex icon ">
                  <FiLogOut
                    className=" point me-md-2"
                    size={30}
                    onClick={logout}
                  />
                  <div className="d-flex flex-row point " onClick={handleShow}>
                    <FaRegUser className="point  " size={30} />
                    <TiArrowSortedDown className="pt-2" size={30} />
                  </div>

                  <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton></Offcanvas.Header>
                    <Offcanvas.Body>
                      <ul>
                        <li className="py-3">
                          {" "}
                          <NavLink className={"nav-link active"} to="profile">
                            My Profile
                          </NavLink>
                        </li>
                        <li className="py-3">
                          <NavLink className={"nav-link "} to="profile/contact">
                            Contact
                          </NavLink>
                        </li>
                        <li className="py-3">
                          <NavLink className={"nav-link "} to="/profile/order">
                            My Orders
                          </NavLink>
                        </li>
                      </ul>
                    </Offcanvas.Body>
                  </Offcanvas>
                  <h6 className="  me-md-2 my-1 px-2">{userName}</h6>
                </div>
              </>
            ) : (
              <>
                <div className="d-grid  d-md-block">
                  <button
                    className="btn btn-danger me-md-2 reg"
                    type="button"
                    onClick={handleRegisterButtonClick}
                  >
                    Register
                  </button>
                  <button
                    className="btn btn-outline-danger log"
                    type="button"
                    onClick={handleLoginButtonClick}
                  >
                    Login
                  </button>
                </div>{" "}
              </>
            )}

            <NavLink className="navbar-brand " to="/">
              <img
                src="../../logo.jpg"
                alt="Bootstrap"
                width={160}
                height={60}
              />
            </NavLink>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
              <button
                id="search-button"
                type="button"
                className="btn btn-danger btn-gradient"
                onClick={() => console.log(searchInput)}
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </nav>
        <nav className="navbar navbar-expand-lg bg-white border-top border-danger shadow-sm">
          <div className="container">
            <NavLink className="navbar-brand fw-bold " to="/">
              Capital shop
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item mx-4">
                  <NavLink
                    className="nav-link fw-bold active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link fw-bold" to="/about">
                    About us
                  </NavLink>
                </li>

                <li className=" position-relative mx-2">
                  <NavLink className="nav-link fw-bold" to="/products">
                    Products{" "}
                    <span className="position-absolute start-100 translate-middle badge rounded-pill text-bg-danger">
                      New <span className="visually-hidden">unread </span>
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link fw-bold" to="/categories">
                    Categories{" "}
                  </NavLink>
                </li>

                <li className="nav-item mx-2">
                  <NavLink className="nav-link fw-bold" to="/contact">
                    contact us
                  </NavLink>
                </li>
              </ul>

              <NavLink
                className="d-flex w-20 h-40 link-danger text-decoration-none position-relative "
                to="/cart"
              >
                <FaCartArrowDown size={30} />
                <div className="rounded-circle bg-black text-white text-decoration-none d-flex justify-content-center align-items-center position-absolute  count">
                  {userToken ? countItems : ""}
                </div>
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
