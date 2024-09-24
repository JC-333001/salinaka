import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductDisplay from "./ProductDisplay";

export default function SearchResults() {
  let datas = useSelector((state) => state.products);
  let query = useParams().query.toLowerCase();
  let founditems = datas.filter(
    (item) =>
      item.name.toLowerCase().indexOf(query) >= 0 ||
      item.brand.toLowerCase().indexOf(query) >= 0
  );

  return (
    <div className='content_container'>
      <ul className='shopProductList'>
        {founditems.map((item, index) => {
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
  );
}
