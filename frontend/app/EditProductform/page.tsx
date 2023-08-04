"use client";
import React from 'react'
import FileBase from "react-file-base64";
import {useState} from "react";
import ReactStars from 'react-stars'
import { useFormik } from 'formik';
import { AddProducts, AddProductsSchema } from '../Model/page';
import { useRouter } from 'next/navigation';
import { headers } from 'next/dist/client/components/headers';
import { boolean } from 'yup';
 

const initialValues = {
    title: "",
    description: "",
    price: 0,
    review: "",
  };

export default function EditProductform({title,description,Rating,review,price,image}){
const[newTitle, setNewTitle]=useState(title);
const [newDescription, setNewDescription] = useState(description); 
const [newRating, setNewRating] = useState(Rating);
const [newReview, setNewReview] = useState(review);
const [newPrice, setNewPrice] = useState(price);
const [newImage, setNewImage] = useState(image);
const [fileUpload, setFileUpload] = useState<string>("");
const router = useRouter();
const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: AddProductsSchema,
      onSubmit: async (values: AddProducts) => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/v1/product/${id}`,
            method :'PUT',
            headers:{
              "Content-type":"application/json",
            },
            body: JSON.stringify({newTitle,newDescription,newRating,newReview,newPrice,newImage}),
            if(!response.ok){
              throw new Error('Failed to update')
            }
            // router.push("/Products")
          );
          console.log("ProductUdated successfully!", response.data);
        } catch (error) {
          console.error("ProductUpdate failed:", error);
        }
      },
    });
  return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-5">Update a Product</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title?.toString()}
            onChange={handleChange}
            // value={newTitle}
            // onChange={e =>setNewTitle(e.target.value)}
            onBlur={handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.title && touched.title ? <p>{errors.title}</p> : null}
        </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-1">
              Description:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={values.description?.toString()}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.description && touched.description ? <p>{errors.description}</p> : null}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-bold mb-1">
              Price:
            </label>
            <input
              type="Price"
              name="Price"
              id="Price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
              {errors.price && touched.price ? <p>{errors.price}</p> : null}
          </div>
          <div className="mb-4">
           <h2 className="block font-bold mb-1">Ratings </h2>
           <ReactStars
           count={5}
           size={24}
           color2={'#ffd700'} />
           </div>
           <div className="mb-4">
            <label htmlFor="review" className="block font-bold mb-1">
              Review:
            </label>
            <input
              type="text"
              name="review"
              id="review"
              value={values.review?.toString()}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
              {errors.review && touched.review ? <p>{errors.review}</p> : null}
           </div> 
         <div>    
        <label htmlFor="image" className='block font-bold mb-1'>Upload Image:</label>
          {/* <FileBase type="file" multiple={false} onDone={({base64:any})=> setFileUpload(base64)} value={fileUpload} name="file"/> */}
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }: { base64: string }) => setFileUpload(base64)}
            name="file"
          />
         </div>
         
          
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-2"
            type="submit"
            onClick={() => router.push("/Products")}
          >
            Update Product
          </button>
        </form>
      </div>
  )
}

