import { api } from './api';
export const getBookingsByStatus = (status) => {
  return api.get(`/bookings/my-vehicle-bookings?status=${status}`);
};

export const approveBooking = (bookingId) => {
  return api.put(`/bookings/${bookingId}/status?status=ACCEPTED`);
};

export const rejectBooking = (bookingId) => {
  return api.put(`/bookings/${bookingId}/status?status=REJECTED`);
};

export const getVehicleById = (vehicleId) => {
  return api.get(`/vehicles/${vehicleId}`);
};