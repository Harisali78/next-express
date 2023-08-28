"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";
import ReactStars from 'react-stars'
import { HiOutlineTrash } from 'react-icons/hi'
import { useRouter } from "next/navigation";
import { AddProducts } from "../Model/page";



const Products = () => {
  const [currentpage, setCurrentpage] = useState(1);
  const [totalpage, setTotalpage] = useState(1);
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minReview, setMinReview] = useState('');  
  const [products, setProducts] = useState([]);
  const router = useRouter();


  const onEditClick = (productId: string | undefined) => {
    router.push(`/${productId}/EditProduct`);
  };
  const onPageChange = (page: number) => {
    setCurrentpage(page);
    getProducts(page);
  };

  const searchProducts = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/products?page=${currentpage}&search=${query}&minPrice=${minPrice}&maxPrice=${maxPrice}&minReview=${minReview}`
        );
        setProducts(response.data.data)
        setTotalpage(response.data.totalPages)
        setCurrentpage(1);
    } catch (error: any) {
        console.log("searching failes",error)
    }
}
  const getProducts = async (page: number) => {
   
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/products?page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&minReview=${minReview}`
      );
      const data = await response;
      console.log(data);
      setProducts(data.data.data);
      console.log(data.data.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const removeProduct = async (id) => {
    const confirmed = confirm("Are you Sure");
    if (confirmed) {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/product/${id}`
      );
      const singleProduct = products.filter(
        (product: AddProducts) => product._id !== id
      );
      setProducts(singleProduct);
    }
  };

  useEffect(() => {
  if(!!query){
     searchProducts();
  }
  else(
   getProducts(currentpage)
  )
  }, [currentpage,query,minPrice,maxPrice,minReview]);
  
  return (
    <>
      <nav className="flex justify-between items-center bg-blue-600 px-8 py-3">
        <h2 className="text-white font-semibold">Products Details</h2>
        <Link className="bg-white p-2 rounded-full" href={"/AddProduct"}>
          Add Product
        </Link>
        <Link className="bg-white p-2 rounded-full" href={"/"}>
          Home
        </Link>
      </nav>
      <input
       type="text"
       placeholder="Search products..."
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       className="border border-gray-300 rounded-md px-2 py-1 mt-3 ml-3"
   />
   <button
       onClick={() => {
           if (query) {
               searchProducts();
           } else {
               getProducts(currentpage);
           }
       }}
       className="bg-blue-600 text-white rounded px-2 py-1"
   >
       Search
   </button>
   {/* <div className="flex items-center gap-4">
          <label htmlFor="priceRange" className="text-gray-600">
            Price Range:
          </label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="1000"
            step="10"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-36"
          />
          <input
            type="range"
            id="priceRange"
            min="0"
            max="1000"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-36"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="ratingRange" className="text-gray-600">
            Rating range:
          </label>
          <input
            type="range"
            id="ratingRange"
            min="0"
            max="5"
            step="0.1"
            value={minReview}
            onChange={(e) => setMinReview(e.target.value)}
            className="w-36"
          />
        </div> */}
     
      {products.map((t: AddProducts) => (
        <div className="p-4 border-slate-300 my-3 flex justify-between gap-5 items-start">
          <div>
            <h2 className="font-semibold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
            <h3>{t.price}</h3>
            <div>
              <ReactStars
                count={5}
                value={t.rating}
                size={24}
                color2={'#ffd700'}
                edit={false}
              />
            </div>
            <h4>{t.review}</h4>
            <img src={t.image} alt="Not Found" height="200" width="300" />
          </div>
          <div className="flex gap-2">
             <HiOutlineTrash size={24} id={t._id} onClick={() => removeProduct(t._id)} />
            <button
              className="flex gap-2"
              onClick={() => {
                onEditClick(t._id);
              }}
            >
              <HiPencilAlt size={24} />
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-end m-2">
        {Array.from({ length: totalpage }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentpage === index + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Products;
