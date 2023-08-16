"use client";
import React from "react";
import Removebtn from "../Removebtn/page";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";
import ReactStars from 'react-stars'
import Search from "../Search/page";
import queryString from "query-string";
import { useParams, useRouter } from "next/navigation";



const Products = () => {
  const [currentpage, setCurrentpage] = useState(1);
  const [totalpage, setTotalpage] = useState(1)
  const router = useRouter();
  const onEditClick = (productId: string | undefined) => {
    router.push(`/${productId}/EditProduct`)
}
const onPageChange = (page: number) => {
  setCurrentpage(page);
  getProducts();
};
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    // const urlParams = {
    //   keyword: searchParams.keyword
    // }
    // const searchQuery = queryString.stringify(urlParams);
    // console.log(searchQuery);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/products?page=${currentpage}`
      );
      const data = await response;
      setProducts(data.data.data);
      setTotalpage(data.data.totalPages);
      console.log(data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  useEffect(() => {
    getProducts();

  }, [currentpage]);

  return (
    <>
     <nav className="flex justify-between items-center bg-blue-600 px-8 py-3">
        <h2 className="text-white font-semibold">Products Details</h2>
        <Link className="bg-white p-2 rounded-full"href={"/AddProduct"}>Add Product</Link>
        <Link className="bg-white p-2 rounded-full" href={"/"}>Home</Link>
      </nav>
      <Search/>
      {products.map((t:any) => (
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
                // edit={false}
              />
            </div>
            <h4>{t.review}</h4>
            <img src={t.image} alt="Not Found" height="200" width="300"/>
          </div>
          <div className="flex gap-2">
             <Removebtn id={t._id} />
         <button  className='flex gap-2' onClick={() =>{ onEditClick(t._id) }}> 
         <HiPencilAlt size={24} />
        </button>
          </div>
          <div className="flex justify-end m-2">
                {Array.from({ length: totalpage }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => onPageChange(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${currentpage === index + 1 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
      ))}
    </>
  );
};

export default Products;
