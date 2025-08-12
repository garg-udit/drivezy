import React from 'react';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Filters</h2>

      {/* Vehicle Type */}
      <div>
        <label className="block mb-1 text-sm font-medium">Vehicle Type</label>
        <select
          value={filters.type}
          onChange={(e) => onFilterChange('type', e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="TWO_WHEELER">Two Wheeler</option>
          <option value="FOUR_WHEELER">Four Wheeler</option>
        </select>
      </div>

      {/* Gear Type */}
      <div>
        <label className="block mb-1 text-sm font-medium">Gear Type</label>
        <select
          value={filters.gear}
          onChange={(e) => onFilterChange('gear', e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="geared">Geared</option>
          <option value="non-geared">Non-Geared</option>
        </select>
      </div>

      {/* Max Price */}
      <div>
        <label className="block mb-1 text-sm font-medium">Max Price (₹)</label>
        <input
          type="range"
          min="50"
          max="6000"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-600">Up to ₹{filters.maxPrice}</div>
      </div>
    </div>
  );
};

export default Filters;
