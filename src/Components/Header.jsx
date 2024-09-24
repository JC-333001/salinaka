import React, { useState } from "react";
import "./header.css";
import logo from "../Img/logo-full.059e10fa5fedbfb65165e7565ed3936f.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@mui/material";
import Cart from "./Cart";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import Filter from "./Filter";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { signOutUser } from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  try {
    const userDocRef = createUserDocumentFromAuth(currentUser);
    // console.log("userdocref = ", userDocRef);
  } catch (error) {
    console.log("cannot find this user");
  }
  // console.log("hihi", currentUser);
  let navigate = useNavigate();
  //   let nav = () => {
  //     navigate("/");
  //   };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  let clickHandler = (i) => {
    setIndex(i);
  };

  let changeHandler = (e) => {
    console.log(`e.target.value = ${e.target.value}`);
    setSearchQuery(e.target.value);
    // console.log(`searchQuery0 = ${searchQuery}`);
  };

  let submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
    console.log(`searchQuery = ${searchQuery}`);
  };

  // console.log("current user = ", currentUser);

  let cart = useSelector((state) => state.cartItems);
  return (
    <div className='header'>
      <div className='headerContainer'>
        <div className='navBar'>
          {/* <img className='headerLogo' src={logo} alt='' onClick={nav} /> */}
          <div className='logo_img'>
            <Link
              className='navLink'
              to='/'
              onClick={() => {
                clickHandler(0);
              }}
              style={{ color: index === 0 ? "black" : "#8a8a8a" }}
            >
              <img className='headerLogo' src={logo} alt='' />
            </Link>
          </div>
          <div className='nav_links'>
            <Link
              className='navLink'
              to='/'
              onClick={() => {
                clickHandler(0);
              }}
              style={{ color: index === 0 ? "black" : "#8a8a8a" }}
            >
              Home
            </Link>

            <Link
              className='navLink'
              to='/shop'
              onClick={() => {
                clickHandler(1);
              }}
              style={{ color: index === 1 ? "black" : "#8a8a8a" }}
            >
              Shop
            </Link>
            <Link
              className='navLink'
              to='/featured'
              onClick={() => {
                clickHandler(2);
              }}
              style={{ color: index === 2 ? "black" : "#8a8a8a" }}
            >
              Featured
            </Link>
            <Link
              className='navLink'
              to='/recommended'
              onClick={() => {
                clickHandler(3);
              }}
              style={{ color: index === 3 ? "black" : "#8a8a8a" }}
            >
              Recommended
            </Link>
          </div>

          {index == 1 ? <Filter></Filter> : null}

          <div className='search_bar_container'>
            <form className='search_bar' onSubmit={submitHandler}>
              <span className='magnifier'>
                <svg
                  viewBox='64 64 896 896'
                  focusable='false'
                  data-icon='search'
                  width='1em'
                  height='1em'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path d='M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z'></path>
                </svg>
              </span>
              <input
                placeholder='Search product...'
                type='text'
                value={searchQuery}
                onChange={changeHandler}
                className='search_input'
                overflow='hidden'
              ></input>
            </form>

            <span
              className='cart'
              onClick={() => {
                setIsDrawerOpen(true);
                console.log("open drawer");
              }}
            >
              {/* <img src={cartLogo} alt='' /> */}
              <Badge badgeContent={cart.length} color='primary'>
                <ShoppingCartIcon
                  style={{ cursor: "pointer" }}
                ></ShoppingCartIcon>
              </Badge>
            </span>
          </div>
          <div className='user_auth'>
            {!currentUser ? (
              [
                <Link
                  className='signUp'
                  to='/signup'
                  key='signup'
                  onClick={() => {
                    setIndex(null);
                  }}
                >
                  Sign Up
                </Link>,
                <Link
                  className='signIn'
                  to='/signin'
                  key='signin'
                  onClick={() => {
                    setIndex(null);
                  }}
                >
                  Sign In
                </Link>,
              ]
            ) : (
              <div className='user_account'>
                <span
                  key={"displayName"}
                  onClick={() => {
                    setIsAccountOpen(!isAccountOpen);
                  }}
                  style={{ cursor: "pointer" }}
                >{`Hi, ${currentUser.displayName}`}</span>
                <div
                  className='account_drop_down'
                  style={{ visibility: isAccountOpen ? "visible" : "hidden" }}
                >
                  <div
                    key={"signoutBtn"}
                    onClick={async () => {
                      try {
                        await signOutUser();
                        setCurrentUser(null);
                        setIndex(null);
                        navigate("/signin");
                        setIsAccountOpen(false);
                      } catch (error) {
                        console.log("Fail to sign out", error.code);
                      }
                    }}
                    className='sign_out_btn'
                  >
                    Sign out<LogoutIcon className='log_out_icon'></LogoutIcon>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          console.log("close drawer");
        }}
      >
        <Cart setDrawer={setIsDrawerOpen}></Cart>
      </Drawer>
    </div>
  );
}
