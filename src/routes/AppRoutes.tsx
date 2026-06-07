import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '@/features/Auth/LoginPage';
import ChangePasswordPage from '@/features/Auth/ChangePasswordPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      {/* Protected Routes */}

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}