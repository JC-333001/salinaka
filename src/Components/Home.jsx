import React from "react";
import "./home.css";
import Banner from "./Banner";
import ProductBox from "./ProductBox";
import Footer from "./Footer";
import bannerImg from "../Img/banner-girl.789f1fa6f451ad26c5039fcbc049ace7.png";

export default function Home() {
  return (
    <div>
      <div className='content_container'>
        <div className='banner'>
          <Banner photo={bannerImg}></Banner>
        </div>
        <div className='productBox'>
          <ProductBox
            header={"Featured Products"}
            filter={"featured"}
            show={"show"}
          ></ProductBox>
        </div>
        <div className='productBox'>
          <ProductBox
            header={"Recommended Products"}
            filter={"recommended"}
            show={"show"}
          ></ProductBox>
        </div>
      </div>
      <div className='footer'>
        <Footer></Footer>
      </div>
    </div>
  );
}
