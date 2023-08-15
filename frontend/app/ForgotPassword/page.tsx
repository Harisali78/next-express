'use client'
import { useState } from 'react';
import axios from 'axios';


const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error requesting password reset.');
        }
    };
    return (
        <div>
          <form className='max-w-md mx-auto mt-8'>
            <h1 className='text-3xl font-bold text-center mb-10 mt-10'>Forgot Password</h1>
            <label htmlFor="email" className="block font-bold mb-1">
                Email:
              </label>
            <input
               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleForgotPassword} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4">Send Reset Email</button>
            <p>{message}</p>
            </form>
        </div>

    );
};

export default ForgotPasswordPage;
