import React from "react";
import { useSelector } from "react-redux";
import "./cart.css";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  removeCart,
} from "../Redux/action";
import { Link } from "react-router-dom";
// useSelector()
export default function Cart({ setDrawer }) {
  let products = useSelector((state) => state.cartItems);
  let dispath = useDispatch();
  let increaseQuantity2 = (parameter) => {
    dispath(increaseQuantity(parameter));
  };
  let decreaseQuantity2 = (parameter) => {
    dispath(decreaseQuantity(parameter));
    console.log("111111");
  };
  let clearCart2 = () => {
    dispath(clearCart());
  };
  let removeCart2 = (parameter) => {
    dispath(removeCart(parameter));
  };
  // reduce
  let getTotalPrice = () => {
    return products.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity);
    }, 0);
  };
  return (
    <div className='customer_cart'>
      <div className='top'>
        <div className='topLeft'>
          MyBasket <span className='item_counts'>({products.length} item)</span>
        </div>
        <div className='top_right'>
          <div
            className='close_btn'
            onClick={() => {
              setDrawer(false);
              console.log("close clicked");
            }}
          >
            Close
          </div>
          <div className='clear' onClick={clearCart2}>
            Clear Basket
          </div>
        </div>
      </div>
      <div className='all_items'>
        {products.map((item, index) => {
          return (
            <div className='list_container'>
              <div className='list_item' key={index}>
                <div className='btns_container'>
                  <div
                    className='increase'
                    onClick={() => {
                      increaseQuantity2(item.parameter);
                    }}
                  >
                    +
                  </div>
                  <div
                    className='decrease'
                    onClick={() => {
                      decreaseQuantity2(item.parameter);
                    }}
                  >
                    -
                  </div>
                </div>
                <div className='product_container'>
                  <div
                    className='product_img'
                    style={{ backgroundImage: `url(${item.img})` }}
                  >
                    {/* <img src={item.img} alt='' /> */}
                  </div>
                  <div className='product_info'>
                    <Link
                      to={`/product/${item.parameter}`}
                      onClick={() => {
                        setDrawer(false);
                      }}
                    >
                      <div className='product_brand'>{item.brand}</div>
                    </Link>
                    <div className='product_detail'>
                      <div className='quantity'>
                        <div className='product_detail_title'>Quantity</div>
                        <div className='product_detail_param'>
                          {item.quantity}
                        </div>
                      </div>
                      <div className='size'>
                        <div className='product_detail_title'>Size</div>
                        <div className='product_detail_param'>
                          {item.size} mm
                        </div>
                      </div>
                      <div className='color'>
                        <div className='product_detail_title'>Color</div>
                        <div className='product_detail_param'>
                          <div
                            className='color_circle'
                            style={{ backgroundColor: `${item.color}` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='product_price'>
                    <span className='item_price'>{`$ ${item.price}`}</span>
                  </div>
                </div>
                <div
                  className='remove_btn'
                  onClick={() => {
                    removeCart2(item.parameter);
                  }}
                >
                  X
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='cart_bottom'>
        <div className='cart_bottom_container'>
          <div className='subtotal'>
            <h4 className='subtotal_amount'>Subtotal Amount:</h4>
            <h3 className='amount_value'>${getTotalPrice()}</h3>
          </div>
          <div className='checkout'>
            <div className='checkout_btn'>Check Out</div>
          </div>
        </div>
      </div>
    </div>
  );
}
