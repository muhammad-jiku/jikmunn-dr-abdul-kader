import React from 'react';
// internal import
import { Loader } from '..';
// external import
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequiredAdmin = ({ children }) => {
  const location = useLocation();
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state?.user
  );

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated || user?.role !== 'Admin') {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredAdmin;
