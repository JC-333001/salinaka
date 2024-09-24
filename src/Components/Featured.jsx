import React from "react";
import ProductBox from "./ProductBox";
import "./featured.css";
import Banner2 from "./Banner2";
import bannerGuy from "../Img/banner-guy.fbf4f0f7396fe31ca288dc1dd9822342.png";
import Footer from "./Footer";
export default function Featured() {
  return (
    <div>
      <div className='content_container'>
        <div className='fBanner'>
          <Banner2 text={"Featured Products"} photo={bannerGuy}></Banner2>
        </div>
        <div className='fProductbox'>
          <ProductBox filter={"featured"}></ProductBox>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
