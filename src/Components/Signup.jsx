import React from "react";
import { useState } from "react";
import {
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getUserInfo,
} from "../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "./signup.css";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPage } from "../Redux/action";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  let navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password } = formFields;
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }
      let { user } = await createAuthUserWithEmailAndPassword(email, password);
      const userDocRef = await createUserDocumentFromAuth(user, {
        displayName,
      });
      let userInfo = await getUserInfo(user);
      setCurrentUser({ ...user, displayName: userInfo.displayName });
      console.log("sign up here");
      resetFormFields();
      navigate("/");
      dispatch(setPage(0));
      localStorage.setItem("page", 0);
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className='signup'>
      <div className='signup_box'>
        <div className='signup_container'>
          <div className='signup_top'>
            <div className='signup_top_left'>
              <h2 className='sign_up_title'>Sign up to Salinaka</h2>
              <form className='sign_up_form' onSubmit={handleSubmit}>
                <label htmlFor='displayName' className='sign_up_label'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='displayName'
                  id='displayName'
                  placeholder='Joe Lee'
                  onChange={handleChange}
                  value={displayName}
                  required
                  className='sign_up_input'
                />
                <label htmlFor='signup_email' className='sign_up_label'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='signup_email'
                  placeholder='test@example.com'
                  onChange={handleChange}
                  value={email}
                  required
                  className='sign_up_input'
                />
                <label htmlFor='signup_pass' className='sign_up_label'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='signup_pass'
                  placeholder='Your Password'
                  onChange={handleChange}
                  value={password}
                  required
                  className='sign_up_input'
                />

                <button type='submit' className='sign_up_btn'>
                  Sign up
                </button>
              </form>
            </div>
            <div className='signup_top_right'>
              <button className='sign_up_google_btn' onClick={logGoogleUser}>
                <GoogleIcon className='google'></GoogleIcon>
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
          <div className='signup_bottom'>
            <span className='sign_up_cta'>Already have an account?</span>
            <div
              className='sign_up_btn'
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign In
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
