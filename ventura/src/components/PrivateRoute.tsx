import React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
    children: React.ReactNode;
  };
  

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isAuthenticated = () => {
      const token = localStorage.getItem('token');
      return !!token;
    };
  
    return isAuthenticated() ? <>{children}</> : <Navigate to="/Ventura/login" />;
  };
  

export default PrivateRoute;
