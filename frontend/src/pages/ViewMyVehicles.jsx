import React, { useEffect, useState } from 'react';
import { fetchMyVehicles } from '../api/vehicleApi';

const ViewMyVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const res = await fetchMyVehicles();
        setVehicles(res.data);
      } catch (err) {
        console.error('Failed to fetch vehicles', err);
      } finally {
        setLoading(false);
      }
    };

    getVehicles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
          My Vehicles
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading vehicles...</p>
        ) : vehicles.length === 0 ? (
          <p className="text-center text-gray-600">No vehicles added yet.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white shadow-xl rounded-2xl overflow-hidden transition hover:scale-105 hover:shadow-2xl duration-300"
              >
                <img
                  src={
                    vehicle.images.length > 0
                      ? vehicle.images[0].imageUrl
                      : 'https://via.placeholder.com/300x180?text=No+Image'
                  }
                  alt={vehicle.title}
                  className="my-3 h-70 w-full object-cover"
                />
                <div className="p-5 space-y-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    {vehicle.title} ({vehicle.vehicleBrand})
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Model: {vehicle.vehicleModel}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Number: {vehicle.vehicleNumber}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${vehicle.geared
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                        }`}
                    >
                      {vehicle.geared ? 'Manual' : 'Automatic'}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${vehicle.vehicleCategory === 'TWO_WHEELER'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-purple-100 text-purple-700'
                        }`}
                    >
                      {vehicle.vehicleCategory.replace('_', ' ')}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                      Location: {vehicle.location}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">Color: {vehicle.color}</p>
                  <p className="text-gray-800 font-semibold text-lg">
                    ₹{vehicle.pricePerDay}/day
                  </p>

                  <p className="text-sm mt-1">
                    Status:{' '}
                    <span
                      className={`font-medium px-2 py-1 text-xs rounded-full ${vehicle.approved
                        ? 'bg-green-200 text-green-800'
                        : 'bg-yellow-200 text-yellow-800'
                        }`}
                    >
                      {vehicle.approved ? 'Approved' : 'Pending Approval'}
                    </span>
                  </p>

                  {vehicle.rcUrl && (
                    <a
                      href={vehicle.rcUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200 transition"
                    >
                      📄 View RC
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMyVehicles;
