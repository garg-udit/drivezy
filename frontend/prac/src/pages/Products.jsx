import React, { useState } from 'react';
import vehiclesData from '../data/vehicles';
import Filters from '../components/Filters';
import VehicleCard from '../components/VehicleCard';

const Vehicles = () => {
  const [filters, setFilters] = useState({
    type: '',
    gear: '',
    maxPrice: 2000
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredVehicles = vehiclesData.filter(vehicle => {
    return (
      (filters.type === '' || vehicle.type === filters.type) &&
      (filters.gear === '' || vehicle.gear === filters.gear) &&
      vehicle.price <= filters.maxPrice
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen pt-24 px-6">
      {/* ↑ Added pt-24 to push content below fixed navbar */}

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Filters Panel */}
          <div className="md:col-span-1">
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Vehicle Cards */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No vehicles found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
