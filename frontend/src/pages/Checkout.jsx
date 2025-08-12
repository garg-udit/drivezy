// pages/Checkout.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showModal, setShowModal] = useState(false);

  if (!state) {
    return <p className="text-center mt-10 text-red-500">No booking details found!</p>;
  }

  const { vehicle, startDate, endDate, days, total } = state;
  const handleConfirm = async () => {
  try {
    const response = await api.post('/bookings', {
      vehicleId: vehicle.id,
      startDate,
      endDate,
      physicalDocumentRequired: true
    });

    if (response.status === 201 || response.status === 200) {
      setShowModal(true);
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error('Booking error:', error);
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data &&
      error.response.data.error === 'Vehicle is not available in selected dates'
    ) {
      alert('❌ This vehicle is not available for the selected dates. Please choose different dates.');
    } else {
      alert(error.response.data.error);
    }
  }
};

  const handleOk = () => {
    setShowModal(false);
    navigate('/'); // Redirect to home after confirmation
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 mt-10 pt-10 cursor-default">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        Booking Summary
      </h2>

      <div className="space-y-3 text-lg text-gray-700">
        <p><span className="font-semibold">Vehicle:</span> {vehicle.title}</p>
        <p><span className="font-semibold">Start Date:</span> {startDate}</p>
        <p><span className="font-semibold">End Date:</span> {endDate}</p>
        <p><span className="font-semibold">Days:</span> {days}</p>
        <p><span className="font-semibold">Price/Day:</span> ₹{vehicle.pricePerDay}</p>
      </div>

      <div className="text-2xl font-bold text-orange-600 mt-6">
        Total Amount: ₹{total}
      </div>

      <button
        className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300  transition cursor-pointer"
        onClick={handleConfirm}
      >
        Confirm Booking
      </button>

      {/* ✅ Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-green-600 mb-3">🎉 Booking Confirmed!</h2>
            <p className="text-gray-700 mb-4">
              Your booking for <strong>{vehicle.title}</strong> from <strong>{startDate}</strong> to <strong>{endDate}</strong> has been successfully confirmed.
            </p>
            <p className="text-lg font-bold text-orange-600 mb-4">Total Paid: ₹{total}</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold  transition cursor-pointer"
              onClick={handleOk}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
