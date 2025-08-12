// src/pages/errors/ServerError.jsx
import React from 'react';

export const ServerError = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-red-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                <h1 className="text-3xl font-bold text-red-600 mb-4">500 - Server Error</h1>
                <p className="text-gray-700 mb-2">Something went wrong on our end.</p>
                <p className="text-sm text-gray-500">Please try again later or contact support.</p>
            </div>
        </div>
    );
};

