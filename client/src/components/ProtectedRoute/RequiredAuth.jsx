import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from '..';

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
