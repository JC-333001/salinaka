import React from "react";
import { getData } from "../data/data_origin";
import { useParams } from "react-router-dom";
import ProductBox from "./ProductBox";
import "./productDetail.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { addToCart } from "../Redux/action";
import { removeCart } from "../Redux/action";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function ProductDetail() {
  let params = useParams();
  let item = getData(params.parameter);
  let cart = useSelector((state) => state.cartItems);
  const hasThisItem = cart.find((item) => item.parameter == params.parameter);
  // console.log("This item was added before");
  const [buttonState, setButtonState] = useState(hasThisItem ? false : true);
  const [mysize, setSize] = useState(item.size[0]);
  const [mycolor, setColor] = useState(item.color[0]);
  // 通过一个变量保存useDispatch执行的结果
  let dispatch = useDispatch();
  let handleAddToCart = (parameter) => {
    setButtonState(false);
    dispatch(
      addToCart({ myparameter: parameter, mysize: mysize, mycolor: mycolor })
    );
  };
  let handdleRemoveFromCart = (parameter) => {
    setButtonState(true);
    dispatch(removeCart(parameter));
  };
  let haddleSelectSize = (event) => {
    setSize(event.target.value);
    console.log(event.target.value);
  };

  const handleColorChange = (event) => {
    // console.log(event.target.value);
    setColor(event.target.value);
    // const value = event.target.name;
    // setSelected(selected === value ? null : value);
  };

  let navigate = useNavigate();
  let nav = () => {
    navigate("/shop");
  };
  return (
    <div className='productDetail content_container'>
      <div className='centeredContainer'>
        <div className='backToShop' onClick={nav}>
          <svg
            viewBox='64 64 896 896'
            focusable='false'
            data-icon='arrow-left'
            width='1em'
            height='1em'
            fill='currentColor'
            aria-hidden='true'
          >
            <path d='M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z'></path>
          </svg>
          <h3>Back to shop</h3>
        </div>
        <div className='productDetailContainer'>
          <div className='sideBar'>
            <div className='sideImg'>
              <img src={item.img} alt='' />
            </div>
          </div>
          <div className='mainImg'>
            <img src={item.img} alt='' />
          </div>
          <div className='itemDetail'>
            <h6 className='brand'>{item.brand}</h6>
            <h2 className='name'>{item.name}</h2>
            <h5 className='disc'>{item.desc}</h5>
            <hr />
            <h6 className='lensOpt'>Lens Width and Frame Size</h6>
            <select name='size' id='size' onChange={haddleSelectSize}>
              <option value={null}>--Select Size--</option>
              {item.size.map((size, index) => {
                return <option value={size} key={index}>{`${size} mm`}</option>;
              })}
            </select>
            <h6 className='color'>Choose Color</h6>
            <FormGroup className='colorOpt'>
              {item.color.map((color, index) => {
                // console.log(color, typeof color);
                return (
                  // <div
                  //   className='colors'
                  //   style={{ backgroundColor: color }}
                  //   key={index}
                  // ></div>
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        value={color}
                        sx={{
                          color: color,
                          fill: color,
                          "&.Mui-checked": {
                            color: "white",
                            backgroundColor: color,
                          },
                          "& .MuiSvgIcon-root": {
                            backgroundColor: color, // Change the background color of the checkbox
                          },
                        }}
                        onChange={handleColorChange}
                        checked={mycolor == color}
                      ></Checkbox>
                    }
                  />
                );
              })}
            </FormGroup>
            <h2 className='price'>{`$${item.price}.00`}</h2>
            <button
              className={buttonState ? "addBusket" : "removeItem"}
              onClick={
                buttonState
                  ? () => {
                      handleAddToCart(params.parameter);
                    }
                  : () => {
                      handdleRemoveFromCart(params.parameter);
                    }
              }
            >
              {buttonState ? "Add to busket" : "Remove from busket"}
            </button>
          </div>
        </div>
        <div className='recommmenedOnDetailPage'>
          <ProductBox
            header={"Recommended Products"}
            filter={"recommended"}
            show={"show"}
          ></ProductBox>
        </div>
      </div>
    </div>
  );
}
