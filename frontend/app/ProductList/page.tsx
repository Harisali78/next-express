"use client";
import React from "react";
import Removebtn from "../Removebtn/page";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

// const getProducts = async ()=>{
// try {
//   const response = await fetch(
//     "http://localhost:5000/api/v1/products",{
//       cache:"no-store",
//     });
//     if(!response.ok){
//       throw new Error('Failed to Fetch Products')
//     }
//     return response.json();
//    } catch (error) {
//   console.error("Login failed:", error);
//   }
// }

const ProductList = async () => {
  // const{products}= await getProducts();
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/products"
        // cache:"no-store",
      );
      if (!response.ok) {
        throw new Error("Failed to Fetch Products");
      }
      const data = await response.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {products.map((t:any) => (
        <div className="p-4 border-slate-300 my-3 flex justify-between gap-5 items-start">
          <div>
            <h2 className="font-semibold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
            <h3>{t.price}</h3>
            <h4>{t.rating}</h4>
            <h4>{t.review}</h4>
            <div>{t.image}</div>
          </div>
          <div className="flex gap-2">
            <Removebtn id={t._id} />
            <Link href={`/EditProductform ${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductList;
