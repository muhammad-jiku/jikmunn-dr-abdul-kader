import React from 'react';
// internal import
import { Loader } from '..';
// external import
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequiredAuth = ({ children }) => {
  const location = useLocation();
  const { loading, isAuthenticated } = useSelector((state) => state?.user);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredAuth;
