import React from 'react';
// internal import
import { Loader } from '..';
// external import
import { Navigate, useLocation } from 'react-router-dom';

const RequiredAuth = ({ loading, isAuthenticated, children }) => {
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredAuth;
