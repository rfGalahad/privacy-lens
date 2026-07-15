import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage';
import SetupAccountPage from '@/pages/SetupAccountPage';
import DashboardLayout from '@/layout/DashboardLayout';
import LoadingPage from './components/LoadingPage';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { AuthProvider } from '@/features/auth';
import { ToastProvider } from '@/components/Toast';

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingPage />;
  return isAuthenticated 
    ? <Outlet /> 
    : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Routes>
          <Route path="/dash" element={<DashboardLayout />} />
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setup-account" element={<SetupAccountPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/*" element={<DashboardLayout />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </ToastProvider>
  );
}