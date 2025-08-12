// src/pages/VerifiedUsers.jsx
import React, { useEffect, useState } from 'react';
import { getVerifiedUsers } from '../api/adminApi';

const VerifiedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getVerifiedUsers();
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching verified users:', err);
        setError('Failed to load verified users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="pt-24 text-center">Loading verified users...</div>;
  if (error) return <div className="pt-24 text-center text-red-500">{error}</div>;

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Verified Users</h1>
      {users.length === 0 ? (
        <p className="text-gray-600">No verified users found.</p>
      ) : (
        <div className="grid gap-4">
          {users.map(user => (
            <div
              key={user.id}
              className="bg-white shadow p-4 rounded-md"
            >
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">Phone: {user.phone}</p>
              <p className="text-sm text-gray-600">Verified: ✅</p>
              <p className="text-sm text-gray-600">Created: {new Date(user.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerifiedUsers;
