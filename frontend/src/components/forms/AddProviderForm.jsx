import React, { useState } from 'react';
import { registerUser } from '../../api/auth';
import { getUser } from '../../utils/authUtils';


const AddProviderForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      errs.email = 'Invalid email format';
    }
    if (!form.password || form.password.length < 6)
      errs.password = 'Password must be at least 6 characters';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const currentUser = getUser(); // get from local storage
    const payload = {
      ...form,
      role: 'PROVIDER',
      isCompanyAdmin: false,
      companyId: currentUser?.companyId || 2, // fallback to 2 if not found
    };

    try {
      await registerUser(payload);
      setMessage('✅ Provider registered successfully!');
      setForm({ name: '', email: '', password: '', phone: '' });
    } catch (err) {
      console.error('❌ Registration failed:', err);
      setMessage('❌ Failed to register provider.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Add New Provider
          </h2>

          {['name', 'email', 'password', 'phone'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={`Enter ${field}`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

          {message && (
            <p className={`text-center text-sm font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition"
          >
            Add Provider
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProviderForm;
