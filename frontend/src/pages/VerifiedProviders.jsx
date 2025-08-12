// src/pages/VerifiedProviders.jsx
import React, { useEffect, useState } from 'react';
import { getVerifiedProviders } from '../api/adminApi';

const VerifiedProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await getVerifiedProviders();
        setProviders(data);
      } catch (err) {
        setError('Failed to fetch verified providers.');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) return <div className="pt-24 text-center">Loading providers...</div>;
  if (error) return <div className="pt-24 text-center text-red-500">{error}</div>;

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Verified Providers</h1>
      {providers.length === 0 ? (
        <p className="text-gray-600">No verified providers found.</p>
      ) : (
        <div className="grid gap-4">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="bg-white shadow p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{provider.name}</p>
                <p className="text-sm text-gray-600">{provider.email}</p>
                <p className="text-sm text-gray-600">Phone: {provider.phone}</p>
                {provider.companyName && (
                  <p className="text-sm text-gray-600">Company: {provider.companyName}</p>
                )}
                <p className="text-sm text-gray-600">
                  Created: {new Date(provider.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerifiedProviders;
