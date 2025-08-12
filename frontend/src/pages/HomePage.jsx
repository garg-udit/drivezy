import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Car, Bike } from 'lucide-react';
import { AuthContext } from '../auth/AuthContext';

const HomePage = () => {
  const [location, setLocation] = useState('');


  console.log(localStorage.getItem('token'));
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Rent Your Ride – Anytime, Anywhere
        </h1>
        <p className="text-lg mb-6">
          Two-wheelers & Four-wheelers, Manual or Automatic – All at your fingertips
        </p>

        {/* Location Dropdown */}
        <div className="max-w-md mx-auto flex items-center bg-white rounded-lg overflow-hidden p-2">
          <MapPin className="text-gray-500 mr-2" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-gray-800 bg-transparent outline-none"
          >
            <option value="" disabled>Select your location</option>
            <option value="pune">Pune</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="bangalore">Bangalore</option>
            <option value="hyderabad">Hyderabad</option>
          </select>
          <Link
            to="/vehicles"
            className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600"
          >
            Search
          </Link>
        </div>
      </section>

      {/* Ride Category Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">Choose Your Ride</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* 2-Wheelers */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <Bike className="mx-auto text-red-500 w-14 h-14 mb-4" />
            <h3 className="font-bold text-xl mb-2">2-Wheelers</h3>
            <p className="text-gray-600 mb-4">Scooters and bikes – manual and automatic</p>
            <Link
              to="/vehicles"
              className="inline-block bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
            >
              View Bikes
            </Link>
          </div>

          {/* 4-Wheelers */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <Car className="mx-auto text-red-500 w-14 h-14 mb-4" />
            <h3 className="font-bold text-xl mb-2">4-Wheelers</h3>
            <p className="text-gray-600 mb-4">Sedans and hatchbacks – manual and automatic</p>
            <Link
              to="/vehicles"
              className="inline-block bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
            >
              View Cars
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <div>
            <div className="text-red-500 text-4xl font-bold mb-2">1</div>
            <h3 className="font-semibold text-xl mb-2">Choose Location</h3>
            <p>Select where you want to pick up your vehicle.</p>
          </div>
          <div>
            <div className="text-red-500 text-4xl font-bold mb-2">2</div>
            <h3 className="font-semibold text-xl mb-2">Select Vehicle</h3>
            <p>Pick your preferred type: bike or car, manual or automatic.</p>
          </div>
          <div>
            <div className="text-red-500 text-4xl font-bold mb-2">3</div>
            <h3 className="font-semibold text-xl mb-2">Book & Ride</h3>
            <p>Confirm your booking and hit the road!</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-500 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Ride?</h2>
        <p className="mb-6">Find the perfect vehicle for your next trip</p>
        <Link
          to="/vehicles"
          className="bg-white text-red-500 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
        >
          Browse Vehicles
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
