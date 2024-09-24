import {
  addToCarts,
  increaseQuantitys,
  decreaseQuantitys,
  clearCarts,
  removeCarts,
  filterShops,
  resetShops,
  setPages,
} from "./acitionType";
// 定义添加至购物车action对象
export let addToCart = (parameter) => ({
  type: addToCarts,
  payload: parameter,
});
export let increaseQuantity = (parameter) => ({
  type: increaseQuantitys,
  payload: parameter,
});
export let decreaseQuantity = (parameter) => ({
  type: decreaseQuantitys,
  payload: parameter,
});
export let clearCart = (parameter) => ({
  type: clearCarts,
  payload: parameter,
});
export let removeCart = (parameter) => ({
  type: removeCarts,
  payload: parameter,
});
export let filterShop = (parameter) => ({
  type: filterShops,
  payload: parameter,
});
export let resetShop = (parameter) => ({
  type: resetShops,
  payload: parameter,
});
export let setPage = (parameter) => ({
  type: setPages,
  payload: parameter,
});
