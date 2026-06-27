import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage';
import ChangePasswordPage from '@/pages/ChangePasswordPage';
import DashboardLayout from '@/layout/DashboardLayout';
import LoadingPage from './components/LoadingPage';

import { useAuth } from '@/features/Auth/hooks/useAuth';
import { AuthProvider } from './features/Auth';

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingPage />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}