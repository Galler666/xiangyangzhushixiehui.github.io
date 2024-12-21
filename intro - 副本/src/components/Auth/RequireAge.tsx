import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface RequireAgeProps {
  children: React.ReactNode;
}

const RequireAge: React.FC<RequireAgeProps> = ({ children }) => {
  const { isAgeVerified } = useSelector((state: RootState) => state.auth.user || {});

  if (!isAgeVerified) {
    return <Navigate to="/age-verification" replace />;
  }

  return <>{children}</>;
};

export default RequireAge; 