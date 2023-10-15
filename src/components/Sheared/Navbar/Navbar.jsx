import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import BtnLightDark from "./BtnLightDark";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const location = useLocation();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOption = (
    <>
      <li>
        <Link className="text-2xl" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="text-2xl" to="/instructors">
          Instructors
        </Link>
      </li>
      <li>
        <Link className="text-2xl" to="/classes">
          Classes
        </Link>
      </li>
      <li>
        <Link className="text-2xl" to="/about">
          About
        </Link>
      </li>
      <li>
        <Link className="text-2xl" to="/reviews">
          Review
        </Link>
      </li>
      <li>
        {user ? (
          <>
            <Link className="text-2xl" to="/dashboard ">
              Dashboard
            </Link>
          </>
        ) : (
          <></>
        )}
      </li>
      {/* <li>
        <BtnLightDark />
      </li> */}
      <li>
        {user ? (
          <>
            <Link to="/dashboard/mycart">
              <button className="btn">
                <FaShoppingCart />
                <div className="badge badge-secondary">{cart?.length || 0}</div>
              </button>
            </Link>
          </>
        ) : (
          <></>
        )}
      </li>
      <li>
        {user && (
          <div>
            <img
              title={user.displayName}
              className="rounded-xl"
              style={{ width: "30px", height: "30px" }}
              src={user.photoURL}
              alt=""
            />
          </div>
        )}
      </li>
    </>
  );

  const isHomePage = location.pathname === "/";
  return (
    <div className="relative">
      <div
        className={`navbar bg-slate-400 text-black lg:w-[1536px] ${
          isHomePage ? "fixed" : ""
        } z-30`}
      >
        <div className="navbar-start">
          <div className="dropdown z-30">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 bg-slate-100 rounded-box w-52 text-center"
            >
              {navOption}
            </ul>
          </div>
          <Link to="/" className="">
            <div className="flex gap-2 items-center">
              <img
                className="w-20 h-15 rounded"
                src="https://i.ibb.co/DGZNv9Q/12-music-studio-logo-4x-cleanup-removebg-preview.png"
                alt=""
              />
              <p className="font-bold md:text-2xl">The Music Studio</p>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 items-center">
            {navOption}
          </ul>
        </div>
        <div className="navbar-end gap-x-10">
        
        <BtnLightDark />
      
          {user ? (
            <>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-primary hover:bg-green-700">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
