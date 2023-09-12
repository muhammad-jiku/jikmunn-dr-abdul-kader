import React from 'react';
// internal import
import { Loader } from '..';
// external import
import { Navigate, useLocation } from 'react-router-dom';

const RequiredAdmin = ({ loading, isAuthenticated, user, children }) => {
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated || user?.role !== 'Admin') {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredAdmin;
