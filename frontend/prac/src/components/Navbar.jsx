import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, UserCircle } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [shrink, setShrink] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Vehicles' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  // Shrink effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 shadow-md bg-gray-900 text-white transition-all duration-300 ${shrink ? 'py-2' : 'py-4'}`}>
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className={`font-bold font-serif text-white transition-all duration-300 ${shrink ? 'text-2xl' : 'text-3xl'}`}>
          <span className="text-red-500">D</span>rivezy
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-[17px] font-medium">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `relative pb-1 transition-all duration-200 ${
                  isActive
                    ? 'text-red-500 font-semibold border-b-2 border-red-500'
                    : 'text-white hover:text-red-500'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* User Icon / Dropdown */}
          {userLoggedIn ? (
            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)}>
                <UserCircle className="w-8 h-8 ml-3 text-white hover:text-red-500 transition" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-md shadow-md z-50 origin-top-right animate-dropdown text-white">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setUserLoggedIn(false);
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-gray-900 text-white">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'text-red-500 font-semibold'
                    : 'text-white hover:text-red-500'
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Login / User */}
            {userLoggedIn ? (
              <div className="text-center mt-2">
                <UserCircle className="w-8 h-8 mx-auto text-white" />
                <button
                  onClick={() => {
                    setUserLoggedIn(false);
                    setMenuOpen(false);
                  }}
                  className="text-sm mt-1 text-red-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-center hover:bg-red-600"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
