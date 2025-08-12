import React, { useEffect, useState } from 'react';
import { fetchUnverifiedUsers, verifyUser } from '../api/adminApi';

const VerifyUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUnverifiedUsers();
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleVerify = async (userId) => {
    try {
      await verifyUser(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Verification failed:', err);
      alert('Failed to verify user.');
    }
  };

  if (loading) {
    return <div className="pt-24 text-center">Loading users...</div>;
  }

  if (error) {
    return <div className="pt-24 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Unverified Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-600">No unverified users found.</p>
      ) : (
        <div className="grid gap-4">
          {users.map(user => (
            <div
              key={user.id}
              className="bg-white shadow p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">Phone: {user.phone}</p>
                <p className="text-sm text-gray-600">
                  Created: {new Date(user.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleVerify(user.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Verify
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerifyUsers;
