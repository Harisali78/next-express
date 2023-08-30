import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const Filter = () => {
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const [products, setProducts] = useState([]);

    const handlePriceChange = (e) => {
      setPrice(e.target.value);
    };
   
    const handleRatingChange = (e) => {
      setPrice(e.target.value);
    }; 

    const FilterProducts = async (page: number) => {
   
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/products?page=${page}`
        );
        const data = await response;
        console.log(data);
        setProducts(data.data.data);
        console.log(data.data.data);
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
  return (
    <div>
      <label htmlFor="rangeInput"> Price based filteration </label>
      <input
        type="range"
        id="rangeInput"
        name="rangeInput"
        value={price}
        onChange={handlePriceChange}
      />
       <label htmlFor="rangeInput"> Review based filteration </label>
      <input
        type="range"
        id="rangeInput"
        name="rangeInput"
        value={rating}
        onChange={handleRatingChange}
      />
    </div>
  )
}

export default Filter;