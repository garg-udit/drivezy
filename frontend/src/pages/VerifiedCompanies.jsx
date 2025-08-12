// src/pages/VerifiedCompanies.jsx
import React, { useEffect, useState } from 'react';
import { getVerifiedCompanies } from '../api/adminApi'; // or '../api/company'

const VerifiedCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await getVerifiedCompanies();
        setCompanies(res.data);
      } catch (err) {
        console.error('Failed to fetch companies:', err);
        setError('Could not load verified companies.');
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="pt-24 max-w-5xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Verified Companies</h1>
      {error && <p className="text-red-500">{error}</p>}
      {companies.length === 0 ? (
        <p className="text-gray-600">No verified companies found.</p>
      ) : (
        <div className="grid gap-4">
          {companies.map(company => (
            <div
              key={company.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{company.name}</p>
                <p className="text-sm text-gray-600">Email: {company.email}</p>
                <p className="text-sm text-gray-600">Phone: {company.phone}</p>
                <p className="text-sm text-gray-600">Verified: ✅</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerifiedCompanies;
