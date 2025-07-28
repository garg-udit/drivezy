import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Drivezy</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-md" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md" />
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">Login</button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account? <Link to="/register" className="text-red-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
