import { useQuery } from "@tanstack/react-query";

import { getSubscriberByAuthId } from "@/lib/supabase/subscribers";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function useSubscriber() {
  const { user, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["subscriber", user?.id],
    enabled: isAuthenticated && !!user?.id,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await getSubscriberByAuthId(user!.id);
      if (error) throw error; 
      return data;            
    },
  });
}