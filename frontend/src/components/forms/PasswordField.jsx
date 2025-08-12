import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordField = ({ value, onChange, placeholder = "Password", name = "password", required = true }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <input
                type={show ? 'text' : 'password'}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required={required}
                minLength={6}
            />
            <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
                title={show ? 'Hide Password' : 'Show Password'}
            >
                {show ? <FiEyeOff /> : <FiEye />}
            </span>
        </div>
    );
};

export default PasswordField;
