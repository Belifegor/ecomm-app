import { Navigate } from 'react-router-dom';
import { authStore } from '../store/store';
import { JSX } from 'react';

export function RequireNoAuth({ children }: { children: JSX.Element }) {
  const isAuthenticated = authStore.getState().isAuthenticated?.();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}
