import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '@/features/Auth/LoginPage';
import ChangePasswordPage from '@/features/Auth/ChangePasswordPage';
import DashboardLayout from '@/layout/DashboardLayout';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />

      {/* Protected Routes */}
      <Route path="/dashboard/*" element={<DashboardLayout />} >
        
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}