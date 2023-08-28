"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useFormik } from "formik";
import ReactStars from "react-stars";
import { AddProducts, AddProductsSchema } from "@/app/Model/page";

const initialValues = {
  title: "",
  description: "",
  price: "",
  review: "",
  rating: 0,
  image: "",
};

const EditProducts = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [base64Image, setBase64Image] = useState(null);
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64Image(event.target.result);
        setFieldValue("image", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddProductsSchema,
    onSubmit: async (values: AddProducts) => {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/v1/product/${id}`,
          values
        );
        router.push("/Products");
        console.log("Product Edited successfully!", response.data);
      } catch (error) {
        console.error("Product is not Edited:", error);
      }
    },
  });
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/product/${id}`
        );
        const productData = response.data.data;
        setValues(productData);
        console.log("field values", productData);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchProductData();
    }
  }, []);

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
            value={values.title}
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
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.description && touched.description ? (
            <p>{errors.description}</p>
          ) : null}
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
          <ReactStars count={5} size={24} value={values.rating} onChange={(rating)=>setFieldValue('rating', rating)} color2={"#ffd700"} />
          
          {errors.rating && touched.rating ? <p>{errors.rating}</p> : null}
        </div>
        <div className="mb-4">
          <label htmlFor="review" className="block font-bold mb-1">
            Review:
          </label>
          <input
            type="text"
            name="review"
            id="review"
            value={values.review}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.review && touched.review ? <p>{errors.review}</p> : null}
        </div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {base64Image && (
          <div className="mt-3">
            <img src={base64Image} alt="Selected" height="200" width="300" />
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-2"
          type="submit"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
