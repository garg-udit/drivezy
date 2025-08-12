// src/pages/VerifyCompanies.jsx
import React, { useEffect, useState } from 'react';
import { getUnverifiedCompanies, verifyCompanyById } from '../api/adminApi';

const VerifyCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUnverifiedCompanies = async () => {
    try {
      const response = await getUnverifiedCompanies();
      setCompanies(response.data);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (companyId) => {
    try {
      await verifyCompanyById(companyId);
      setCompanies(prev => prev.filter(c => c.id !== companyId));
    } catch (err) {
      console.error('Verification failed:', err);
      alert('Failed to verify company');
    }
  };

  useEffect(() => {
    fetchUnverifiedCompanies();
  }, []);

  if (loading) return <div className="pt-24 text-center">Loading companies...</div>;
  if (error) return <div className="pt-24 text-center text-red-500">{error}</div>;

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Unverified Companies</h1>
      {companies.length === 0 ? (
        <p className="text-gray-600">No unverified companies found.</p>
      ) : (
        <div className="grid gap-4">
          {companies.map(company => (
            <div
              key={company.id}
              className="bg-white shadow p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{company.name}</p>
                <p className="text-sm text-gray-600">{company.email}</p>
                <p className="text-sm text-gray-600">Phone: {company.phone}</p>
                <p className="text-sm text-gray-600">Created: {new Date(company.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleVerify(company.id)}
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

export default VerifyCompanies;
