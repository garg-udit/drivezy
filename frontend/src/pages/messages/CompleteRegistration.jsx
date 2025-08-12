// src/pages/messages/CompleteRegistration.jsx
import React from 'react';

export const CompleteRegistration = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-yellow-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-yellow-600">Finish Your Registration</h1>
                <p className="text-gray-700 mb-4">
                    It looks like your profile is incomplete. Please update your information to access the dashboard.
                </p>
                <p className="text-sm text-gray-500">Contact support if you think this is an error.</p>
            </div>
        </div>
    );
};


