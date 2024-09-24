import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Featured from "./Components/Featured";
import Shop from "./Components/Shop";
import Recommended from "./Components/Recommended";
import Product from "./Components/Product";
import ProductDetail from "./Components/ProductDetail";
import Search from "./Components/Search";
import Cart from "./Components/Cart";
import SearchResults from "./Components/SearchResults";
import Signin from "./Components/Signin";
// 引入store   将仓库里面的数据可以让各个组件去访问
import store from "./Redux/store";
// 从react-redux里引入Provider
import { Provider } from "react-redux";
// 使用stripe
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe/stripe.utils";

import { UserProvider } from "./context/UserContext";
import Signup from "./Components/Signup";
import Signup2 from "./Components/Signup2";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path='/' element={<App></App>}>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/shop' element={<Shop></Shop>}></Route>
                <Route path='/featured' element={<Featured></Featured>}></Route>
                <Route
                  path='/recommended'
                  element={<Recommended></Recommended>}
                ></Route>
                <Route path='/cart' element={<Cart></Cart>}></Route>
                <Route path='/product' element={<Product></Product>}>
                  <Route
                    path=':parameter'
                    element={<ProductDetail></ProductDetail>}
                  ></Route>
                </Route>
                <Route path='/search' element={<Search></Search>}>
                  <Route
                    path=':query'
                    element={<SearchResults></SearchResults>}
                  ></Route>
                </Route>
                <Route path='/signin' element={<Signin></Signin>}></Route>
                <Route path='/signup' element={<Signup></Signup>}></Route>
              </Route>
            </Routes>
          </Elements>
        </BrowserRouter>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
