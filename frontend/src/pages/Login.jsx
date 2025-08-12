import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login as loginApi } from '../api/auth';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '../auth/AuthContext';
import { getDashboardRoute } from '../utils/authUtils';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await loginApi(email, password);
      const token = response.data.message;

      await login(token);

      const from = location.state?.from?.pathname || getDashboardRoute(JSON.parse(localStorage.getItem('user')));
      navigate(from, { replace: true });

    } catch (error) {
      const status = error.response?.status;
      const errorMsg = error.response?.data?.message || error.message;

      if (status === 401) {
        setMessage('❌ Unauthorized: Invalid credentials.');
      } else if (status === 403) {
        setMessage('⛔ Forbidden: You are not allowed.');
      } else if (status === 500) {
        setMessage('💥 Server error. Please try again later.');
      } else {
        setMessage('❌ Login failed: ' + errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl px-8 py-10 max-w-md w-full animate-fade-in-up">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to <span className="text-red-500">Drivezy</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 px-2 flex items-center text-gray-500 hover:text-gray-800 focus:outline-none"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition shadow-md"
          >
            Login
          </button>
        </form>

        {message && (
          <div className="mt-4 text-sm text-center text-gray-700">
            {message}
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-red-500 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
