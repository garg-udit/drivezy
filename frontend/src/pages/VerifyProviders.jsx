// src/pages/VerifyProviders.jsx
import React, { useEffect, useState } from 'react';
import { getUnverifiedProviders, verifyProvider } from '../api/adminApi';

const VerifyProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProviders = async () => {
    try {
      const data = await getUnverifiedProviders();
      setProviders(data);
    } catch (err) {
      console.error('Error fetching providers:', err);
      setError('Failed to load providers');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (providerId) => {
    try {
      await verifyProvider(providerId);
      setProviders(prev => prev.filter(p => p.id !== providerId));
    } catch (err) {
      console.error('Verification failed:', err);
      alert('Failed to verify provider');
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  if (loading) return <div className="pt-24 text-center">Loading providers...</div>;
  if (error) return <div className="pt-24 text-center text-red-500">{error}</div>;

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Unverified Providers</h1>
      {providers.length === 0 ? (
        <p className="text-gray-600">No unverified providers found.</p>
      ) : (
        <div className="grid gap-4">
          {providers.map(provider => (
            <div
              key={provider.id}
              className="bg-white shadow p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{provider.name}</p>
                <p className="text-sm text-gray-600">{provider.email}</p>
                <p className="text-sm text-gray-600">Phone: {provider.phone}</p>
                <p className="text-sm text-gray-600">Company: {provider.companyName || '—'}</p>
                <p className="text-sm text-gray-600">Created: {new Date(provider.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleVerify(provider.id)}
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

export default VerifyProviders;
