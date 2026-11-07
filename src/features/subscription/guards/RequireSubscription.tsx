import { Navigate, Outlet } from "react-router-dom";
import { ErrorPage, LoadingPage } from "@/components/feedback";
import { useSubscriber } from "../hooks/useSubscriber";


export function RequireSubscription() {

  const { data: subscriber, isLoading, isError, refetch } = useSubscriber();

  if (isLoading) return <LoadingPage />;
  if (isError) {
    return (
      <ErrorPage
        title="Couldn't verify your subscription"
        message="This is likely a temporary connection issue. Your account is fine."
        onRetry={() => refetch()}
      />
    );
  }
  if (!subscriber) return <Navigate to="/subscribe" replace />;

  return <Outlet />;
}