import React from "react";
import allDatas from "../data/data_origin";
import "./shopProductCard.css";
import { Link } from "react-router-dom";
// 引入useDispatch
import { useDispatch } from "react-redux";
// 引入action
import { addToCart } from "../Redux/action";
import ProductDisplay from "./ProductDisplay";
import { useSelector } from "react-redux";

export default function ShopProductCard() {
  let datas = useSelector((state) => state.shopItems);
  let dispatch = useDispatch();
  let handleAddToCart = (parameter) => {
    // console.log('11111111');
    dispatch(addToCart(parameter));
  };
  return datas.length > 0 ? (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <ul className='shopProductList'>
        {datas.map((item, index) => {
          // console.log(item.parameter);
          return (
            <ProductDisplay
              item={item}
              index={index}
              key={index}
            ></ProductDisplay>
          );
        })}
      </ul>
    </div>
  ) : (
    <h4 className='no_products_heading'>NO PRODUCT FOUND</h4>
  );
}
