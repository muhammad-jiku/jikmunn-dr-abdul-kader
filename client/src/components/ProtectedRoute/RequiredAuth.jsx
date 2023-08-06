import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from '..';

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
