import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="pt-24 px-6 bg-gradient-to-b from-white via-blue-50 to-white text-gray-800 min-h-screen">
      {/* Hero */}
      <section className="text-center py-16 mb-12">
        <h1 className="text-5xl font-extrabold mb-4">Get in Touch</h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600">
          Reach out to Drivezy for support, inquiries, or partnership opportunities.
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-sm text-gray-700">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm text-gray-700">Your Message</label>
              <textarea
                rows="5"
                placeholder="Write something..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>

          <div className="flex items-start gap-4">
            <MapPin className="text-red-500" />
            <div>
              <h4 className="font-medium">Office Address</h4>
              <p className="text-gray-600">Drivezy HQ, Pune, India</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-red-500" />
            <div>
              <h4 className="font-medium">Phone Number</h4>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="text-red-500" />
            <div>
              <h4 className="font-medium">Email</h4>
              <p className="text-gray-600">support@drivezy.com</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Connect with Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <Facebook />
              </a>
              <a href="#" className="text-sky-500 hover:text-sky-700">
                <Twitter />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-700">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20" />
    </div>
  );
};

export default ContactPage;
