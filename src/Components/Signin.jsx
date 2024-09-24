import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getUserInfo,
} from "../utils/firebase/firebase.utils";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "./signin.css";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch } from "react-redux";
import { setPage } from "../Redux/action";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function Signin() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const dispatch = useDispatch();
  console.log("hello", setCurrentUser);
  const logGoogleUser = async () => {
    try {
      let { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
      setCurrentUser(user);
      navigate("/");
      dispatch(setPage(0));
      localStorage.setItem("page", 0);
    } catch (error) {
      console.log("Fail to login google account", error.code);
    }

    // console.log(userDocRef);
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      let userInfo = await getUserInfo(user);
      setCurrentUser({ ...user, displayName: userInfo.displayName });
      navigate("/");
      dispatch(setPage(0));
      localStorage.setItem("page", 0);
    } catch (error) {
      console.log("Invalid email and password");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // let navigate = useNavigate();
  // let handleSignin = () => {
  //   //将数据存储在本地 localStorage.setItem('属性名字'， ‘属性值’)
  //   //移除本地localStorage存储的数据： localStorage.removeItem('属性名字')
  //   //获取localStorage存储的数据： localStorage.getItem('属性名字')
  //   let savedPassword = sessionStorage.getItem(userEmail);
  //   savedPassword && password == savedPassword
  //     ? navigate("/")
  //     : alert("incorrect email and password");
  // };

  return (
    <div className='signin'>
      <div className='signin_box'>
        <div className='signin_container'>
          <div className='signin_top'>
            <div className='signin_top_left'>
              <h2 className='sign_in_title'>Sign in to Salinaka</h2>
              <form className='sign_in_form' onSubmit={handleSubmit}>
                <label htmlFor='signup_email' className='sign_in_label'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='signin_email'
                  placeholder='test@example.com'
                  onChange={handleChange}
                  value={email}
                  required
                  className='sign_in_input'
                />
                <label htmlFor='signin_pass' className='sign_in_label'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='signin_pass'
                  placeholder='Your Password'
                  onChange={handleChange}
                  value={password}
                  required
                  className='sign_in_input'
                />
                <div className='sign_in_action'>
                  <Link>Forgot password?</Link>
                  <button type='submit' className='sign_in_btn'>
                    Sign in
                  </button>
                </div>
              </form>
            </div>
            <div className='signin_top_right'>
              <button className='sign_in_google_btn' onClick={logGoogleUser}>
                <GoogleIcon className='google'></GoogleIcon>
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
          <div className='signin_bottom'>
            <span className='sign_up_cta'>Don't have an account?</span>
            <div
              className='sign_up_btn'
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
