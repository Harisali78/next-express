"use client";
import React from 'react'
import { useFormik } from 'formik';
import { useState } from 'react';
import { loginSchema } from '../Model/page';
import axios from 'axios';


const initialValues = { 
    email: "",
};



const PasswordReset = () => {
    const [message, setMessage] = useState(false);

    const onSubmit = async (values:any) => {
     
            try {
              const response = await axios.post('', values);
      
              if (response.status === 201) {
                values.resetForm();
                setMessage(true);}
            //   } else {
            //     toast.error('Invalid User', {
            //       position: 'top-center',
            //     });
            //   }
            } catch (error) {
              console.error('Error:', error);
            }
          }
        
    
     
    const { values, errors, touched, handleBlur, handleChange, handleSubmit} =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <>
    <h2 className="text-3xl font-bold text-center mb-10 mt-10">Enter Your Email</h2>
    
    {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}
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
              <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4"
              type="submit"
            >
              Send
            </button>
            </div>
            </form>
    </>
  )
}

export default PasswordReset;