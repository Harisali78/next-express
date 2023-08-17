"use client";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { LoginEntity, loginSchema } from "./Model/page";




const initialValues = {
  email: "",
  password: "",
};
export default function Login() {
  const [error, setError] = useState('')
  const onSubmit = async (values: LoginEntity) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/login",
        values
      );
      const token = response.data.token
      localStorage.setItem('token', token)
      console.log("User login successfully!", response.data);
      router.push("/Products");
    } catch (error:any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      
    }
      console.error("Login failed:", error);
    }
  };
    const router = useRouter();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit,
  });
  

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-10 mt-10">Login Page</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-1">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.email && touched.email ? <p>{errors.email}</p> : null}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.password && touched.password ? (
            <p>{errors.password}</p>
          ) : null}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
          type="submit"
        >
          Log In
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-10"
          type="submit"
          onClick={() => router.push("/Register")}
        >
          Sign Up
        </button>
        <p className="mt-5 font-semibold">Forgot Password?
        <Link href="/auth/ForgotPassword">
            Click Here! 
        </Link>
        </p>
      </form>
    </div>
  );
}
