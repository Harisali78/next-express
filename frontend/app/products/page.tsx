"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { ProductItem, ProductProps } from "../types/page";
import ProductList from "../ProductList/page";
// import Navbar from "../navbar/navbar";



const Products: React.FC<ProductProps> = ({ token }) => {
  // const [products, setProducts] = useState<ProductItem[]>([]);

  // const productApi = async () => {
  //   try {
  //     const show = await axios.get("http://localhost:5000/api/v1/products");
  //     setProducts(show.data.data);
  //     console.log(show.data.data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  // useEffect(() => {
  //   productApi();
  // }, []);

  return (
    <div>
      {/* <Navbar token={token} /> */}
      {/* <div>
        {products.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <h4>{item.message}</h4>
          </div>
        ))}
      </div> */}
      <nav className="flex justify-between items-center bg-blue-600 px-8 py-3">
        <h3 className="text-white font-semibold">Products Details</h3>
        <Link className="bg-white p-2"   href={"/AddProduct"}>Add Product</Link>
      </nav>
      <ProductList/>
    </div>
  );
};

export default Products;
