"use client";
import React from 'react'
import FileBase from "react-file-base64";
import {useState} from "react";
import ReactStars from 'react-stars'
import axios from 'axios';
import { useFormik } from 'formik';
import { AddProducts, AddProductsSchema } from '../Model/page';
import { useRouter } from 'next/navigation';
import { string } from 'yup';
 
// const handleImageChange = (e: any) => {
//   const file = e.target.files[0];
//   if (file) {
//       const reader = new FileReader();
//       reader.onload = (event: any) => {
//           setBase64Image(event.target.result);
//           form.setFieldValue('image', event.target.result);
//       };
//       reader.readAsDataURL(file);
//   }
// };
const initialValues = {
    title: "",
    description: "",
    price: "",
    review: "",
  };

const AddProduct:React.FC = () => {
const [fileUpload, setFileUpload] = useState<string>("");
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const router = useRouter();
const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: AddProductsSchema,
      onSubmit: async (values: AddProducts) => {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/v1/createProduct",
            values
          );
          console.log("Product Created successfully!", response.data);
          router.push("/Products");
        } catch (error) {
          console.error("Product is not created:", error);
        }
      },
    });
 
  return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Add a Product</h1>
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
              type="text"
              name="price"
              id="price"
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
           value={string}
           color2={'#ffd700'}
           />
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
          >
            Add Product
          </button>
        </form>
      </div>
  )
}

export default AddProduct