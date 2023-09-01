import React from 'react'
import { useState } from 'react'
import axios from 'axios';


const FilterSearch = () => {
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [products, setProducts] = useState([]);

    const handlePriceChange = (e) => {
      const value = e.target.value;
      console.log('Price:', value);
      setPrice(value);
      FilterProducts(1); // Call the filtering function here
    };
   
    const handleRatingChange = (e) => {
      const value = e.target.value;
      console.log('Rating:', value);
      setRating(value);
      FilterProducts(1);
    };

    const FilterProducts = async (page: number) => {
   
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/products?page=${page}&min=${min}&max=${max}`
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
        min="0"
        max="100"
        name="rangeInput"
        value={price}
        onChange={handlePriceChange}
      />
       <label htmlFor="rangeInput"> Review based filteration </label>
      <input
        type="range"
        id="rangeInput"
        min="0"
        max="100"
        name="rangeInput"
        value={rating}
        onChange={handleRatingChange}
      />
    </div>
  )
}

export default FilterSearch;