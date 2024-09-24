import React from "react";
import allDatas from "../data/data_origin";
import "./productCard.css";
import { Link } from "react-router-dom";

export default function ProductCard({ category }) {
  var datas = allDatas();
  var filtedDatas = [];
  if (category === "recommended") {
    filtedDatas = datas.filter((item) => item.category === "recommended");
  } else if (category === "featured") {
    filtedDatas = datas.filter((item) => item.category === "featured");
  } else {
    filtedDatas = allDatas();
  }
  return (
    <ul className='productList'>
      {filtedDatas.map((item, index) => {
        return (
          <Link to={`/product/${item.parameter}`} key={index}>
            <li className='list' key={index}>
              <div>
                <img src={item.img}></img>
              </div>
              <h2>{item.name}</h2>
              <h3>{item.brand}</h3>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
