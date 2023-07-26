"use client";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {User} from "../types/page"
// import Navbar from "../navbar/navbar";


export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(name, value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const createdUser = {
      email: user.email,
      password: user.password,
    };
    try {
      const response = await axios.post("http://localhost:8080/api/v1/login", createdUser);
      console.log(response.data.token);

      router.push("/Products");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <h2 className="text-3xl font-bold text-center mb-10 mt-10">Login Page</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-1">
            Email:
          </label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Email"
            value={user.email}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold mb-1">
            Password:
          </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
