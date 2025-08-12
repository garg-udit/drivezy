import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import toast from 'react-hot-toast';

const VerifyVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [zoomImageUrl, setZoomImageUrl] = useState(null);

  // Fetch unverified vehicles
  const fetchUnverifiedVehicles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/vehicles/status?approved=false', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVehicles(response.data);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError('Failed to load vehicles.');
    } finally {
      setLoading(false);
    }
  };

  // Verify vehicle
  const verifyVehicle = async (vehicleId) => {
    try {
      const token = localStorage.getItem('token');
      
      await api.put(`/vehicles/${vehicleId}/approve`);

      toast.success('Vehicle verified!');
      setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
    } catch (err) {
      console.error('Verification failed:', err);
      toast.error('Failed to verify vehicle.');
    }
  };

  useEffect(() => {
    fetchUnverifiedVehicles();
  }, []);

  if (loading) return <div className="pt-24 text-center text-lg font-semibold">Loading vehicles...</div>;
  if (error) return <div className="pt-24 text-center text-red-500">{error}</div>;

  return (
    <div className="pt-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Verify Vehicles</h1>

      {vehicles.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No unverified vehicles found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{vehicle.title}</h2>
                <button
                  onClick={() => verifyVehicle(vehicle.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded text-sm"
                >
                  ✅ Verify
                </button>
              </div>

              {/* Vehicle Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                <p><span className="font-medium">Brand:</span> {vehicle.vehicleBrand}</p>
                <p><span className="font-medium">Model:</span> {vehicle.vehicleModel}</p>
                <p><span className="font-medium">Number:</span> {vehicle.vehicleNumber}</p>
                <p><span className="font-medium">Location:</span> {vehicle.location}</p>
                <p><span className="font-medium">Price/Day:</span> ₹{vehicle.pricePerDay}</p>
                <p><span className="font-medium">Security:</span> ₹{vehicle.securityAmount}</p>
                <p><span className="font-medium">Geared:</span> {vehicle.geared ? 'Yes' : 'No'}</p>
                <p><span className="font-medium">Color:</span> {vehicle.color}</p>
                <p><span className="font-medium">Category:</span> {vehicle.vehicleCategory}</p>
                <p><span className="font-medium">Created:</span> {new Date(vehicle.createdAt).toLocaleString()}</p>
              </div>

              {/* Vehicle Images */}
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-800 mb-1">Images:</p>
                {vehicle.images && vehicle.images.length > 0 ? (
                  <div className="flex gap-2 flex-wrap">
                    {vehicle.images.map((img) => (
                      <img
                        key={img.id}
                        src={img.imageUrl}
                        alt="Vehicle"
                        onClick={() => setZoomImageUrl(img.imageUrl)}
                        className="w-24 h-16 rounded object-cover border cursor-pointer hover:scale-105 transition-transform"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No images uploaded.</p>
                )}
              </div>

              {/* RC Image */}
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">RC Document:</p>
                {vehicle.rcUrl ? (
                  <img
                    src={vehicle.rcUrl}
                    alt="RC Document"
                    onClick={() => setZoomImageUrl(vehicle.rcUrl)}
                    className="w-24 h-16 rounded object-cover border cursor-pointer hover:scale-105 transition-transform"
                  />
                ) : (
                  <p className="text-gray-400 italic">RC not uploaded.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Zoom Image Modal */}
      {zoomImageUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setZoomImageUrl(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold bg-black bg-opacity-40 px-2 rounded hover:bg-opacity-70"
              onClick={() => setZoomImageUrl(null)}
            >
              ✕
            </button>
            <img
              src={zoomImageUrl}
              alt="Zoomed"
              className="w-full max-h-[90vh] object-contain rounded shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyVehicle;
