import allDatas from "../data/data_origin";

import {
  addToCarts,
  increaseQuantitys,
  decreaseQuantitys,
  removeCarts,
  clearCarts,
  filterShops,
  resetShops,
} from "./acitionType";
let datas = allDatas();

let product = {
  products: datas,

  cartItems: [],

  shopItems: datas,

  filterTypes: {
    brandName: "All Brands",
    sortByType: "None",
    priceRange: [0, 100],
  },
};

let rootReducer = (state = product, action) => {
  switch (action.type) {
    case addToCarts:
      let { mycolor, myparameter, mysize } = action.payload;
      let { id, name, brand, desc, price, img, parameter, category } =
        state.products.find((product) => product.parameter == myparameter);
      console.log("in reduceer", action.payload, myparameter);
      // boolean
      let existingItem = state.cartItems.find(
        (item) =>
          item.parameter == parameter &&
          item.color == mycolor &&
          item.size == mysize
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.parameter == parameter &&
            item.color == mycolor &&
            item.size == mysize
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              id,
              name,
              brand,
              desc,
              price,
              img,
              parameter,
              category,
              size: mysize,
              color: mycolor,
              quantity: 1,
            },
          ],
        };
      }
    case increaseQuantitys:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.parameter == action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case decreaseQuantitys:
      if (
        state.cartItems.find((item) => item.parameter == action.payload)
          .quantity == 1
      ) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item.parameter !== action.payload
          ),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.parameter == action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }

    case clearCarts:
      return {
        ...state,
        cartItems: [],
      };
    case removeCarts:
      console.log("remove", state.cartItems);
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.parameter !== action.payload
        ),
      };
    case resetShops:
      return {
        ...state,
        shopItems: datas,
        filterTypes: {
          brandName: "All Brands",
          sortByType: "None",
          priceRange: [0, 100],
        },
      };
    case filterShops:
      // console.log("filter shops");
      // console.log(`payload = ${action.payload.priceRange}`);
      let { brandName, sortByType, priceRange } = action.payload;

      let filteredShop = state.shopItems.filter(
        (item) =>
          (brandName == "All Brands" || item.brand == brandName) &&
          item.price >= priceRange[0] &&
          item.price <= priceRange[1]
      );
      switch (sortByType) {
        case "Name Ascending A - Z":
          filteredShop.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
          });
          break;
        case "Name Descending Z - A":
          filteredShop.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }
            // names must be equal
            return 0;
          });
          break;
        case "Price High - Low":
          filteredShop.sort((a, b) => {
            if (a.price < b.price) {
              return 1;
            }
            if (a.price > b.price) {
              return -1;
            }
            // names must be equal
            return 0;
          });
          break;
        case "Price Low - Hign":
          filteredShop.sort((a, b) => {
            if (a.price < b.price) {
              return -1;
            }
            if (a.price > b.price) {
              return 1;
            }
            // names must be equal
            return 0;
          });
          break;
        default:
          break;
      }
      return {
        ...state,
        shopItems: filteredShop,
        filterTypes: {
          brandName: brandName,
          sortByType: sortByType,
          priceRange: priceRange,
        },
      };
    default:
      return state;
  }
};
export default rootReducer;
