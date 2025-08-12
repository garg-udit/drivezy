import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/'); // Redirect to homepage
  }, [navigate]);

  return null; // Or you can return a spinner or empty fragment
};
