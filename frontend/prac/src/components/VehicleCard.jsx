import React from 'react';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <img src={vehicle.image} alt={vehicle.name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="mt-3 text-lg font-semibold">{vehicle.name}</h3>
      <p className="text-sm text-gray-600 capitalize">{vehicle.type} • {vehicle.gear}</p>
      <p className="text-red-500 font-semibold mt-1">₹{vehicle.price} / day</p>
      <button className="mt-3 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">Book Now</button>
    </div>
  );
};

export default VehicleCard;
