import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import LoadingSpinner from '../common/LoadingSpinner';

const SsoConsume = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken, checkAuth } = useAuthStore();

  useEffect(() => {
    const consumeSsoToken = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      console.info('[whatsapp-sso] SsoConsume mounted', {
        path: window.location.pathname,
        hasToken: Boolean(token)
      });

      // Remove sensitive token from the visible URL immediately.
      window.history.replaceState({}, document.title, window.location.pathname);

      if (!token) {
        console.warn('[whatsapp-sso] Missing token in /sso route; redirecting to /login');
        navigate('/login', { replace: true });
        return;
      }

      try {
        console.info('[whatsapp-sso] Setting token in auth store');
        setToken(token);
        await checkAuth();
        console.info('[whatsapp-sso] checkAuth completed after SSO token');
      } catch (error) {
        console.error('[whatsapp-sso] SSO token processing failed:', error);
      }

      const { user } = useAuthStore.getState();
      console.info('[whatsapp-sso] Post-checkAuth auth state', {
        hasUser: Boolean(user)
      });
      navigate(user ? '/' : '/login', { replace: true });
    };

    consumeSsoToken();
  }, [location.search, navigate, setToken, checkAuth]);

  return (
    <div className="app-loading">
      <LoadingSpinner size="large" />
      <h2>Signing you in...</h2>
    </div>
  );
};

export default SsoConsume;
