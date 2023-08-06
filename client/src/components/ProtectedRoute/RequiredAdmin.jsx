import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from '..';

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
