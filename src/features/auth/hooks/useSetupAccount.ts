import { useAppForm } from "@/lib/form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { setupAccountSchema } from "../schema/setupAccountSchema";
import { updatePassword } from "@/lib/supabase/auth";

//-----------------------------------------------------------
// CONSTANTS
//-----------------------------------------------------------

const DEFAULT_VALUES = {
  newPassword: "",
  confirmPassword: ""
}

//-----------------------------------------------------------
// SETUP ACCOUNT HOOK
//-----------------------------------------------------------

export function useSetupAccount() {

  const navigate = useNavigate();

  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword
  });

  const form = useAppForm({
    defaultValues: DEFAULT_VALUES,
    validators: {
      onChange: setupAccountSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updatePasswordMutation.mutateAsync(value.newPassword);
        navigate("/users/dashboard");
      } catch {
        // surfaced below via updatePasswordMutation.error
      }
    },
  });

  return { form, updatePasswordMutation };
}