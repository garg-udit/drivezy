// src/pages/AdminUserList.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../api/api';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();

  const role = searchParams.get('role');
  const verified = searchParams.get('verified') === 'true';

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users', {
        params: { role, verified },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (userId, isCompany) => {
    try {
      const endpoint = isCompany ? `/admin/verify-company/${userId}` : `/admin/verify-user/${userId}`;
      await api.post(endpoint);
      setMessage('User verified successfully ✅');
      fetchUsers();
    } catch (err) {
      setMessage('Verification failed ❌');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [role, verified]);

  return (
    <div className="pt-24 px-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {verified ? 'Verified' : 'Pending'} {role?.replace('_', ' ')}s
        </h1>

        {message && <p className="mb-4 text-red-500">{message}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="space-y-4">
            {users.map(user => (
              <div key={user.id} className="bg-white shadow p-4 rounded-md">
                <p><strong>Name:</strong> {user.fullName || user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Verified:</strong> {user.verified ? 'Yes' : 'No'}</p>

                {!user.verified && (
                  <button
                    className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                    onClick={() => handleVerify(user.id, user.role === 'COMPANY_ADMIN')}
                  >
                    Verify
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserList;
