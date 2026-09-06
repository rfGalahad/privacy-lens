import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { LoginPage, SetupAccountPage, AuthProvider, useAuth } from '@/features/auth';
import { QuickStartPIAPage } from './features/automatedPIA';

import { ToastProvider } from '@/components/ui/Toast';
import { SubscribePage } from '@/features/subscribe';
import { ThemeProvider } from '@/provider/theme/ThemeProvider';

import DashboardLayout from '@/components/layout/DashboardLayout';
import LoadingPage from '@/components/feedback/LoadingPage';
import EmptyPage from '@/components/feedback/EmptyPage';



function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingPage />;
  return isAuthenticated 
    ? <Outlet /> 
    : <Navigate to="/login" replace />;
}

const queryClient = new QueryClient();

export default function App() {
  return (
      <ToastProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/setup-account" element={<SetupAccountPage />} />
                <Route path="/subscribe" element={<SubscribePage />} />
                <Route path="/auth/error" element={<SubscribePage />} /> // FIX THESE

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/users" element={<DashboardLayout />}>
                    <Route path='dashboard' element={<EmptyPage />} />
                      <Route path='pias/new' element={<QuickStartPIAPage />} />
                      <Route path='pias' element={<EmptyPage />} />
                      <Route path='action-items' element={<EmptyPage />} />
                      <Route path='compliance' element={<EmptyPage />} />
                      <Route path='risk-register' element={<EmptyPage />} />
                      <Route path='reports' element={<EmptyPage />} />
                      <Route path='vendors' element={<EmptyPage />} />
                      <Route path='activity' element={<EmptyPage />} />
                      <Route path='settings' element={<EmptyPage />} />
                  </Route>
                  <Route path="/admin" element={<DashboardLayout />}>
                    <Route path='dashboard' element={<EmptyPage />} />
                      <Route path='users-roles' element={<EmptyPage />} />
                      <Route path='config' element={<EmptyPage />} />
                      <Route path='tenants' element={<EmptyPage />} />
                      <Route path='integrations' element={<EmptyPage />} />
                      <Route path='audit-log' element={<EmptyPage />} />
                      <Route path='system-health' element={<EmptyPage />} />
                      <Route path='settings' element={<EmptyPage />} />
                  </Route>
                </Route>

                <Route path="*" element={<EmptyPage/>} />
              </Routes>
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </ToastProvider>
  );
}