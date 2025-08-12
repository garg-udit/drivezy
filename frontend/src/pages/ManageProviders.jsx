// src/pages/ManageProviders.jsx
import React, { useEffect, useState } from 'react';
import { getProvidersByCompanyId } from '../api/providerApi';

const ManageProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const companyId = JSON.parse(localStorage.getItem('user'))?.companyId;
    if (!companyId) {
      setError('Company ID not found in localStorage.');
      setLoading(false);
      return;
    }

    getProvidersByCompanyId(companyId)
      .then((res) => {
        setProviders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch providers.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Manage Providers</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-md">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Verified</th>
                <th className="py-2 px-4">Company Admin</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider, index) => (
                <tr key={provider.id} className="border-t">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{provider.name}</td>
                  <td className="py-2 px-4">{provider.email}</td>
                  <td className="py-2 px-4">{provider.phone}</td>
                  <td className="py-2 px-4">
                    <span className={
                      provider.verified
                        ? 'text-green-600 font-semibold'
                        : 'text-yellow-500 font-semibold'
                    }>
                      {provider.verified ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {provider.companyAdmin ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProviders;
