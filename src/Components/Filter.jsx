import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "./filter.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import { Box, Button } from "@mui/material";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterShop } from "../Redux/action";
import { resetShop } from "../Redux/action";

export default function Filter() {
  const brands = [
    { label: "All Brands" },
    { label: "Salt Maalat" },
    { label: "Betsin Maalat" },
    { label: "Black Kibal" },
    { label: "Sexboomb" },
  ];
  const sortings = [
    { label: "None" },
    { label: "Name Ascending A - Z" },
    { label: "Name Descending Z - A" },
    { label: "Price High - Low" },
    { label: "Price Low - Hign" },
  ];

  const minPrice = 56;
  const maxPrice = 674;
  const minDistance = 5;
  const priceDistance = maxPrice - minPrice;

  const [value1, setValue1] = useState([0, 100]);
  const [brand, setBrand] = useState("All Brands");
  const [sortby, setSortBy] = useState("None");
  const [showFilter, setShowFilter] = useState(false);

  let dispatch = useDispatch();
  let { brandName, sortByType, priceRange } = useSelector(
    (state) => state.filterTypes
  );

  useEffect(() => {
    setBrand(brandName);
    setSortBy(sortByType);
    setValue1(priceRange);
  }, [brandName, sortByType, priceRange]);

  const handleBrandChange = (event, value) => {
    if (value) {
      console.log(`brand= ${value.label}`);
      setBrand(value.label);
    } else {
      return;
    }
  };

  let handleSortByChange = (e, value) => {
    setSortBy(value.label);
  };

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetShop());
    let prices = value1.map((item) =>
      Math.floor((item * priceDistance) / 100 + minPrice)
    );
    dispatch(
      filterShop({ brandName: brand, sortByType: sortby, priceRange: prices })
    );
  };

  const handleReset = () => {
    setValue1([0, 100]);
    setBrand("All Brands");
    setSortBy("None");
    dispatch(resetShop());
  };

  const handleShowFilter = () => {
    showFilter ? setShowFilter(false) : setShowFilter(true);
  };

  return (
    <div className='filter'>
      <div
        className='filter_icon'
        onClick={handleShowFilter}
        style={{
          overflow: "hidden",
          textWrap: "nowrap",
        }}
      >
        <span className='filter_name'>Filters</span>
        <FilterAltIcon className='filter_alt_icon'></FilterAltIcon>
      </div>
      <div
        className='filter_container'
        style={{ visibility: showFilter ? "visible" : "hidden" }}
      >
        <form action='' className='filter_form'>
          <div className='top_filter'>
            <div className='top_left_filter'>
              <h4 className='filter_tag'>Brand</h4>
              <Autocomplete
                id='combo-box-demo-1'
                options={brands}
                value={brand}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label={""} />}
                isOptionEqualToValue={(option, value) => option.label === value}
                onChange={handleBrandChange}
              />
            </div>
            <div className='top_right_filter'>
              <h4 className='sortby_tag'>Sort By</h4>
              <Autocomplete
                id='combo-box-demo-2'
                options={sortings}
                value={sortby}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label={""} />}
                isOptionEqualToValue={(option, value) => option.label === value}
                onChange={handleSortByChange}
              />
            </div>
          </div>
          <div className='mid_filter'>
            <h4 className='filter_tag'>Price Range</h4>
            <h4>{`${Math.floor(
              (value1[0] * priceDistance) / 100 + minPrice
            )} - ${Math.floor(
              (value1[1] * priceDistance) / 100 + minPrice
            )}`}</h4>
            <Box sx={{ width: "100%" }}>
              <Slider
                size='large'
                getAriaLabel={() => "Minimum distance"}
                value={value1}
                onChange={handleChange1}
                sx={{
                  height: 15,
                  color: "grey",
                  "& .MuiSlider-thumb": {
                    color: "black",
                    height: 27,
                    width: 27,
                    backgroundColor: "black",
                    border: "1px solid currentColor",
                  },
                  "& .MuiSlider-track": {
                    // height: 10,
                    color: "orange",
                  },
                }}
                disableSwap
              />
            </Box>
          </div>
          <div className='bot_filter'>
            <Button
              type='submit'
              onClick={handleSubmit}
              variant='contained'
              sx={{
                marginRight: "10px",
                backgroundColor: "#7D7D7D",
                "&:hover": { backgroundColor: "#7D7D7D" },
              }}
            >
              SUBMIT
            </Button>
            <Button
              type='reset'
              onClick={handleReset}
              variant='contained'
              sx={{
                backgroundColor: "#7D7D7D",
                "&:hover": { backgroundColor: "#7D7D7D" },
              }}
            >
              RESET
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
