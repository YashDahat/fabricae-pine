import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps): React.JSX.Element => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading spinner/skeleton
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    // Redirect to a suitable fallback page if authenticated but unauthorized
    // For now, redirect to client dashboard for unauthorized admin access
    return <Navigate to={ROUTES.CLIENT_DASHBOARD} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;