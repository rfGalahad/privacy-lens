import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../features/Auth/LoginPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}