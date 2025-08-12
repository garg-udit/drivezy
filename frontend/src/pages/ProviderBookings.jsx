import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getBookingsByStatus, approveBooking, rejectBooking } from '../api/bookingApi';

const TABS = ['ALL', 'PENDING', 'ACCEPTED', 'REJECTED'];

const ProviderBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('ALL');

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const statusParam = activeTab !== 'ALL' ? activeTab : '';
            const res = await getBookingsByStatus(statusParam);
            setBookings(res.data);
        } catch (err) {
            toast.error('Failed to fetch bookings');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [activeTab]);

    const handleApprove = async (bookingId) => {
        try {
            await approveBooking(bookingId);
            toast.success('Booking approved');
            fetchBookings();
        } catch (err) {
            toast.error('Failed to approve booking');
            console.error(err);
        }
    };

    const handleReject = async (bookingId) => {
        try {
            await rejectBooking(bookingId);
            toast.success('Booking rejected');
            fetchBookings();
        } catch (err) {
            toast.error('Failed to reject booking');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen pt-20 px-4 pb-10 bg-gray-50">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Vehicle Bookings</h1>

                {/* Tabs */}
                <div className="flex justify-center space-x-3 mb-8">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-full border text-sm font-medium ${activeTab === tab
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : bookings.length === 0 ? (
                    <p className="text-center text-gray-500">No bookings found.</p>
                ) : (
                    <div className="space-y-5">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="bg-white shadow rounded-lg p-5 space-y-2">
                                <h2 className="text-xl font-bold">{booking.vehicleTitle}</h2>
                                <p><strong>Status:</strong> {booking.status}</p>
                                <p><strong>Booking Dates:</strong> {booking.startDate} to {booking.endDate}</p>
                                <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
                                <p><strong>Security Amount:</strong> ₹{booking.securityAmount}</p>
                                <p><strong>Physical Document:</strong> {booking.physicalDocumentRequired ? 'Required' : 'Not Required'}</p>
                                <p><strong>Document Verified:</strong> {booking.physicalDocumentVerified ? 'Yes' : 'No'}</p>

                                {booking.status === 'PENDING' && (
                                    <div className="flex space-x-3 pt-2">
                                        <button
                                            onClick={() => handleApprove(booking.id)}
                                            className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleReject(booking.id)}
                                            className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
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
        </div>
    );
};

export default ProviderBookings;
