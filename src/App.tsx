import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage, SetupAccountPage, AuthProvider, RequireAuth } from "@/features/auth";
import { SubscribePage, RequireSubscription } from "@/features/subscription";
import { QuickStartPIAPage } from "@/features/automatedPIA";

import { ToastProvider } from "@/components/ui/Toast";
import { ThemeProvider } from "@/provider/theme/ThemeProvider";
import DashboardLayout from "@/components/layout/DashboardLayout";
import EmptyPage from "@/components/feedback/EmptyPage";
import { ResultPreviewPage } from "./features/automatedPIA/components/results/ResultPreviewPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <Routes>
              {/* Public */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/setup-account" element={<SetupAccountPage />} />
              <Route path="/auth/error" element={<SubscribePage />} /> {/* still needs fixing */}


              {/* Authenticated */}
              <Route element={<RequireAuth />}>
                <Route path="/subscribe" element={<SubscribePage />} />

                {/* Authenticated AND subscribed */}
                <Route element={<RequireSubscription />}>
                  <Route path="/users" element={<DashboardLayout />}>
                    <Route path='dashboard' element={<EmptyPage />} />
                      <Route path='pias/new' element={<QuickStartPIAPage />} />
                      <Route path='pias' element={<EmptyPage />} />
                      <Route path='action-items' element={<ResultPreviewPage />} />
                      <Route path='compliance' element={<EmptyPage />} />
                      <Route path='risk-register' element={<EmptyPage />} />
                      <Route path='reports' element={<EmptyPage />} />
                      <Route path='vendors' element={<EmptyPage />} />
                      <Route path='activity' element={<EmptyPage />} />
                      <Route path='settings' element={<EmptyPage />} />
                    </Route>
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


              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ToastProvider>
  );
}