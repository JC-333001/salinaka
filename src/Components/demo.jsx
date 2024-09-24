import React, { useState } from "react";
import allDatas from "../data/data_origin";
import "./shopProductCard.css";
import { Link } from "react-router-dom";
// 引入useDispatch
import { useDispatch } from "react-redux";
// 引入action
import { addToCart } from "../Redux/action";
import { removeCart } from "../Redux/action";

export default function ProductDisplay(props) {
  // console.log(props.item.parameter);
  const [buttonState, setButtonState] = useState(true);
  // 通过一个变量保存useDispatch执行的结果
  let dispatch = useDispatch();
  let handleAddToCart = (parameter) => {
    setButtonState(false);
    dispatch(addToCart(parameter));
  };
  let handdleRemoveFromCart = (parameter) => {
    setButtonState(true);
    dispatch(removeCart(parameter));
  };

  return (
    <li className='shopList' key={props.index}>
      <Link to={`/product/${props.item.parameter}`}>
        <div className='imgBox'>
          <img src={props.item.img}></img>
        </div>
        <div className='itemInfo'>
          <h2>{props.item.name}</h2>
          <h3>{props.item.brand}</h3>
          <h4>{`${props.item.price}.00`}</h4>
        </div>
      </Link>
      <button
        className={buttonState ? "addBusket" : "removeItem"}
        onClick={
          buttonState
            ? () => {
                handleAddToCart(props.item.parameter);
              }
            : () => {
                handdleRemoveFromCart(props.item.parameter);
              }
        }
      >
        {buttonState ? "Add to busket" : "Remove from busket"}
      </button>
    </li>
  );
}
