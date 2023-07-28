"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserData } from "./types/page";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    console.log(name, value)
    setUserData({ ...userData, [name]: value });
  };

  const handleRegistration = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/register",
        userData
      );
      console.log("Registration successful!", response.data);
      // router.push("/Products");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Register</h1>
          <form onSubmit={handleRegistration}>
            <div className="mb-4">
              <label htmlFor="first_name" className="block font-bold mb-1">
                First Name:
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={userData.first_name}
                onChange={changeHandler}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="block font-bold mb-1">
                Last Name:
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={userData.last_name}
                onChange={changeHandler}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-1">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={userData.email}
                onChange={changeHandler}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={changeHandler}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              className="bg-black text-white py-1 px-2 rounded"
              type="submit"
            >
              Sign Up
            </button>
            <p>Already have account? Please <Link href='/login'>login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
