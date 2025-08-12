// src/pages/errors/NotFound.jsx
import React from 'react';

export const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-gray-700 mb-2">Oops! Page not found.</p>
                <p className="text-sm text-gray-500">The page you are looking for might have been removed or renamed.</p>
            </div>
        </div>
    );
};

