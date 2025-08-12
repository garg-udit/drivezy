import React from 'react';
import { useNavigate } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/vehicle/${vehicle.id}`);
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Vehicle Image */}
      <div className="relative">
        <img
          // style={{ marginTop: '20px' }}
          src={vehicle.images?.[0]?.imageUrl || '/no-image.jpg'}
          alt={vehicle.title}
          className="w-full h-65 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded shadow">
          {vehicle.vehicleCategory.replace('_', ' ')}
        </span>
      </div>

      {/* Vehicle Info */}
      <div className="p-4 space-y-1">
        <h3 className="text-base font-semibold text-gray-800 truncate">{vehicle.title}</h3>
        <p className="text-sm text-gray-500 truncate">Brand: <span className="text-gray-700 font-medium">{vehicle.vehicleBrand}</span></p>
        <p className="text-sm text-gray-500 truncate">Model: <span className="text-gray-700 font-medium">{vehicle.vehicleModel}</span></p>

        {/* Pricing and Gear */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-lg font-bold text-orange-600">
            ₹{vehicle.pricePerDay}
            <span className="text-sm text-gray-600 font-normal"> /day</span>
          </div>
          <div className="text-xs italic text-gray-500">
            {vehicle.geared ? 'Geared' : 'Non-Geared'}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleBookNow}
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm py-2 rounded-md transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
