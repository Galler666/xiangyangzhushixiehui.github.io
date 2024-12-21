import React from 'react';
import { Navigate } from 'react-router-dom';

interface RequireReferrerProps {
  children: React.ReactNode;
}

const RequireReferrer: React.FC<RequireReferrerProps> = ({ children }) => {
  const referrer = document.referrer;
  const allowedReferrers = [
    'https://trusted-site1.com',
    'https://trusted-site2.com'
  ];

  if (!referrer || !allowedReferrers.some(allowed => referrer.startsWith(allowed))) {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
};

export default RequireReferrer; 