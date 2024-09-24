import React from "react";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getUserInfo,
} from "../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  let navigate = useNavigate();

  //用户数据存储在云端Firebase
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password } = formFields;

  // console.log(formFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let { user } = await createAuthUserWithEmailAndPassword(email, password);
      const userDocRef = await createUserDocumentFromAuth(user, {
        displayName,
      });
      let userInfo = await getUserInfo(user);
      setCurrentUser({ ...user, displayName: userInfo.displayName });
      console.log("sign up here");
      resetFormFields();
      navigate("/");
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
            <h2 className='sign_up_title'>Sign up to Salinaka</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor='displayName'>Full Name</label>
              <input
                type='text'
                name='displayName'
                id='displayName'
                placeholder='Joe Lee'
                onChange={handleChange}
                value={displayName}
                required
              />
              <label htmlFor='signup_email'>Email</label>
              <input
                type='email'
                name='email'
                id='signin_email'
                placeholder='test@example.com'
                onChange={handleChange}
                value={email}
                required
              />
              <label htmlFor='signin_pass'>Password</label>
              <input
                type='password'
                name='password'
                id='signin_pass'
                placeholder='Your Password'
                onChange={handleChange}
                value={password}
                required
              />

              <button type='submit' className='sign_up_btn'>
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
