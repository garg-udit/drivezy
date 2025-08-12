import React from 'react';
import { Link } from 'react-router-dom';

const ProviderDashboard = () => {
  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Provider Dashboard</h1>
        <p className="mb-8 text-gray-600">Welcome, Provider! 🚗 Manage your vehicles here.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DashboardCard
            title="Add New Vehicle"
            description="Add a new vehicle to your company's fleet."
            link="/provider/add-vehicle"
          />
          <DashboardCard
            title="View My Vehicles"
            description="See and manage all vehicles you've added."
            link="/provider/view-vehicles"
          />
          <DashboardCard
            title="Approve Bookings"
            description="Review and approve pending vehicle bookings."
            link="/provider/approve-bookings"
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

export default ProviderDashboard;
