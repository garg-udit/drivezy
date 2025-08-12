import React from 'react';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => (
  <div className="min-h-screen pt-24 px-6 bg-[#f9fafb]">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-8 text-gray-600">Welcome, Admin! 🚀 Here's what's happening.</p>

      {/* Grid Split into Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Verification Cards */}
        <div className="space-y-4">
          <AdminCard
            title="Verify Users"
            description="Approve or reject new users."
            link="/admin/verify-users"
          />
          <AdminCard
            title="Verify Companies"
            description="Review company registration requests."
            link="/company/unverified"
          />
          <AdminCard
            title="Verify Providers"
            description="Approve or reject provider admins."
            link="/admin/verify-providers"
          />
          <AdminCard
            title="Verify Vehicles"
            description="Approve or reject newly added vehicles."
            link="/admin/verify-vehicles"
          />
        </div>

        {/* Right: Listing Cards */}
        <div className="space-y-4">
          <AdminCard
            title="All Verified Users"
            description="List of all verified users."
            link="/admin/verified-users"
          />
          <AdminCard
            title="All Verified Companies"
            description="List of all verified companies."
            link="/company/verified"
          />
          <AdminCard
            title="All Verified Providers"
            description="List of all verified providers."
            link="/admin/verified-providers"
          />
          <AdminCard
            title="All Vehicles"
            description="List of all vehicles in the system."
            link="/admin/all-vehicles"
          />
        </div>
      </div>
    </div>
  </div>
);

const AdminCard = ({ title, description, link }) => (
  <Link to={link} className="block">
    <div className="bg-white border-y-2 border-gray-200 shadow-sm rounded-md p-6 hover:shadow-md transition-all">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="mt-2 text-red-500 font-medium hover:underline">Go →</p>
    </div>
  </Link>
);
