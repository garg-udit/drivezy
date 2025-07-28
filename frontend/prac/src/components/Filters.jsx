import React from 'react';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Vehicle Type</label>
        <select
          value={filters.type}
          onChange={(e) => onFilterChange('type', e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">All</option>
          <option value="2-wheeler">2-Wheeler</option>
          <option value="4-wheeler">4-Wheeler</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Gear Type</label>
        <select
          value={filters.gear}
          onChange={(e) => onFilterChange('gear', e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">All</option>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Max Price</label>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          className="w-full"
        />
        <div className="text-sm text-gray-600 mt-1">Up to ₹{filters.maxPrice}</div>
      </div>
    </div>
  );
};

export default Filters;
