"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Product from "./products/page";
import { UserData } from "./types/page";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegistration = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/signup",
        userData
      );
      console.log("Registration successful!", response.data);
      router.push("/Product");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl border">Hey</h1>
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

            <Link
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
              href="/Product"
            >
              Sign Up
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
