import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
    aria-label="Previous Image"
  >
    <ChevronLeft size={20} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
    aria-label="Next Image"
  >
    <ChevronRight size={20} />
  </button>
);

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const { data } = await api.get(`/vehicles/${id}`);
        setVehicle(data);
        if (data.images?.length > 0) {
          setMainImage(data.images[0].imageUrl);
        }
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleImageChange = useCallback(
    (direction) => {
      if (!vehicle?.images?.length) return;
      const total = vehicle.images.length;
      const newIndex = (currentIndex + direction + total) % total;
      setCurrentIndex(newIndex);
      setMainImage(vehicle.images[newIndex].imageUrl);
    },
    [currentIndex, vehicle]
  );

  const handleBookNow = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      alert('End date must be after start date.');
      return;
    }

    navigate('/checkout', {
      state: {
        vehicle,
        startDate,
        endDate,
        days: diffDays,
        total: diffDays * vehicle.pricePerDay,
      },
    });
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading vehicle...</div>;
  }

  if (!vehicle) {
    return <div className="text-center mt-10 text-red-600">Vehicle not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* Carousel */}
      <div className="relative">
        <img
          src={mainImage}
          alt="Vehicle"
          className="mx-auto my-4 max-w-full max-h-[500px] object-contain rounded-md"
        />

        {/* Custom Chevron Arrows */}
        {vehicle.images?.length > 1 && (
          <>
            <PrevArrow onClick={() => handleImageChange(-1)} />
            <NextArrow onClick={() => handleImageChange(1)} />
          </>
        )}

        {/* Thumbnails */}
        <div className="flex justify-center mt-3 flex-wrap gap-2">
          {vehicle.images?.map((img, idx) => (
            <img
              key={idx}
              src={img.imageUrl}
              alt={`Thumbnail ${idx + 1}`}
              onClick={() => {
                setMainImage(img.imageUrl);
                setCurrentIndex(idx);
              }}
              className={`w-16 h-16 object-cover border-2 rounded cursor-pointer transition-all duration-200 hover:scale-105 ${mainImage === img.imageUrl ? 'border-orange-500' : 'border-gray-300'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-800">{vehicle.title}</h2>
        <p className="text-gray-500">
          <strong>Brand:</strong> {vehicle.vehicleBrand} | <strong>Model:</strong>{' '}
          {vehicle.vehicleModel}
        </p>
        <p className="text-gray-600 italic">
          {vehicle.geared ? 'Geared' : 'Non-Geared'}
        </p>
        <p className="text-xl text-orange-600 font-bold">
          ₹{vehicle.pricePerDay}
          <span className="text-sm text-gray-600 font-normal"> / day</span>
        </p>
      </div>

      {/* Booking Dates */}
      <div className="flex flex-wrap gap-4 items-end cursor-pointer">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2 cursor-pointer"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]} // 👈 disables past dates
          />

        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2 cursor-pointer"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || new Date().toISOString().split('T')[0]} // 👈 disables past & before startDate
          />

        </div>

        <button
          onClick={handleBookNow}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded transition cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default VehicleDetail;
