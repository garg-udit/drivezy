import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  getBookingsByStatus,
  approveBooking,
  rejectBooking,
  getVehicleById,
} from '../api/bookingApi';

const TABS = ['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED'];

const ApproveBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('PENDING');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getBookingsByStatus(activeTab);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      if (status === 'ACCEPTED') {
        await approveBooking(bookingId);
      } else {
        await rejectBooking(bookingId);
      }
      toast.success(`Booking ${status.toLowerCase()} successfully`);
      fetchBookings();
    } catch (error) {
      console.error(`Error updating booking to ${status}:`, error);
      toast.error(`Failed to ${status.toLowerCase()} booking`);
    }
  };

  const handleViewDetails = async (vehicleId) => {
    setDetailsLoading(true);
    try {
      const response = await getVehicleById(vehicleId);
      setSelectedVehicle(response.data);
      setShowModal(true);
    } catch (error) {
      toast.error('Failed to fetch vehicle details');
    } finally {
      setDetailsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Manage Bookings
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-medium border ${activeTab === tab
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-600">
            No {activeTab.toLowerCase()} bookings.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-md p-5 space-y-3 transition hover:shadow-xl"
              >
                <h2 className="text-xl font-bold text-gray-800">
                  {booking.vehicleTitle}
                </h2>
                <p className="text-sm text-gray-600">
                  <strong>User:</strong> {booking.userName}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Booking Dates:</strong> {booking.startDate} to {booking.endDate}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Total Price:</strong> ₹{booking.totalPrice}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Security Amount:</strong> ₹{booking.securityAmount}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong>{' '}
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${booking.status === 'PENDING'
                        ? 'bg-yellow-200 text-yellow-800'
                        : booking.status === 'ACCEPTED'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                  >
                    {booking.status}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Physical Document:</strong>{' '}
                  {booking.physicalDocumentRequired ? 'Required' : 'Not Required'}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Document Verified:</strong>{' '}
                  {booking.physicalDocumentVerified ? 'Yes' : 'No'}
                </p>

                <button
                  onClick={() => handleViewDetails(booking.vehicleId)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition"
                >
                  {detailsLoading ? 'Loading...' : 'View Vehicle Details'}
                </button>

                {activeTab === 'PENDING' && (
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => updateStatus(booking.id, 'ACCEPTED')}
                      className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, 'REJECTED')}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Vehicle Details */}
      {showModal && selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Vehicle Details</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Title:</strong> {selectedVehicle.title}</p>
              <p><strong>Brand:</strong> {selectedVehicle.vehicleBrand}</p>
              <p><strong>Model:</strong> {selectedVehicle.vehicleModel}</p>
              <p><strong>Number:</strong> {selectedVehicle.vehicleNumber}</p>
              <p><strong>Location:</strong> {selectedVehicle.location}</p>
              <p><strong>Color:</strong> {selectedVehicle.color}</p>
              <p><strong>Price Per Day:</strong> ₹{selectedVehicle.pricePerDay}</p>
              <p><strong>Security Amount:</strong> ₹{selectedVehicle.securityAmount}</p>
              <p><strong>Gear Type:</strong> {selectedVehicle.geared ? 'Manual' : 'Automatic'}</p>
              <p><strong>Category:</strong> {selectedVehicle.vehicleCategory.replace('_', ' ')}</p>
              <p><strong>Description:</strong> {selectedVehicle.description}</p>
              {selectedVehicle.rcUrl && (
                <p>
                  <strong>RC Document:</strong>{' '}
                  <a
                    href={selectedVehicle.rcUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View RC
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveBookings;
