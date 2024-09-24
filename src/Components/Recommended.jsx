import React from "react";
import ProductBox from "./ProductBox";
import "./recommended.css";
import Banner2 from "./Banner2";
import bannerGirl from "../Img/banner-girl-1.24e9b8f48d5a0ac32680edd194503695.png";
import Footer from "./Footer";
export default function Recommended() {
  return (
    <div>
      <div className='content_container'>
        <div className='rBanner'>
          <Banner2 text={"Recommended Products"} photo={bannerGirl}></Banner2>
        </div>
        <div className='rProductbox'>
          <ProductBox filter={"recommended"}></ProductBox>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
