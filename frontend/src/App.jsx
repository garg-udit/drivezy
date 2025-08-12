import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Vehicles from './pages/Vehicles';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { CompleteRegistration } from './pages/messages/CompleteRegistration';
import { UnauthorizedAccess } from './pages/messages/UnauthorizedAccess';
import { ServerError } from './pages/errors/ServerError';
import { NotFound } from './pages/errors/NotFound';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import ProviderDashboard from './pages/dashboards/ProviderDashboard';
import CompanyAdminDashboard from './pages/dashboards/CompanyAdminDashboard';
import UserProfile from './pages/profile/UserProfile';
import CompanyAdminProfile from './pages/profile/CompanyAdminProfile';
import ProviderProfile from './pages/profile/ProviderProfile';
import AdminProfile from './pages/profile/AdminProfile';
import AddProvider from './pages/company-admin/AddProvider';
import VerifyCompanies from './pages/VerifyCompanies';
import VerifiedCompanies from './pages/VerifiedCompanies';
import VehicleDetails from './pages/VehicleDetails';
import VerifyUsers from './pages/VerifyUsers';
import VerifiedUsers from './pages/VerifiedUser';
import VerifyProviders from './pages/VerifyProviders';
import VerifiedProviders from './pages/VerifiedProviders';
import ManageProviders from './pages/ManageProviders';
import AddVehicleForm from './pages/AddNewVehicle';
import ViewMyVehicles from './pages/ViewMyVehicles';
import VerifyVehicle from './pages/VerifyVehicles';
import VerifiedVehicles from './pages/VerifiedVehicles';
import CompanyVehicleList from './pages/CompayVehicleList';
import Checkout from './pages/Checkout';
import ApproveBookings from './pages/ApproveBookings';
import BookingHistory from './pages/BookingHistory';
import PrivateRoute from './components/routes/PrivateRoute';

import Footer from './components/Footer';



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/vehicles' element={<Vehicles />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/complete-registration" element={<CompleteRegistration />} />
        <Route path="/unauthorized" element={<UnauthorizedAccess />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />


        <Route element={<PrivateRoute allowedRoles={'ADMIN'} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/verify-users" element={<VerifyUsers />} />
          <Route path="/company/unverified" element={<VerifyCompanies />} />
          <Route path="/admin/verified-users" element={<VerifiedUsers />} />
          <Route path="/company/verified" element={<VerifiedCompanies />} />
          <Route path="/admin/verify-providers" element={<VerifyProviders />} />
          <Route path="/admin/verified-providers" element={<VerifiedProviders />} />
          <Route path="/admin/verify-vehicles" element={<VerifyVehicle />} />
          <Route path="/admin/all-vehicles" element={<VerifiedVehicles />} />
        </Route>


        <Route element={<PrivateRoute allowedRoles={'USER'} />}>
          <Route path="/user/dashboard" element={<HomePage />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/booking" element={<BookingHistory />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={'PROVIDER'} />}>
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
          <Route path="/provider/profile" element={<ProviderProfile />} />
          <Route path="/provider/add-vehicle" element={<AddVehicleForm />} />
          <Route path="/provider/view-vehicles" element={<ViewMyVehicles />} />
          <Route path="/provider/approve-bookings" element={<ApproveBookings />} />
        </Route>


        <Route element={<PrivateRoute allowedRoles={'COMPANY_ADMIN'} />}>
          <Route path="/provider/company/dashboard" element={<CompanyAdminDashboard />} />
          <Route path="/company-admin/profile" element={<CompanyAdminProfile />} />
          <Route path="/company-admin/add-provider" element={<AddProvider />} />
          <Route path="/company/manage-providers" element={<ManageProviders />} />
          <Route path="/company/vehicle-list" element={<CompanyVehicleList />} />
        </Route>

      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
