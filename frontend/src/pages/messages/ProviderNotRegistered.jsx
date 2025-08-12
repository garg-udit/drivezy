// src/pages/messages/ProviderNotRegistered.jsx
import React from 'react';

export const ProviderNotRegistered = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">Provider Registration Required</h1>
                <p className="text-gray-700">
                    You are logged in as a provider, but your company is not yet registered with us.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    Please contact support or your company administrator to proceed.
                </p>
            </div>
        </div>
    );
};

