import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [accountType, setAccountType] = useState('user'); // 'user' or 'supplier'
  const [supplierType, setSupplierType] = useState('individual'); // 'individual' or 'company'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

        {/* Account Type Selection */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">Register as:</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="accountType"
                value="user"
                checked={accountType === 'user'}
                onChange={() => setAccountType('user')}
              />
              <span>User</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="accountType"
                value="supplier"
                checked={accountType === 'supplier'}
                onChange={() => setAccountType('supplier')}
              />
              <span>Supplier</span>
            </label>
          </div>
        </div>

        {/* If Supplier, show sub-choice */}
        {accountType === 'supplier' && (
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">Supplier Type:</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="supplierType"
                  value="individual"
                  checked={supplierType === 'individual'}
                  onChange={() => setSupplierType('individual')}
                />
                <span>Individual</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="supplierType"
                  value="company"
                  checked={supplierType === 'company'}
                  onChange={() => setSupplierType('company')}
                />
                <span>Company</span>
              </label>
            </div>
          </div>
        )}

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder={
              accountType === 'supplier'
                ? supplierType === 'company'
                  ? 'Company Name'
                  : 'Full Name'
                : 'Full Name'
            }
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
