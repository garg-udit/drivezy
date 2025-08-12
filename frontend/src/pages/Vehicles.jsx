// import React, { useState, useEffect } from 'react';
// import { api } from '../api/api';
// import Filters from '../components/Filters';
// import VehicleCard from '../components/VehicleCard';

// const Vehicles = () => {
//   const [filters, setFilters] = useState({
//     type: '',
//     gear: '',
//     maxPrice: 2000,
//   });

//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   useEffect(() => {
//     const fetchApprovedVehicles = async () => {
//       try {
//         const response = await api.get('/vehicles/status?approved=true');
//         setVehicles(response.data);
//       } catch (err) {
//         console.error('Error fetching vehicles:', err);
//         setError('Failed to load vehicles.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApprovedVehicles();
//   }, []);

//   const filteredVehicles = vehicles.filter((vehicle) => {
//     const matchesType = filters.type === '' || vehicle.vehicleCategory === filters.type;
//     const matchesGear =
//       filters.gear === '' ||
//       (filters.gear === 'geared' && vehicle.geared) ||
//       (filters.gear === 'non-geared' && !vehicle.geared);
//     const matchesPrice = vehicle.pricePerDay <= filters.maxPrice;
//     return matchesType && matchesGear && matchesPrice;
//   });

//   if (loading) return <div className="pt-24 text-center">Loading vehicles...</div>;
//   if (error) return <div className="pt-24 text-center text-red-500">{error}</div>;

//   return (
//     <div className="bg-gray-50 min-h-screen pt-24 px-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid md:grid-cols-4 gap-6">
//           {/* Filters Panel */}
//           <div className="md:col-span-1">
//             <Filters filters={filters} onFilterChange={handleFilterChange} />
//           </div>

//           {/* Vehicle Cards */}
//           <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredVehicles.length > 0 ? (
//               filteredVehicles.map((vehicle) => (
//                 <VehicleCard key={vehicle.id} vehicle={vehicle} />
//               ))
//             ) : (
//               <p className="col-span-full text-center text-gray-500">No vehicles found</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Vehicles;


import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import Filters from '../components/Filters';
import VehicleCard from '../components/VehicleCard';

const Vehicles = () => {
  const [filters, setFilters] = useState({
    type: '',
    gear: '',
    maxPrice: 2000,
  });

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const fetchApprovedVehicles = async () => {
      try {
        const response = await api.get('/vehicles/status?approved=true');
        setVehicles(response.data);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError('Failed to load vehicles.');
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesType = filters.type === '' || vehicle.vehicleCategory === filters.type;
    const matchesGear =
      filters.gear === '' ||
      (filters.gear === 'geared' && vehicle.geared) ||
      (filters.gear === 'non-geared' && !vehicle.geared);
    const matchesPrice = vehicle.pricePerDay <= filters.maxPrice;
    return matchesType && matchesGear && matchesPrice;
  });

  if (loading) {
    return (
      <div className="pt-32 text-center text-lg font-medium text-gray-600">
        Loading vehicles...
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 text-center text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 to-white min-h-screen pt-28 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Filters Panel */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Filter Vehicles
            </h2>
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-base">
              No vehicles match your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
