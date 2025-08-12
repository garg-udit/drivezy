// src/pages/messages/PendingApproval.jsx
import React from 'react';

export const PendingApproval = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-orange-50">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                <h1 className="text-2xl font-bold text-orange-600 mb-4">Pending Approval</h1>
                <p className="text-gray-700">
                    Your request has been submitted and is currently under review.
                </p>
                <p className="text-sm text-gray-500 mt-2">We will notify you once it’s approved.</p>
            </div>
        </div>
    );
};

