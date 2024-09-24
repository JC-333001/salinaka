import React, { useEffect, useState } from "react";
import allDatas from "../data/data_origin";
import "./shopProductCard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCart } from "../Redux/action";

export default function ProductDisplay(props) {
  const cart = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const [buttonState, setButtonState] = useState(true); // 初始状态为添加

  // 监测购物车变化并更新按钮状态
  useEffect(() => {
    const hasThisItem = cart.find(
      (item) => item.parameter === props.item.parameter
    );
    setButtonState(!hasThisItem); // 如果存在，则设置为 false，否则为 true
  }, [cart, props.item.parameter]); // 依赖数组包括购物车和当前商品参数

  const handleAddToCart = (parameter) => {
    dispatch(addToCart(parameter));
  };

  const handleRemoveFromCart = (parameter) => {
    dispatch(removeCart(parameter));
  };

  return (
    <li className='shopList' key={props.index} style={{ width: "200px" }}>
      <Link to={`/product/${props.item.parameter}`}>
        <div className='imgBox'>
          <img src={props.item.img} alt={props.item.name} />
        </div>
        <div className='itemInfo'>
          <h2>{props.item.name}</h2>
          <h3>{props.item.brand}</h3>
          <h4>{`${props.item.price}.00`}</h4>
        </div>
      </Link>
      <button
        className={buttonState ? "addBusket" : "removeItem"}
        onClick={() => {
          if (buttonState) {
            handleAddToCart({
              myparameter: props.item.parameter,
              mysize: props.item.size[0],
              mycolor: props.item.color[0],
            });
          } else {
            handleRemoveFromCart(props.item.parameter);
          }
        }}
      >
        {buttonState ? "Add to busket" : "Remove from busket"}
      </button>
    </li>
  );
}
