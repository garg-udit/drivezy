// src/pages/messages/UnauthorizedAccess.jsx
import React from 'react';

export const UnauthorizedAccess = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-red-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-700">
                    You do not have the required permissions to view this page.
                </p>
                <p className="text-sm text-gray-500 mt-2">Please contact the admin if you believe this is a mistake.</p>
            </div>
        </div>
    );
};

