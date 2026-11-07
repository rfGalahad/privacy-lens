import { useMutation } from '@tanstack/react-query';
import { requestAnalysis } from '@/lib/supabase/pia';
import type { PIAFormValues } from '../schema/piaFormSchema';
import { useToast } from '@/components/ui/Toast';


export const useSubmitPia = () => {
  
  const toast = useToast();

  return useMutation({
    mutationFn: (values: PIAFormValues) => requestAnalysis(values),
    onError: (error) => {
      console.error(error.message);
      toast.error("Failed to Analyze. Please try again.", {
        title: "Analyze Error",
      });
    },
  });
}
  