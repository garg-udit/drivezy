import React from 'react';

const UserFields = ({ name, setName, email, setEmail, phone, setPhone }) => (
    <>
        <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
        <input
            type="email"
            placeholder="Email"
            pattern="^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <input
            type="tel"
            placeholder="Phone Number"
            pattern="^\d{10}$"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
        />
    </>
);

export default UserFields;
