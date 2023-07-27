"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductItem, ProductProps } from "../types/page";
// import Navbar from "../navbar/navbar";



const Products: React.FC<ProductProps> = ({ token }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  const productApi = async () => {
    try {
      const show = await axios.get("http://localhost:8080/api/v1");
      setProducts(show.data.data);
      console.log(show.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    productApi();
  }, []);

  return (
    <div>
      {/* <Navbar token={token} /> */}
      <div>
        {products.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <h4>{item.message}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
