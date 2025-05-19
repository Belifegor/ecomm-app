import { redirect } from 'react-router-dom';
import { authStore } from '../store/store';

export function protectedLoader() {
  const isAuthenticated = authStore.getState().isAuthenticated();

  if (!isAuthenticated) {
    return redirect('/login');
  }

  return null;
}
