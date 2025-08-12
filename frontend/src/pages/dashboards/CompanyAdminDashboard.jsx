import React from 'react';
import { Link } from 'react-router-dom';

const CompanyAdminDashboard = () => {
  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Company Admin Dashboard</h1>
        <p className="mb-8 text-gray-600">Welcome, Company Admin! 🏢 Manage your operations here.</p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Add Provider"
            description="Add new providers to your company."
            link="/company-admin/add-provider"
          />
          <DashboardCard
            title="Manage Providers"
            description="View and manage your current providers."
            link="/company/manage-providers"
          />
          <DashboardCard
            title="Vehicle Listings"
            description="Manage vehicles listed by your company."
            link="/company/vehicle-list"
          />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, description, link }) => (
  <Link to={link}>
    <div className="bg-white shadow-md rounded-md p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
      <p className="mt-3 text-red-500 font-semibold underline">Go →</p>
    </div>
  </Link>
);

export default CompanyAdminDashboard;
