import React from "react";
import Footer from "./Footer";
import ShopProductCard from "./ShopProductCard";

export default function Shop() {
  return (
    <div>
      <div className='content_container' style={{ minHeight: "100vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "100px",
          }}
        >
          <ShopProductCard></ShopProductCard>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
