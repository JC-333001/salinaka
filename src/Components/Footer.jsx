import React from "react";
import logo from "../Img/logo-full.059e10fa5fedbfb65165e7565ed3936f.png";
import "./footer.css";

export default function Footer() {
  return (
    <div className='footerContainer'>
      <img src={logo} alt='' />
      <div className='footerText'>
        <p>
          Developed by <a href=''>Jiaxi Chen</a>
        </p>
        <p>&copy; 2024</p>
        {/* <p>Fork this project <a href="">HERE</a></p> */}
      </div>
    </div>
  );
}
