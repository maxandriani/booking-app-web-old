import React, { useEffect } from 'react';
import { Location, useLocation, useNavigate } from 'react-router';
import { useAuth } from './hooks/useAuth';

export type AuthGuardProps = {
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, redirectTo }) => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function buildReturnUri(location: Location): string {
    let base = location.pathname;

    if (location.search) {
      base += location.search;
    }

    if (location.hash) {
      base += location.hash;
    }

    return btoa(base);
  }

  useEffect(() => {
    if (!session) {
      navigate(redirectTo ?? `/login?redirectUri=${buildReturnUri(location)}`);
    }
  }, [navigate, session, location, redirectTo])

  return !session ? null : (<>{children}</>);
}

export default AuthGuard;