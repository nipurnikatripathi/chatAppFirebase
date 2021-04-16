import React from 'react';
import { AuthProvider } from './authProvider';
import Routes from './routes';
export default function Providers() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
