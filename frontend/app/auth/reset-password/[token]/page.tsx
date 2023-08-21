"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const ResetPasswordPage = () => {
  const router = useRouter();
  const params = useParams();
  const token = params.token;

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    // e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/reset-password/${token}`,
        { password }
      );
      router.push('/')
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div>
      {/* <form className="max-w-md mx-auto mt-8" onSubmit={handleResetPassword}> */}
        <h1 className="text-3xl font-bold text-center mb-10 mt-10">
          Reset Password
        </h1>
        <label htmlFor="password" className="block font-bold mb-1">
          Password:
        </label>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"'
        />
        <button
         onSubmit={handleResetPassword}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4"
        >
          Reset Password
        </button>
      {/* </form> */}
      <p>{message}</p>
    </div>
  );
};

export default ResetPasswordPage;
