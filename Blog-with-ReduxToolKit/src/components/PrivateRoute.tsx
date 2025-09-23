import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../slices/authSlice';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? children  : <Navigate to="/login" replace />;
}

export default PrivateRoute;
