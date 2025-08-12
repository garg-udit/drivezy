import React from 'react';

const About = () => {
  return (
    <div className="pt-24 px-6 bg-gradient-to-b from-white via-blue-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-xl shadow-md">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">About Drivezy</h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-700">
          Redefining urban mobility — Simple. Affordable. Reliable.
        </p>
      </section>

      {/* Who We Are */}
      <section className="py-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Who We Are</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
          Drivezy is your go-to platform for renting verified two-wheelers and four-wheelers across India. Whether you're
          exploring a city or commuting to work, we make transportation seamless with a wide selection of well-maintained
          vehicles and a smooth booking process.
        </p>
      </section>

      {/* What We Offer */}
      <section className="py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['🚲 2-Wheelers', 'Choose from scooters, bikes & more.'],
            ['🚗 4-Wheelers', 'Manual and automatic options available.'],
            ['💰 Affordable', 'Budget-friendly rentals for all.'],
            ['📱 Easy Booking', 'Instant, no-hassle booking process.']
          ].map(([title, desc]) => (
            <div key={title} className="p-6 border-t-4 border-red-400 bg-white rounded-xl shadow-md hover:shadow-xl transition">
              <h3 className="font-semibold text-xl mb-3 text-gray-800">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white max-w-6xl mx-auto rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Drivezy?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 px-4">
          {[
            '✅ Verified vehicles and providers',
            '✅ 24x7 Customer Support',
            '✅ Flexible rental durations',
            '✅ Wide coverage across cities'
          ].map((point, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-gray-700 font-medium">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      {/* Our Team */}
      <section className="py-20 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {[
            { name: 'Udit Garg', img: '/images/team/udit.jpg' },
            { name: 'Satyam Aggarwal', img: '/images/team/satyam.jpg' },
            { name: 'Sumer Hosing', img: '/images/team/sumer.jpg' },
            { name: 'Nikhil Mali', img: '/images/team/nikhil.jpg' },
            { name: 'Rohit Khetre', img: '/images/team/rohit.jpg' },
          ].map(({ name, img }, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={img}
                alt={name}
                className="w-24 h-24 mx-auto rounded-full object-cover border border-gray-300"
              />
              <h4 className="text-lg font-semibold mt-4">{name}</h4>
            </div>
          ))}
        </div>
      </section>


      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-red-100 via-white to-indigo-100 mt-16 text-center rounded-lg shadow-md">
        <h3 className="text-3xl font-bold mb-2 text-gray-800">Ready to hit the road?</h3>
        <p className="mb-6 text-gray-600">Explore our vehicles or reach out for group rentals or partnerships.</p>
        <a
          href="/vehicles"
          className="inline-block bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition duration-300"
        >
          Browse Vehicles
        </a>
      </section>

      <div className="pb-24" /> {/* Bottom padding */}
    </div>
  );
};

export default About;
